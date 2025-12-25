import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Section from '../components/Section';
import Button from '../components/ui/Button';
import { MapPin, Phone, Calendar, MessageCircle } from 'lucide-react';
import { holidayHours } from '../data/facilityInfo';
import { contactDetails } from '../data/siteMeta';

const quickActions = [
  { label: 'Bel direct', href: 'tel:+31646872274', icon: Phone },
  { label: 'WhatsApp', href: 'https://wa.me/31646872274', icon: MessageCircle },
  { label: 'Route plannen', href: 'https://maps.google.com/?q=Fitcity+Culemborg', icon: MapPin },
];

const Contact = () => {
  const [reason, setReason] = useState('contact');
  const [submitState, setSubmitState] = useState('idle');
  const [prefill, setPrefill] = useState({ name: '', email: '', phone: '', message: '' });
  const formRef = useRef(null);
  const location = useLocation();
  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!contactEndpoint) {
      setSubmitState('missing');
      return;
    }

    setSubmitState('loading');

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submit failed');
      }

      setSubmitState('success');
      event.currentTarget.reset();
    } catch (error) {
      setSubmitState('error');
    }
  };

  const setDutchValidity = (event, message) => {
    event.target.setCustomValidity(message);
  };

  const clearValidity = (event) => {
    event.target.setCustomValidity('');
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchReason = params.get('reason');
    const messageParam = params.get('message');
    setPrefill({
      name: params.get('name') || '',
      email: params.get('email') || '',
      phone: params.get('phone') || '',
      message: messageParam || '',
    });

    if (searchReason) {
      setReason(searchReason);
    } else if (location.hash === '#proefles') {
      setReason('proefles');
    }

    const scrollToForm = () => {
      const targetId = (location.hash && location.hash.replace('#', '')) || 'contact-form';
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    scrollToForm();
  }, [location.hash, location.search]);

  return (
    <>
      <Section
        header={{
          eyebrow: 'Contact',
          title: 'Neem contact op voor lidmaatschap of rondleiding',
          subtitle: 'Vul het formulier in, we reageren doorgaans binnen een werkdag.',
        }}
      />

      <Section id="contact-form" contentClassName="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr]" disableReveal>
        <div className="space-y-6">
          {contactDetails.map(({ icon: Icon, title, content, href }) => (
            <div key={title} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fitcity/15 text-fitcity">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{title}</p>
                {href ? (
                  <a href={href} className="text-lg font-display text-white hover:text-fitcity">
                    {content}
                  </a>
                ) : (
                  <p className="text-lg font-display text-white">{content}</p>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-3">
            {quickActions.map(({ label, href, icon: Icon }) => (
              <Button key={label} as="a" href={href} variant="ghost" className="gap-2">
                <Icon size={16} />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 rounded-4xl border border-white/10 bg-white/[0.03] p-8">
          <div>
            <p className="text-sm font-semibold tracking-wide text-white/70">Reden van contact</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                { value: 'contact', label: 'Algemeen' },
                { value: 'proefles', label: 'Proefles' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-3 py-2 text-sm ${
                    reason === option.value ? 'border-fitcity bg-fitcity/10 text-white' : 'border-white/10 bg-white/5 text-white/70'
                  }`}
                >
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name="reason"
                    value={option.value}
                    checked={reason === option.value}
                    onChange={() => setReason(option.value)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-semibold tracking-wide text-white/70">
              Naam <span className="text-fitcity">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Je naam"
              required
              value={prefill.name}
              onChange={(e) => setPrefill((prev) => ({ ...prev, name: e.target.value }))}
              onInvalid={(event) => setDutchValidity(event, 'Vul dit veld alstublieft in.')}
              onInput={clearValidity}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-fitcity focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold tracking-wide text-white/70">
              E-mail <span className="text-fitcity">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Je e-mailadres"
              required
              value={prefill.email}
              onChange={(e) => setPrefill((prev) => ({ ...prev, email: e.target.value }))}
              onInvalid={(event) => setDutchValidity(event, 'Vul dit veld alstublieft in.')}
              onInput={clearValidity}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-fitcity focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-semibold tracking-wide text-white/70">
              Telefoonnummer <span className="text-fitcity">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Bijv. 06 12345678"
              required
              value={prefill.phone}
              onChange={(e) => setPrefill((prev) => ({ ...prev, phone: e.target.value }))}
              onInvalid={(event) => setDutchValidity(event, 'Vul dit veld alstublieft in.')}
              onInput={clearValidity}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-fitcity focus:outline-none"
            />
          </div>

          {reason === 'proefles' && (
            <>
              <div>
                <label htmlFor="goal" className="text-sm font-semibold tracking-wide text-white/70">
                  Doel
                </label>
                <select
                  id="goal"
                  name="goal"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-fitcity focus:outline-none"
                  defaultValue=""
                  required
                  onInvalid={(event) => setDutchValidity(event, 'Vul dit veld alstublieft in.')}
                  onInput={clearValidity}
                >
                  <option value="" disabled hidden>
                    Kies je doel
                  </option>
                  <option value="afvallen">Afvallen</option>
                  <option value="spiergroei">Spiergroei</option>
                  <option value="conditie">Conditie</option>
                  <option value="combinatie">Combinatie</option>
                  <option value="gezelligheid">Gezelligheid</option>
                  <option value="ontspanning">Ontspanning</option>
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <p className="text-sm font-semibold tracking-wide text-white/70">Wanneer kom je het liefste langs?</p>
                  <p className="text-xs text-white/50">We stemmen de definitieve tijd telefonisch af.</p>
                </div>
                <div>
                  <label htmlFor="preferred-date" className="text-sm font-semibold tracking-wide text-white/70">
                    Voorkeursdatum
                  </label>
                  <input
                    type="date"
                    id="preferred-date"
                    name="preferred-date"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-fitcity focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="preferred-time" className="text-sm font-semibold tracking-wide text-white/70">
                    Voorkeurstijd
                  </label>
                  <input
                    type="time"
                    id="preferred-time"
                    name="preferred-time"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-fitcity focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-semibold tracking-wide text-white/70">
                  Heb je nog vragen of opmerkingen?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Bijv. voorkeur voor trainer, blessures of aanvullende vragen"
                  value={prefill.message}
                  onChange={(e) => setPrefill((prev) => ({ ...prev, message: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-fitcity focus:outline-none"
                />
              </div>
            </>
          )}

          {reason === 'contact' && (
            <div>
              <label htmlFor="message" className="text-sm font-semibold tracking-wide text-white/70">
                Bericht <span className="text-fitcity">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Vertel ons waar we mee kunnen helpen"
                required
                value={prefill.message}
                onChange={(e) => setPrefill((prev) => ({ ...prev, message: e.target.value }))}
                onInvalid={(event) => setDutchValidity(event, 'Vul dit veld alstublieft in.')}
                onInput={clearValidity}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-fitcity focus:outline-none"
              />
              <p className="mt-2 text-xs text-white/50">We gebruiken je gegevens alleen om contact met je op te nemen.</p>
            </div>
          )}
          <Button type="submit" className="w-full justify-center" disabled={submitState === 'loading'}>
            Verstuur bericht
          </Button>
          {submitState !== 'idle' && (
            <p className="text-xs text-white/60" aria-live="polite">
              {submitState === 'loading' && 'Versturen...'}
              {submitState === 'success' && 'Bedankt! We nemen zo snel mogelijk contact op.'}
              {submitState === 'error' && 'Lukt het niet? Bel ons of stuur een bericht via WhatsApp.'}
              {submitState === 'missing' && 'Formulier is tijdelijk offline. Bel ons of stuur een bericht via WhatsApp.'}
            </p>
          )}
        </form>
      </Section>

      <Section id="speciale-openingstijden" tone="panel" contentClassName="grid gap-8 md:grid-cols-2 lg:grid-cols-[0.9fr_1.1fr]" disableReveal>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
          <iframe
            title="Fitcity Culemborg map"
            src="https://www.google.com/maps?q=Fitcity%20Culemborg&hl=nl&z=15&output=embed"
            className="h-[260px] w-full border-0 md:h-[300px] lg:h-[340px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="rounded-4xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3 text-fitcity">
            <Calendar size={20} />
            <p className="text-xs uppercase tracking-[0.4em]">Speciale openingstijden</p>
          </div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            {holidayHours.map((item) => (
              <div key={item.day} className="flex items-center justify-between">
                <span>{item.day}</span>
                <span className="text-fitcity">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;



