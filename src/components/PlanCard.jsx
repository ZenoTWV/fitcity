import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Button from './ui/Button';

const PlanCard = ({ plan, isMostPopular = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const formatPrice = (value) => `€ ${value.toFixed(2).replace('.', ',')}`;
  const priceLabel =
    typeof plan.price === 'number' ? formatPrice(plan.price) : plan.priceText ?? 'Op aanvraag';
  const periodLabel = plan.period ? `${plan.periodPrefix ?? '/'} ${plan.period}`.trim() : '';

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? undefined : { duration: 0.35, ease: 'easeOut' }}
      className={clsx(
        'relative flex h-full flex-col rounded-4xl border border-white/10 p-6 shadow-card',
        isMostPopular ? 'bg-white/[0.08]' : 'bg-white/[0.03]'
      )}
    >
      <div className="mb-4 h-7">
        {isMostPopular && (
          <span className="inline-flex rounded-full bg-fitcity px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-night">
            Populair
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Membership</p>
        <h3 className="text-2xl font-display">{plan.name}</h3>
        {plan.description && <p className="text-sm text-white/60">{plan.description}</p>}
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-2">
        <p className="text-4xl font-display text-fitcity">{priceLabel}</p>
        {periodLabel && <p className="text-sm text-white/50">{periodLabel}</p>}
      </div>

      <ul className="mt-6 space-y-3 text-sm text-white/80">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-1 h-1 w-5 rounded-full bg-fitcity" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Button as={Link} to="/contact" variant={isMostPopular ? 'primary' : 'ghost'} className="w-full justify-center">
          Kies dit plan
        </Button>
      </div>
    </motion.div>
  );
};

export default PlanCard;
