import { Link } from 'react-router-dom';
import { Facebook, Instagram, Music2, Clock } from 'lucide-react';
import Container from './Container';
import Button from './ui/Button';
import FooterLogo from './ui/FooterLogo';
import { openingHours } from '../data/facilityInfo';
import { contactDetails, navItems } from '../data/siteMeta';

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/p/Fitcity-Culemborg-100063646716139/', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/fitcityculemborg/?hl=en', label: 'Instagram' },
  { icon: Music2, href: 'https://www.tiktok.com/@fitcity.culemborg', label: 'TikTok' },
];

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/5 bg-charcoal/70">
      <Container className="py-16 space-y-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/fitcity-logo.png?v=3" alt="Fitcity logo" className="h-14 w-auto rounded-2xl border border-white/5 bg-white/5 p-2" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Fitcity</p>
                <p className="font-display text-2xl">Culemborg</p>
              </div>
            </Link>
            <p className="text-white/60 text-balance">
              Gezondheidscentrum voor Sport, Bewegen & Zorg. Moderne faciliteiten, persoonlijke begeleiding en een warme community.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:text-fitcity"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Contact</p>
            <div className="space-y-4">
              {contactDetails.filter((detail) => detail.showInFooter).map(({ icon: Icon, content, href }) => (
                <div key={content} className="flex items-center gap-3 text-white/70">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                    <Icon size={18} />
                  </span>
                  {href ? (
                    <a href={href} className="text-sm hover:text-fitcity">
                      {content}
                    </a>
                  ) : (
                    <span className="text-sm">{content}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Snel naar</p>
              <div className="flex flex-wrap gap-3">
                {navItems.map((link) => (
                  <Link key={link.label} to={link.to} className="text-sm text-white/70 transition hover:text-fitcity">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Openingstijden</p>
            <div className="rounded-3xl border border-white/5 p-6">
              {openingHours.map((item) => (
                <div key={item.day} className="flex items-center justify-between text-sm text-white/70">
                  <span>{item.day}</span>
                  <span>{item.time}</span>
                </div>
              ))}
              <a
                href="/contact#speciale-openingstijden"
                className="mt-4 flex items-center gap-2 text-xs text-white/50 hover:text-fitcity"
              >
                <Clock size={14} />
                Zie speciale openingstijden
              </a>
            </div>
            <Button as={Link} to="/contact" size="sm" className="w-full justify-center">
              Neem contact op
            </Button>
          </div>
        </div>

        <div className="grid gap-8 rounded-4xl border border-white/5 bg-white/[0.02] p-8 md:grid-cols-2">
          <form className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-fitcity">Nieuwsbrief</p>
            <p className="text-sm text-white/60">Nieuws en praktische updates van de club.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Je e-mailadres"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-fitcity focus:outline-none"
              />
              <Button type="submit" size="sm" className="whitespace-nowrap">
                Meld me aan
              </Button>
            </div>
          </form>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <iframe
              title="Fitcity Culemborg map"
              src="https://www.google.com/maps?q=Fitcity%20Culemborg&hl=nl&z=15&output=embed"
              className="h-[220px] w-full border-0 md:h-[240px] lg:h-[260px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Fitcity Culemborg. Alle rechten voorbehouden.</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-fitcity">Privacy</Link>
              <Link to="/voorwaarden" className="hover:text-fitcity">Voorwaarden</Link>
              <Link to="/cookiebeleid" className="hover:text-fitcity">Cookiebeleid</Link>
            </div>
            <FooterLogo theme="dark" />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
