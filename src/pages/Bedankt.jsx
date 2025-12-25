import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Home, XCircle, Clock4 } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import Container from '../components/Container';
import Button from '../components/ui/Button';

const Bedankt = () => {
  const [searchParams] = useSearchParams();
  const signupId = searchParams.get('signup');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchStatus = async () => {
      if (!signupId) {
        setStatus('missing');
        return;
      }
      try {
        const res = await fetch(`/api/signup-status?id=${signupId}`);
        if (!res.ok) {
          setStatus('unknown');
          return;
        }
        const data = await res.json();
        setStatus(data.status || 'unknown');
      } catch (err) {
        console.error('Failed to fetch signup status', err);
        setStatus('unknown');
      }
    };
    fetchStatus();
  }, [signupId]);

  const isPaid = status === 'paid' || status === 'subscription_created';
  const isFailed = status === 'failed' || status === 'canceled' || status === 'expired' || status === 'missing';
  const isPending = status === 'pending' || status === 'open' || status === 'loading' || status === 'unknown';

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
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
                isPaid ? 'bg-green-500/20' : isFailed ? 'bg-red-500/20' : 'bg-white/10'
              }`}
            >
              {isPaid ? (
                <CheckCircle className="h-10 w-10 text-green-400" />
              ) : isFailed ? (
                <XCircle className="h-10 w-10 text-red-400" />
              ) : (
                <Clock4 className="h-10 w-10 text-white/70" />
              )}
            </motion.div>

            {/* Title */}
            <h1 className="font-display text-3xl lg:text-4xl">
              {isPaid
                ? 'Bedankt voor je inschrijving!'
                : isFailed
                  ? 'Betaling is niet gelukt'
                  : 'We verwerken je betaling'}
            </h1>

            {/* Message */}
            <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
              {isPaid
                ? 'We hebben je betaling ontvangen en verwerken je inschrijving.'
                : isFailed
                  ? 'De betaling is afgebroken of mislukt. Probeer het opnieuw of kies een andere betaalmethode.'
                  : 'We zijn je betaling aan het controleren. Dit duurt meestal enkele seconden.'}
            </p>

            {/* Email notice */}
            {(isPaid || isPending) && (
              <div className="mx-auto mt-8 flex max-w-sm items-start gap-4 rounded-xl bg-fitcity/10 p-4 text-left">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-fitcity" />
                <div>
                  <p className="font-medium text-white">Check je inbox</p>
                  <p className="mt-1 text-sm text-white/60">
                    Je ontvangt binnen enkele minuten een bevestigingsmail met alle
                    details van je inschrijving.
                  </p>
                </div>
              </div>
            )}

            {/* What's next */}
            {isPaid && (
              <div className="mt-8 space-y-3 text-left">
                <h2 className="text-center text-sm font-medium text-white/60">
                  Wat gebeurt er nu?
                </h2>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fitcity text-xs font-bold text-night">
                      1
                    </span>
                    <span>Je ontvangt een bevestigingsmail</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fitcity text-xs font-bold text-night">
                      2
                    </span>
                    <span>Op je startdatum is je lidmaatschap actief</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fitcity text-xs font-bold text-night">
                      3
                    </span>
                    <span>Kom langs en start met sporten!</span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 space-y-3">
              {isFailed && (
                <Button as={Link} to="/inschrijven" className="w-full justify-center">
                  Probeer opnieuw
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
