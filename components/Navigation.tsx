import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Studio', href: '#studio' },
    { name: 'Team', href: '#team' },
    { name: 'Inquiry', href: '#inquiry' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md py-4 border-b border-black/5 text-black' 
            : 'bg-transparent py-8 text-white'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`text-xl md:text-2xl font-sans font-extrabold tracking-tighter z-50 relative ${isMobileMenuOpen ? 'text-black' : ''}`}>
            FLAUX ARCHITECTURES.
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
                  isScrolled ? 'hover:text-flaux-red' : 'hover:text-flaux-red'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden z-50 relative ${isMobileMenuOpen ? 'text-black' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-4xl font-serif text-black hover:text-flaux-red transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;