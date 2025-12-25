import { motion } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Clock, Play } from 'lucide-react';
import Container from './Container';
import Button from './ui/Button';
import { heroMedia, heroStats, openingHours, holidayHours } from '../data/facilityInfo';
import { primaryCta } from '../data/ctaConfig';
import VideoDialog from './VideoDialog';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const backgroundWebp = heroMedia.background.webp;
  const backgroundJpg = heroMedia.background.jpg;
  const hasWebp = Boolean(backgroundWebp);
  const hasJpg = Boolean(backgroundJpg);
  const fallbackImage = hasWebp ? backgroundWebp : backgroundJpg;
  const todayKey = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' })
    .format(new Date())
    .toLowerCase()
    .replace('.', '');

  return (
    <>
      <section className="relative overflow-hidden" id="hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: hasWebp && hasJpg
              ? `image-set(url("${backgroundWebp}") type("image/webp"), url("${backgroundJpg}") type("image/jpeg"))`
              : `url("${fallbackImage}")`,
          }}
          aria-hidden="true"
        />
        <noscript>
          {hasWebp && hasJpg ? (
            <picture>
              <source srcSet={backgroundWebp} type="image/webp" />
              <img
                src={backgroundJpg}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
          ) : (
            <img
              src={fallbackImage}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
        </noscript>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/60" />

        <Container className="relative z-10 grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-4xl font-display sm:text-5xl lg:text-6xl leading-tight">
              <span className="block">Jouw tempo.</span>
              <span className="block text-fitcity">Elke dag fitter.</span>
            </h1>
            <p className="text-lg text-white/70">
              FitCity Culemborg is de meest betaalbare gym uit de regio met moderne apparatuur en een eigen ladies only zone.
            </p>
            <Button
              as={Link}
              to={primaryCta.href}
              variant="ghost"
              size="sm"
              className="gap-2 border border-fitcity/30 bg-fitcity/10 text-fitcity hover:border-fitcity/60 hover:bg-fitcity/15"
              data-tracking-id={primaryCta.trackingId}
            >
              <span className="h-2 w-2 rounded-full bg-fitcity" />
              Start het nieuwe jaar fit: plan een proefles.
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="ghost"
                size="lg"
                icon={Play}
                className="justify-start border border-white/20 bg-white/5 hover:border-fitcity/60 sm:justify-center"
                onClick={() => setShowVideo(true)}
              >
                Bekijk de club
              </Button>
              <Button as={Link} to="/abonnementen" size="lg">
                Bekijk abonnementen
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 sm:grid sm:grid-cols-3 sm:gap-6">
              {heroStats.map((stat) => (
                <div key={stat.label} className="min-w-[140px] flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl font-display">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-4xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-3xl">
              <div className="flex items-center gap-3 text-fitcity">
                <Clock size={20} />
                <p className="text-xs uppercase tracking-[0.4em]">Openingstijden</p>
              </div>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                {openingHours.map((slot) => (
                  <div key={slot.day} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                    <span>{slot.day}</span>
                    <span>{slot.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-white/60">
                <p className="uppercase tracking-[0.3em] text-white/50">Speciale openingstijden</p>
                <div className="mt-2 space-y-1">
                  {holidayHours.map((item) => (
                    <div
                      key={item.day}
                      className={clsx(
                        'flex items-center justify-between rounded-2xl border px-3 py-2',
                        item.day.toLowerCase() === todayKey
                          ? 'border-fitcity/70 bg-fitcity/10 text-fitcity'
                          : 'border-white/5 bg-white/[0.03] text-white'
                      )}
                    >
                      <span className="font-semibold">{item.day}</span>
                      <span className="text-white/80">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
        <VideoDialog
          isOpen={showVideo}
          onClose={() => setShowVideo(false)}
          src={heroMedia.video.src}
          label="Fitcity video impressie"
        />
      </section>
    </>
  );
};

export default Hero;
