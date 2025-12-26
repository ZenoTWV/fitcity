import { Link } from 'react-router-dom';
import Section from '../components/Section';
import PlanCard from '../components/PlanCard';
import Button from '../components/ui/Button';
import CtaStrip from '../components/CtaStrip';
import Container from '../components/Container';
import Carousel from '../components/Carousel';
import { kickboxingPlans } from '../data/memberships';
import { kickboxingFeatures, kickboxingSchedule, beginnerInfo } from '../data/kickboxingInfo';
import { getPrimaryCta } from '../data/ctaConfig';

const heroBullets = [
  'Techniek- en conditieblokken met pads en bagwork',
  'Lessen voor kids (vanaf 6 jaar) en volwassenen',
  'Sparren veilig en begeleid met duidelijke veiligheidsregels',
  'Combineer met fitness via Ultimate Fit',
];

const kidsHighlights = [
  'Respect en discipline op een speelse manier',
  'Samenwerken en zelfvertrouwen opbouwen',
  'Beweging, balans en basisvaardigheden',
];

const kickboxingGalleryImages = [
  { src: '/kickboxen-pictures/kickboxen-1.jpeg', alt: 'Kickbokstraining bij FitCity' },
  { src: '/kickboxen-pictures/kickboxen-2.jpeg', alt: 'Groepstraining kickboksen' },
  { src: '/kickboxen-pictures/kickboxen-3.jpeg', alt: 'Techniektraining met pads' },
  { src: '/kickboxen-pictures/kickboxen-4.jpeg', alt: 'Kickboksles voor kids en volwassenen' },
  { src: '/kickboxen-pictures/kickboxen-5.jpeg', alt: 'Sparren onder begeleiding' },
  { src: '/kickboxen-pictures/kickboxen-6.jpeg', alt: 'Conditietraining kickboksen' },
];

const Kickboksen = () => {
  const primaryCta = getPrimaryCta('kickboxing');

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src="/kickboksen-hero.webp"
          alt="Groep kickboksers in de ring bij FitCity"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 75%' }}
          loading="eager"
          decoding="async"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/25" aria-hidden="true" />
        <Container className="relative z-10 py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-sm sm:p-8 space-y-6 text-white/85">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-fitcity">Kickboksen</p>
                <h1 className="text-3xl font-display sm:text-4xl lg:text-5xl">Train op jouw niveau</h1>
                <p className="text-base text-white/70">Techniek, kracht en conditie in elke training.</p>
              </div>
              <p className="text-base leading-relaxed text-white/85">
                Bij FitCity Kickboksen bouwen we techniek, uithoudingsvermogen en kracht op met pads, bagwork en partnerdrills. Sparren gebeurt veilig en begeleid, altijd met focus op techniek.
              </p>
              <ul className="space-y-3 text-sm">
                {heroBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-1 w-4 rounded-full bg-fitcity" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  as="a"
                  href="#kickboxing-memberships"
                  size="lg"
                  className="sm:min-w-[180px] justify-center"
                >
                  Bekijk abonnementen
                </Button>
                <Button
                  as={Link}
                  to={primaryCta.href}
                  variant="ghost"
                  size="lg"
                  className="sm:min-w-[180px] justify-center border border-white/30 bg-white/10 backdrop-blur hover:border-fitcity/70 hover:bg-white/15"
                  data-tracking-id={primaryCta.trackingId}
                >
                  {primaryCta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section
        tone="overlay"
        header={{ eyebrow: 'Waarom Kickboksen bij FitCity', title: 'Alles om goed te starten en door te groeien' }}
        contentClassName="grid gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        {kickboxingFeatures.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fitcity/15 text-fitcity">
              <Icon size={20} />
            </div>
            <h3 className="text-xl font-display">{title}</h3>
            <p className="mt-2 text-sm text-white/70">{copy}</p>
          </div>
        ))}
      </Section>

      <Section
        tone="contrast"
        header={{
          eyebrow: 'In actie',
          title: 'Onze kickboksers aan het werk',
        }}
      >
        <Carousel images={kickboxingGalleryImages} />
      </Section>

      <Section
        header={{
          eyebrow: 'Rooster',
          title: 'Lessen voor kids en volwassenen',
          subtitle: 'Meerdere momenten per week, makkelijk te combineren.',
        }}
        contentClassName="grid gap-6 md:grid-cols-3"
      >
        {kickboxingSchedule.map((day) => (
          <div key={day.day} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-fitcity">{day.day}</p>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              {day.sessions.map((session) => (
                <div key={session.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <span className="font-semibold text-white">{session.label}</span>
                  <span className="text-white/70">{session.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section
        tone="panel"
        header={{
          eyebrow: 'Eerste keer kickboksen?',
          title: beginnerInfo.title,
          subtitle: beginnerInfo.subtitle,
        }}
        contentClassName="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-4">
          <ul className="space-y-3 text-sm text-white/70">
            {beginnerInfo.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-1 w-4 rounded-full bg-fitcity" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <Button as={Link} to="/contact" variant="ghost" className="w-full justify-center sm:w-auto">
            Vragen? Neem contact op
          </Button>
        </div>
        <div className="relative overflow-hidden rounded-4xl border border-white/10">
          <img
            src="/kickboksen-beginners.webp"
            alt="Kickbokstraining met focus op techniek"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" aria-hidden="true" />
        </div>
      </Section>

      <Section
        header={{
          eyebrow: 'Kinderkickboksen',
          title: 'Spelenderwijs leren en groeien',
          subtitle: 'Voor kinderen vanaf 6 jaar - focus op plezier, techniek en zelfvertrouwen.',
        }}
        contentClassName="grid items-center gap-10 lg:grid-cols-2"
      >
        <div className="relative overflow-hidden rounded-4xl border border-white/10">
          <img
            src="/kickboksen-kids.webp"
            alt="Kinderkickboksles bij FitCity"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" aria-hidden="true" />
        </div>
        <div className="space-y-4 text-white/70 lg:max-w-xl">
          <p>
            Kids leren de basis van kickboksen in een veilige, positieve setting. Techniek, discipline en plezier staan centraal.
          </p>
          <ul className="space-y-3 text-sm">
            {kidsHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-1 w-4 rounded-full bg-fitcity" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button as={Link} to={primaryCta.href} className="sm:min-w-[180px]" data-tracking-id={primaryCta.trackingId}>
              Plan een proefles
            </Button>
            <Button as={Link} to="/contact" variant="ghost" className="sm:min-w-[180px] justify-center">
              Stel een vraag
            </Button>
          </div>
        </div>
      </Section>

      <Section
        id="kickboxing-memberships"
        header={{
          eyebrow: 'Memberships',
          title: 'Kies het ritme dat bij je past',
          subtitle: 'Kickboksen 1x per week, onbeperkt, of all-in met fitness via Ultimate Fit.',
        }}
        contentClassName="grid gap-6 md:grid-cols-3 lg:grid-cols-3"
      >
        {kickboxingPlans.slice().reverse().map((plan) => (
          <PlanCard key={plan.name} plan={plan} isMostPopular={Boolean(plan.mostPopular)} />
        ))}
      </Section>

      <CtaStrip
        eyebrow="Start vandaag"
        title="Plan een proefles en ontdek kickboksen"
        copy="Kom kennismaken, geen verplichtingen. We reageren binnen een werkdag."
        primaryCta={primaryCta}
      />
    </>
  );
};

export default Kickboksen;
