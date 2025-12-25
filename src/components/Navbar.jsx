import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Container from './Container';
import { navItems } from '../data/siteMeta';
import Button from './ui/Button';

const NavItem = ({ to, children, onClick, showDivider = true }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      clsx(
        'relative text-xs font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors duration-200',
        'hover:text-white focus-visible:outline-none focus-visible:text-fitcity',
        isActive && 'text-fitcity'
      )
    }
  >
    <span className="inline-flex items-center gap-2">
      {children}
      {showDivider && <span className="hidden h-px w-6 bg-white/20 md:block" aria-hidden />}
    </span>
  </NavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-charcoal/80 backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fitcity/60 to-transparent" aria-hidden />
      <Container className="flex h-20 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fitcity/60 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal rounded-2xl">
          <img
            src="/fitcity-logo.png?v=3"
            alt="Fitcity Culemborg"
            className="h-12 w-auto rounded-2xl border border-white/10 bg-white/5 p-1 shadow-card"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Fitcity</p>
            <p className="font-display text-base leading-tight">Culemborg</p>
          </div>
        </NavLink>

        <div className="hidden items-center gap-6 lg:flex">
          <nav className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <NavItem key={item.to} to={item.to} showDivider={index !== navItems.length - 1}>
                {item.label}
              </NavItem>
            ))}
          </nav>
          <Button as={NavLink} to="/inschrijven" size="md" className="shadow-glow">
            Inschrijven
          </Button>
        </div>
        <button
          type="button"
          className="lg:hidden rounded-full border border-white/20 p-2 text-white"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="panel"
              className="fixed inset-x-0 top-20 z-50 origin-top rounded-t-3xl border-t border-white/10 bg-charcoal/95"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.25 }}
            >
              <Container className="py-10">
                <div className="flex flex-col gap-6 text-center">
                  {navItems.map((item, index) => (
                    <NavItem
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      showDivider={index !== navItems.length - 1}
                    >
                      {item.label}
                    </NavItem>
                  ))}
                  <Button
                    as={NavLink}
                    to="/inschrijven"
                    className="w-full"
                    size="lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Inschrijven
                  </Button>
                  <div className="text-xs uppercase tracking-[0.35em] text-white/40">
                    <p>Ma-vr 08:30 - 22:00</p>
                    <p>Za 09:00 - 16:00 & Zo 09:30 - 16:00</p>
                  </div>
                </div>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;





