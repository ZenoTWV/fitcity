import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, XCircle, Clock4 } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import Container from '../components/Container';
import Button from '../components/ui/Button';

const Bedankt = () => {
  const [searchParams] = useSearchParams();
  const signupId = searchParams.get('signup');
  const [status, setStatus] = useState('loading');

  // Fetch signup status once on mount
  useEffect(() => {
    const fetchStatus = async () => {
      if (!signupId) {
        setStatus('missing');
        return;
      }
      try {
        const res = await fetch(`/api/signup-status?id=${signupId}`);
        if (!res.ok) {
          setStatus('error');
          return;
        }
        const data = await res.json();
        setStatus((data.status || 'unknown').toString().toLowerCase());
      } catch (err) {
        console.error('Failed to fetch signup status', err);
        setStatus('error');
      }
    };
    fetchStatus();
  }, [signupId]);

  // For no-payment flow, pending_pickup is the success state
  const isSuccess = status === 'pending_pickup' || status === 'paid' || status === 'subscription_created';
  const isError = status === 'missing' || status === 'error';
  const isLoading = status === 'loading';

  return (
    <AnimatedPage>
      <section className="flex min-h-screen items-center py-24 lg:py-32">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-12"
          >
            {/* Status icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
                isSuccess ? 'bg-green-500/20' : isError ? 'bg-red-500/20' : 'bg-white/10'
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="h-10 w-10 text-green-400" />
              ) : isError ? (
                <XCircle className="h-10 w-10 text-red-400" />
              ) : (
                <Clock4 className="h-10 w-10 text-white/70 animate-pulse" />
              )}
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-3xl lg:text-4xl">
              {isSuccess
                ? 'Bedankt voor je inschrijving!'
                : isError
                  ? 'Er is iets misgegaan'
                  : 'Even geduld...'}
            </h1>

            {/* Message */}
            <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
              {isSuccess
                ? 'Je inschrijving is ontvangen. Kom langs bij FitCity om je ledenpas op te halen.'
                : isError
                  ? 'We konden je inschrijving niet vinden. Probeer opnieuw of neem contact met ons op.'
                  : 'We verwerken je inschrijving...'}
            </p>

            {/* What's next */}
            {isSuccess && (
              <div className="mt-8 space-y-3 text-left">
                <h2 className="text-center text-sm font-medium text-white/60">
                  Wat moet je doen?
                </h2>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fitcity text-xs font-bold text-night">
                      1
                    </span>
                    <span>Kom langs bij FitCity om je ledenpas op te halen</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fitcity text-xs font-bold text-night">
                      2
                    </span>
                    <span>Neem een geldig legitimatiebewijs mee</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fitcity text-xs font-bold text-night">
                      3
                    </span>
                    <span>Betaal de inschrijfkosten (€17) ter plekke (pin of contant)</span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 space-y-3">
              {isError && (
                <Button as={Link} to="/inschrijven" className="w-full justify-center">
                  Probeer opnieuw
                </Button>
              )}
              {isError && (
                <Button
                  as={Link}
                  to="/contact"
                  variant="ghost"
                  className="w-full justify-center sm:w-auto"
                >
                  Neem contact op
                </Button>
              )}
              {isSuccess && (
                <Button as={Link} to="/contact#openingstijden" variant="primary" className="w-full justify-center sm:w-auto">
                  Bekijk openingstijden
                </Button>
              )}
              <Button as={Link} to="/" icon={Home} iconPosition="left" variant="ghost" className="w-full justify-center sm:w-auto">
                Terug naar home
              </Button>
            </div>

            {/* Signup ID for reference (small, subtle) */}
            {signupId && (
              <p className="mt-8 text-xs text-white/30">
                Referentie: {signupId}
              </p>
            )}
          </motion.div>
        </Container>
      </section>
    </AnimatedPage>
  );
};

export default Bedankt;
