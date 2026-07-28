"use client";

import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#why-reservation-removal', label: 'Why Reservation Removal' },
  { href: '#our-demands', label: 'Our Demands' },
  { href: '#current-campaign', label: 'Current Campaign' },
  { href: '#join', label: 'Join' },
  { href: '#ai', label: 'AI Assistant' },
];

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const springY = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-34% 0px -34% 0px', threshold: [0.2, 0.4, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      style={{ opacity: springY }}
      className="sticky top-0 z-[70] w-full px-3 py-3 sm:px-4"
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 px-4 py-3 shadow-[0_24px_80px_-30px_rgba(17,17,17,0.28)] backdrop-blur-2xl transition-all duration-500 sm:px-6 lg:px-8 ${scrolled ? 'bg-white/85' : 'bg-white/75'}`}>
        <Link href="#home" className="flex items-center gap-3 text-foreground transition-transform duration-300 hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-white/80 shadow-sm">
            <Image src="/logo.jpg" alt="Reservation Htao Andolan logo" width={36} height={36} className="h-full w-full object-cover" />
          </div>
          <span className="text-sm font-semibold tracking-[0.2em] sm:text-base">RESERVATION HTAO ANDOLAN</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-foreground-soft xl:flex">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap transition-all duration-300 ${isActive ? 'text-foreground' : 'hover:text-foreground'}`}
              >
                <span className="block transition-transform duration-300 hover:-translate-y-0.5">{link.label}</span>
                {isActive ? <span className="mt-1 block h-px w-full bg-accent" /> : null}
              </a>
            );
          })}
        </nav>
        <button
          className="rounded-full border border-border/70 bg-white/80 p-2 text-foreground shadow-sm backdrop-blur xl:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="mx-3 mt-2 rounded-[1.25rem] border border-white/70 bg-white/95 px-4 py-6 shadow-[0_24px_80px_-32px_rgba(17,17,17,0.3)] backdrop-blur xl:hidden"
        >
          <div className="flex flex-col gap-4 text-base font-medium text-foreground">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="transition-all duration-300"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
