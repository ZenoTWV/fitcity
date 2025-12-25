import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Dumbbell, Sparkles, Shield, Activity, Star } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import PlanCard from '../components/PlanCard';
import Button from '../components/ui/Button';
import CtaStrip from '../components/CtaStrip';
import { homeMembershipTeasers } from '../data/memberships';
import { primaryCta } from '../data/ctaConfig';

const valueProps = [
  {
    icon: Dumbbell,
    title: 'Goede apparatuur',
    copy: 'Cardio en kracht van TechnoGym, Nautilus, SportsArt en meer.',
  },
  {
    icon: Sparkles,
    title: 'Ruimte voor iedereen',
    copy: 'Van starters tot gevorderden - laagdrempelig en vriendelijk.',
  },
  {
    icon: Shield,
    title: 'Hulp op de vloer',
    copy: 'Altijd iemand aanwezig voor vragen of een tip bij je training.',
  },
  {
    icon: Activity,
    title: 'Kickboksen',
    copy: 'Lessen voor kids en volwassenen, te combineren met fitness.',
  },
];

const socialStats = [
  { label: 'Rating', value: '4.6/5' },
  { label: 'Parkeren', value: 'Gratis' },
  { label: 'Only zone', value: 'Ladies' },
];

const kickboxingCards = [
  { image: '/kickboksen-home-card.webp', title: 'Kickboksen', description: 'Techniek, conditie en sparren in kleine groepen.', to: '/kickboksen' },
  { image: '/kickboksen-kids.webp', title: 'Kinderkickboksen', description: 'Speelse lessen met focus op zelfvertrouwen.', to: '/kickboksen' },
];

const kickboxingSchedule = [
  { label: 'Maandag', detail: 'Kids 18:00-19:00, volwassenen 19:00-20:00' },
  { label: 'Donderdag', detail: 'Kids 18:00-19:00, volwassenen 19:00-20:00' },
  { label: 'Zondag', detail: 'Kids 10:00-11:00, volwassenen 11:00-12:00' },
  { label: 'Membership opties', detail: 'Kickboksen 1x p/w of onbeperkt, of all-in via Ultimate Fit Deal.' },
  { label: 'Proefles', detail: 'Laagdrempelig instappen; materiaal te leen in de club.' },
];

const Home = () => {
  return (
    <>
      <Hero />

      <Section
        header={{
          eyebrow: 'Omgeving',
          title: 'Een moderne, warme club voor elke fase van jouw fitnessreis',
          subtitle: '',
          align: 'left',
        }}
        contentClassName="grid gap-12 lg:grid-cols-2"
      >
        <div className="space-y-6">
          <p className="text-white/70">
            Fitness, ladies only zone en (kick)boksen onder 1 dak. Onze crew helpt je graag verder op de vloer.
          </p>
          <ul className="space-y-4 text-white/70">
            {[
              'Cardio & kracht: TechnoGym, Nautilus, SportsArt e.a.',
              'Flexibele abonnementen zonder kleine lettertjes',
              'Kickboksen voor kids en volwassenen',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-fitcity/20 text-fitcity" aria-hidden="true">-</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button as={Link} to="/abonnementen">
              Bekijk abonnementen
            </Button>
            <Button as={Link} to={primaryCta.href} variant="ghost" data-tracking-id={primaryCta.trackingId}>
              {primaryCta.label}
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <img
            src="/fitcity_groepsles.webp"
            alt="Sfeerimpressie groepsles"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Section>

      <Section
        header={{
          eyebrow: 'Waarom Fitcity',
          title: 'Toegankelijk, persoonlijk en altijd in beweging',
          align: 'left',
        }}
        contentClassName="grid gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        {valueProps.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fitcity/15 text-fitcity">
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-display">{title}</h3>
            <p className="mt-2 text-sm text-white/70">{copy}</p>
          </div>
        ))}
      </Section>

      <Section
        tone="contrast"
        header={{
          eyebrow: 'Abonnementen',
          title: 'Flexibele memberships zonder kleine lettertjes',
          subtitle: 'Kies het lidmaatschap dat past bij jouw doelen. Kickboksen kan los of gecombineerd met fitness.',
        }}
        contentClassName="grid gap-6 md:grid-cols-3 lg:grid-cols-3"
        disableReveal
      >
        {homeMembershipTeasers.map((plan) => (
          <PlanCard key={plan.name} plan={plan} isMostPopular={false} />
        ))}
        <div className="md:col-span-3 lg:col-span-3 flex justify-center">
          <Button as={Link} to="/abonnementen" variant="ghost" className="w-full max-w-xs justify-center">
            Bekijk alle abonnementen
          </Button>
        </div>
      </Section>

      <Section
        header={{
          eyebrow: 'Community',
          title: 'Samen fit worden en blijven',
          subtitle: 'We bouwen aan een inclusieve community waar iedereen zich gezien voelt.',
        }}
        contentClassName="grid gap-6 lg:grid-cols-[minmax(320px,0.8fr)_1.2fr] items-start"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
          {socialStats.map((stat, index) => (
            <div
              key={stat.label}
              className={clsx(
                'flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-4 text-center',
                index === socialStats.length - 1 ? 'lg:col-span-2' : ''
              )}
            >
              <p className="text-3xl font-display leading-tight">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6 rounded-4xl border border-white/10 bg-white/[0.02] p-8">
          <div className="flex items-center gap-3 text-fitcity">
            <Star size={20} />
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">Reviews</p>
          </div>
          <p className="text-lg text-white/80">
            Fijne sportschool met een mooie, roze womens only afdeling. Hier staat voldoende apparatuur voor een goede workout.
          </p>
          <div>
            <p className="font-semibold">Vienna</p>
            <p className="text-sm text-white/50">5/5 Google review</p>
          </div>
        </div>
      </Section>

      <Section
        tone="panel"
        header={{
          eyebrow: 'Kickboksen',
          title: 'Kickboksen voor kids en volwassenen',
          subtitle: 'Bekijk alle info, rooster en memberships op de kickboksen pagina.',
        }}
        contentClassName="grid gap-8 lg:grid-cols-2"
      >
        <div className="space-y-6">
          <p className="text-white/70">
            Techniek, conditie en sparren op afspraak. Kids (vanaf 6 jaar) en volwassenen trainen op vaste momenten. Alles over het rooster en de deals vind je op de kickboksen pagina.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to="/kickboksen" className="w-full justify-center">
              Naar kickboksen pagina
            </Button>
            <Button as={Link} to="/contact#proefles" variant="ghost" className="w-full justify-center">
              Plan een proefles
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {kickboxingCards.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group relative overflow-hidden rounded-4xl border border-white/10 transition-colors hover:border-fitcity/30"
            >
              <img src={item.image} alt={item.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </Link>
          ))}
        </div>
      </Section>

      <CtaStrip
        eyebrow="Start vandaag"
        title="Plan een gratis proefles"
        copy="Probeer de gym en krijg een korte rondleiding."
        primaryCta={primaryCta}
      />
    </>
  );
};

export default Home;


