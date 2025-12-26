import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import Container from '../components/Container';
import Button from '../components/ui/Button';
import StepIndicator from '../components/signup/StepIndicator';
import MembershipSelector from '../components/signup/MembershipSelector';
import DateStep from '../components/signup/DateStep';
import PersonalInfoForm from '../components/signup/PersonalInfoForm';
import { plans, planGroups } from '../data/memberships';

// Filter to only show signup-eligible plans
const signupPlans = plans.filter((p) => p.signupEligible !== false);

// Group only signup-eligible plans for category tabs
const signupPlanGroups = planGroups
  .map((group) => ({
    ...group,
    plans: group.plans.filter((plan) => plan && plan.signupEligible !== false),
  }))
  .filter((group) => group.plans.length > 0);

const FORM_STORAGE_KEY = 'fitcity-inschrijven-form';
const FORM_STORAGE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const findCategoryForPlan = (planId) => {
  const plan = signupPlans.find((p) => p.id === planId);
  if (!plan) return null;

  // Prefer specific buckets first
  if (plan.isLadiesOnly && signupPlanGroups.some((g) => g.key === 'ladies-only')) {
    return 'ladies-only';
  }
  if (plan.includesKickboxing && signupPlanGroups.some((g) => g.key === 'kickboxing')) {
    return 'kickboxing';
  }

  const matchedGroup = signupPlanGroups.find((group) =>
    group.plans.some((p) => p.id === planId)
  );

  return matchedGroup?.key ?? null;
};

const defaultCategoryKey = signupPlanGroups[0]?.key ?? '';

const INITIAL_FORM_DATA = {
  membershipId: '',
  startDate: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  street: '',
  houseNumber: '',
  houseNumberAddition: '',
  postalCode: '',
  city: '',
  iban: '',
  agreeTerms: false,
};

const Inschrijven = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [activeCategory, setActiveCategory] = useState(() => {
    const planId = searchParams.get('plan');
    return (planId && findCategoryForPlan(planId)) || defaultCategoryKey;
  });
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Prefill from localStorage (recent only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(FORM_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed?.savedAt || Date.now() - parsed.savedAt > FORM_STORAGE_TTL_MS) {
        localStorage.removeItem(FORM_STORAGE_KEY);
        return;
      }
      const storedData = { ...INITIAL_FORM_DATA, ...parsed.data };
      setFormData(storedData);
      if (!searchParams.get('plan') && storedData.membershipId) {
        const category = findCategoryForPlan(storedData.membershipId);
        if (category) {
          setActiveCategory(category);
        }
      }
    } catch (error) {
      console.error('Failed to load saved signup data', error);
    }
  }, [searchParams]);

  // Persist form data locally for retry flow
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        FORM_STORAGE_KEY,
        JSON.stringify({ savedAt: Date.now(), data: formData })
      );
    } catch (error) {
      // Fail quietly if storage not available
      console.error('Failed to save signup data', error);
    }
  }, [formData]);

  // Pre-select plan from URL parameter
  useEffect(() => {
    const planId = searchParams.get('plan');
    if (planId && signupPlans.some((p) => p.id === planId)) {
      setFormData((prev) => ({ ...prev, membershipId: planId }));
      const category = findCategoryForPlan(planId);
      if (category) {
        setActiveCategory(category);
      }
    }
  }, [searchParams]);

  const selectedPlan = signupPlans.find((p) => p.id === formData.membershipId);
  const activeGroup =
    signupPlanGroups.find((group) => group.key === activeCategory) ?? signupPlanGroups[0];
  const visiblePlans = activeGroup?.plans ?? signupPlans;

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.membershipId) {
        newErrors.membershipId = 'Kies een abonnement';
      }
    }

    if (stepNumber === 2) {
      if (!formData.startDate) {
        newErrors.startDate = 'Kies een startdatum';
      } else {
        const date = new Date(formData.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date <= today) {
          newErrors.startDate = 'Startdatum moet in de toekomst liggen';
        }
      }
    }

    if (stepNumber === 3) {
      if (!formData.firstName?.trim()) newErrors.firstName = 'Verplicht';
      if (!formData.lastName?.trim()) newErrors.lastName = 'Verplicht';
      if (!formData.email?.trim()) {
        newErrors.email = 'Verplicht';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ongeldig e-mailadres';
      }
      if (!formData.phone?.trim()) {
        newErrors.phone = 'Verplicht';
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Verplicht';
      } else {
        const dob = new Date(formData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        if (age < 13) newErrors.dateOfBirth = 'Minimaal 13 jaar oud';
      }
      if (!formData.street?.trim()) newErrors.street = 'Verplicht';
      if (!formData.houseNumber?.trim()) newErrors.houseNumber = 'Verplicht';
      if (!formData.postalCode?.trim()) {
        newErrors.postalCode = 'Verplicht';
      } else if (!/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(formData.postalCode)) {
        newErrors.postalCode = 'Ongeldige postcode';
      }
      if (!formData.city?.trim()) newErrors.city = 'Verplicht';
      if (!formData.iban?.trim()) {
        newErrors.iban = 'Verplicht';
      } else if (!/^NL[0-9]{2}[A-Z]{4}[0-9]{10}$/i.test(formData.iban.replace(/\s/g, ''))) {
        newErrors.iban = 'Ongeldig IBAN (NL formaat)';
      }
      if (!formData.agreeTerms) newErrors.agreeTerms = 'Je moet akkoord gaan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Er is een fout opgetreden');
      }

      // Clear localStorage on success
      localStorage.removeItem(FORM_STORAGE_KEY);

      // Redirect to thank you page
      window.location.href = `/bedankt?signup=${data.signupId}`;
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  };

  const formatPrice = (value) => `€${value.toFixed(2).replace('.', ',')}`;

  return (
    <AnimatedPage>
      <section className="min-h-screen py-24 lg:py-32">
        <Container size="md">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl lg:text-5xl">Inschrijven</h1>
            <p className="mt-4 text-lg text-white/60">
              Word lid van FitCity Culemborg
            </p>
          </div>

          {/* Step indicator */}
          <div className="mb-12">
            <StepIndicator currentStep={step} />
          </div>

          {/* Step content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl">Kies je abonnement</h2>
                  <p className="mt-2 text-white/60">
                    Selecteer het abonnement dat bij jou past.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap justify-center gap-2">
                    {signupPlanGroups.map((group) => {
                      const isActive = group.key === activeCategory;
                      return (
                        <button
                          key={group.key}
                          type="button"
                          onClick={() => setActiveCategory(group.key)}
                          className={clsx(
                            'rounded-full border px-4 py-2 text-sm font-medium transition',
                            isActive
                              ? 'border-fitcity bg-fitcity/20 text-white'
                              : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
                          )}
                        >
                          {group.label}
                        </button>
                      );
                    })}
                  </div>
                  {activeGroup?.description && (
                    <p className="text-center text-sm text-white/60">
                      {activeGroup.description}
                    </p>
                  )}
                </div>
                <MembershipSelector
                  plans={visiblePlans}
                  selectedId={formData.membershipId}
                  onSelect={(id) => updateFormData('membershipId', id)}
                />
                {errors.membershipId && (
                  <p className="text-center text-sm text-red-400">
                    {errors.membershipId}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <DateStep
                value={formData.startDate}
                onChange={(value) => updateFormData('startDate', value)}
                error={errors.startDate}
              />
            )}

            {step === 3 && (
              <PersonalInfoForm
                data={formData}
                errors={errors}
                onChange={updateFormData}
              />
            )}

            {/* Submit error */}
            {submitError && (
              <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-center">
                <p className="text-sm text-red-400">{submitError}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              {step > 1 ? (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  icon={ArrowLeft}
                  iconPosition="left"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Terug
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  icon={ArrowRight}
                  className="w-full sm:w-auto"
                >
                  Volgende
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto sm:min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Bezig...
                    </>
                  ) : (
                    'Schrijf je in'
                  )}
                </Button>
              )}
            </div>

          </motion.div>

          {/* Summary sidebar for larger screens */}
          {selectedPlan && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-sm font-medium text-white/60">
                Geselecteerd abonnement
              </h3>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-lg">{selectedPlan.name}</span>
                <span className="text-fitcity">
                  {formatPrice(selectedPlan.price)} / {selectedPlan.period}
                </span>
              </div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-white/60">Inschrijfkosten</span>
                  <span className="font-semibold">€17,00 (ter plekke)</span>
                </div>
                <p className="mt-2 text-xs text-white/50">
                  De inschrijfkosten betaal je bij het ophalen van je ledenpas.
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>
    </AnimatedPage>
  );
};

export default Inschrijven;
