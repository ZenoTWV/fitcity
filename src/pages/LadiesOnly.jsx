import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Users, Shield, Play, Facebook, Instagram } from 'lucide-react';
import Section from '../components/Section';
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
      <Section
        header={{
          eyebrow: 'Ladies Only',
          title: 'Een eigen plek om te groeien en te focussen',
          subtitle: 'Ladies Only Zone wordt vergroot: meer ruimte en toestellen onderweg.',
          align: 'left',
        }}
        contentClassName="grid items-center gap-10 lg:grid-cols-2"
      >
        <div className="space-y-6 text-white/70 lg:max-w-xl">
          <p className="text-base leading-relaxed">
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              as={Link}
              to={primaryCta.href}
              className="sm:min-w-[180px]"
              data-tracking-id={primaryCta.trackingId}
            >
              {primaryCta.label}
            </Button>
            <Button as="a" href="#ladies-memberships" variant="ghost" className="sm:min-w-[180px] justify-center">
              Bekijk abonnementen
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-4xl border border-white/10">
          <img
            src="/FitCity%20ladies%20promoting%20fitness%20together.webp"
            alt="Ladies only sfeer"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="p-6">
              <Button
                variant="ghost"
                size="lg"
                icon={Play}
                className="justify-center border border-white/30 bg-white/10 backdrop-blur hover:border-fitcity/70 hover:bg-white/15"
                onClick={() => setShowVideo(true)}
              >
                Bekijk ladies only
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        tone="overlay"
        header={{ eyebrow: 'Waarom Ladies Only', title: 'Alles wat je nodig hebt op één plek' }}
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





