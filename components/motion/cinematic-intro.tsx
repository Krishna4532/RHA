"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const particles = Array.from({ length: 18 }, (_, index) => index);

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const initialAnimation = useMemo(
    () => ({
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.9,
      y: prefersReducedMotion ? 0 : 24,
      rotateX: prefersReducedMotion ? 0 : 20,
      rotateY: prefersReducedMotion ? 0 : -12,
    }),
    [prefersReducedMotion],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShow(false);
      window.setTimeout(onComplete, 320);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.16, 0.3, 0.5, 0.7] }}
            transition={{ duration: 2.1, ease: 'easeOut' }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,130,32,0.09),transparent_72%)]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.4, 0.85], scale: [1.05, 1.02, 1] }}
            transition={{ duration: 2.1, ease: 'easeOut' }}
            className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.9)_45%,rgba(255,255,255,0.98)_100%)]"
          />
          {particles.map((particle) => (
            <motion.span
              key={particle}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 0.85, 0],
                x: [0, (particle % 3) * 120 - 120, (particle % 5) * 80 - 120],
                y: [0, (particle % 4) * 90 - 120, -220],
                scale: [0.4, 1, 0.6],
              }}
              transition={{ duration: 2.6, delay: particle * 0.04, ease: 'easeOut' }}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent/70"
              style={{ left: `${18 + (particle % 6) * 12}%`, top: `${20 + (particle % 5) * 14}%` }}
            />
          ))}
          <motion.div
            initial={initialAnimation}
            animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [0.86, 1.05, 1], rotateY: [0, 9, -8, 0], rotateX: [0, -6, 4, 0], y: [0, -12, 8, 0], x: [0, 10, -8, 0] }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-44 w-44 items-center justify-center sm:h-60 sm:w-60"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 0.3, 0.45, 0.92], scale: [0.72, 1.06, 1.02, 1.08] }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full blur-[54px]"
              style={{ background: 'radial-gradient(circle, rgba(245,130,32,0.38) 0%, rgba(245,130,32,0) 72%)' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: [0, -10, 0], scale: [0.94, 1.06, 1] }}
              transition={{ duration: 1.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <Image
                src="/logo.jpg"
                alt="Movement logo"
                width={240}
                height={240}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_0_70px_rgba(17,17,17,0.16)]"
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.75, 0] }}
            transition={{ duration: 0.8, delay: 2.25, ease: 'easeOut' }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
