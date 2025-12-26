import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import LadiesOnly from './pages/LadiesOnly';
import Kickboksen from './pages/Kickboksen';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Voorwaarden from './pages/Voorwaarden';
import Cookiebeleid from './pages/Cookiebeleid';
import Inschrijven from './pages/Inschrijven';
import Bedankt from './pages/Bedankt';
import Admin from './pages/Admin';
import AnimatedPage from './components/AnimatedPage';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-night text-white">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/abonnementen" element={<AnimatedPage><Pricing /></AnimatedPage>} />
            <Route path="/ladies-only" element={<AnimatedPage><LadiesOnly /></AnimatedPage>} />
            <Route path="/kickboksen" element={<AnimatedPage><Kickboksen /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
            <Route path="/privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
            <Route path="/voorwaarden" element={<AnimatedPage><Voorwaarden /></AnimatedPage>} />
            <Route path="/cookiebeleid" element={<AnimatedPage><Cookiebeleid /></AnimatedPage>} />
            <Route path="/inschrijven" element={<Inschrijven />} />
            <Route path="/bedankt" element={<Bedankt />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App;
