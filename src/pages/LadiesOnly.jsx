import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Users, Shield, Play, Facebook, Instagram } from 'lucide-react';
import Section from '../components/Section';
import Container from '../components/Container';
import PlanCard from '../components/PlanCard';
import Button from '../components/ui/Button';
import CtaStrip from '../components/CtaStrip';
import VideoDialog from '../components/VideoDialog';
import { ladiesOnlyPlans } from '../data/memberships';
import { getPrimaryCta } from '../data/ctaConfig';

const features = [
  { icon: Sparkles, title: 'Afgesloten ladies only', copy: 'Eigen entree met apparatuur en spiegels alleen voor vrouwen.' },
  { icon: Heart, title: 'Uitbreiding in de maak', copy: 'We breiden de ruimte uit door een wand te openen voor extra vloeroppervlak.' },
  { icon: Users, title: 'Train op jouw manier', copy: 'Kracht, cardio of circuit: kies het ritme dat bij je past.' },
  { icon: Shield, title: 'Laagdrempelig starten', copy: 'Intake en schema helpen je snel vertrouwd te raken met de ruimte.' },
];

const ladiesSocials = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/fitcity_ladiesonly/?hl=en' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/people/Fitcity-Ladiesonly/100086462763413/' },
];

const LadiesOnly = () => {
  const [showVideo, setShowVideo] = useState(false);
  const primaryCta = getPrimaryCta('ladiesOnly');

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src="/FitCity%20ladies%20promoting%20fitness%20together.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 40%' }}
          loading="eager"
          decoding="async"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/55 to-black/80" aria-hidden="true" />
        <Container className="relative z-10 py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="space-y-6 rounded-4xl border border-white/10 bg-black/60 p-6 text-white/85 backdrop-blur-md sm:p-8">
              <div className="space-y-3 text-white">
                <p className="text-xs uppercase tracking-[0.4em] text-fitcity">Ladies Only</p>
                <h1 className="text-3xl font-display sm:text-4xl lg:text-5xl">Train in je eigen zone</h1>
                <p className="text-base text-white/75">Ladies Only Zone wordt vergroot: meer ruimte en toestellen onderweg.</p>
              </div>
              <p className="text-base leading-relaxed text-white/85">
                Hier train je samen met andere vrouwen in een afgesloten ruimte met eigen apparatuur. Kies je eigen tempo en mix kracht met cardio.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1 w-4 rounded-full bg-fitcity" aria-hidden="true" />
                  Afgesloten ladies only verdieping binnen de club
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1 w-4 rounded-full bg-fitcity" aria-hidden="true" />
                  Meer vloeroppervlak en toestellen in aanbouw
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1 w-4 rounded-full bg-fitcity" aria-hidden="true" />
                  Volledig focussen zonder inkijk van de fitnessvloer
                </li>
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  variant="ghost"
                  size="lg"
                  icon={Play}
                  className="sm:min-w-[180px] justify-center border border-white/30 bg-white/10 backdrop-blur hover:border-fitcity/70 hover:bg-white/15"
                  onClick={() => setShowVideo(true)}
                >
                  Bekijk ladies only
                </Button>
                <Button as="a" href="#ladies-memberships" size="lg" className="sm:min-w-[180px] justify-center">
                  Bekijk abonnementen
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section
        tone="overlay"
        header={{ eyebrow: 'Waarom Ladies Only', title: 'Alles wat je nodig hebt op een plek' }}
        contentClassName="grid gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        {features.map(({ icon: Icon, title, copy }) => (
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
        header={{
          eyebrow: 'Memberships',
          title: 'Kies het ritme dat bij je past',
          subtitle: 'Alle ladies only abonnementen zijn inclusief groepslessen, intake en schema op maat.',
        }}
        contentClassName="grid gap-6 md:grid-cols-3 lg:grid-cols-3"
        id="ladies-memberships"
      >
        {ladiesOnlyPlans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} isMostPopular={Boolean(plan.mostPopular)} />
        ))}
      </Section>

      <Section
        tone="panel"
        header={{
          eyebrow: 'Volg Ladies Only',
          title: 'Updates, sfeer en nieuwe lessen',
          subtitle: 'Volg de Ladies Only community voor nieuws en content.',
        }}
        contentClassName="flex flex-col gap-4 sm:flex-row"
      >
        {ladiesSocials.map(({ icon: Icon, label, href }) => (
          <Button key={label} as="a" href={href} variant="ghost" className="flex-1 justify-center gap-2">
            <Icon size={18} />
            {label}
          </Button>
        ))}
      </Section>

      <CtaStrip
        eyebrow="Start vandaag"
        title="Plan een proefles en rondleiding"
        copy="We reageren doorgaans binnen een werkdag."
        primaryCta={primaryCta}
      />
      <VideoDialog
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        src="/ladiesonlygym.mp4"
        label="Ladies only video impressie"
      />
    </>
  );
};

export default LadiesOnly;





