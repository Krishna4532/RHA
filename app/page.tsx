"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, BadgeCheck, ChevronDown, HandCoins, HeartHandshake, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { CinematicIntro } from '@/components/motion/cinematic-intro';
import { SiteNav } from '@/components/layout/site-nav';
import { Button } from '@/components/ui/button';
import { useLenis } from '@/hooks/use-lenis';

const heroImage = '/image.png';
const aboutImage = '/images/india-about.svg';
const whyImage = '/images/india-why.svg';
const joinImage = '/images/india-join.svg';
const flagImage = '/images/india-flag.svg';

const aboutCards = [
  {
    title: 'Constitutional',
    description: 'Committed to peaceful and lawful democratic participation.',
  },
  {
    title: 'Transparency',
    description: 'Sharing official information, campaigns, and documents openly.',
  },
  {
    title: 'Awareness',
    description: 'Promoting informed discussions through research and education.',
  },
  {
    title: 'Unity',
    description: 'Bringing together individuals who support constructive public dialogue.',
  },
];

const featureCards = [
  {
    icon: ShieldCheck,
    title: 'Equal Opportunity for Every Citizen',
    description: 'The movement advocates for transparent standards and fair access to opportunities.',
  },
  {
    icon: Users,
    title: 'Merit-Based Education & Employment',
    description: 'Public policy should support excellence while remaining responsive to social realities.',
  },
  {
    icon: BadgeCheck,
    title: 'Constitutional & Democratic Reform',
    description: 'Reforms must be pursued through lawful, peaceful, and democratic public processes.',
  },
  {
    icon: HeartHandshake,
    title: 'Peaceful Civic Participation',
    description: 'The movement promotes informed conversation and constructive civic engagement.',
  },
];

const demandCards = [
  {
    icon: ShieldCheck,
    title: 'Persons with Disabilities',
    description: 'Support for every disabled person through equal opportunity and focused care.',
  },
  {
    icon: HeartHandshake,
    title: 'Orphans',
    description: 'A compassionate and dignified framework for support and inclusion.',
  },
  {
    icon: BadgeCheck,
    title: 'Families of Martyrs',
    description: 'Recognition and support for the families of those who gave everything for the nation.',
  },
  {
    icon: HandCoins,
    title: 'Economically Disadvantaged Citizens',
    description: 'Directed support on economic grounds, regardless of religion or caste.',
  },
];

const joinCards = [
  {
    title: 'Volunteer',
    description: 'Community outreach, awareness events, and peaceful participation opportunities will be announced soon.',
    buttonLabel: 'Coming Soon',
  },
  {
    title: 'Stay Updated',
    description: 'Follow official updates, campaigns, and public statements as the movement expands.',
    buttonLabel: 'Coming Soon',
  },
];

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  useLenis();

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem('movement-intro-seen');
    if (hasSeenIntro) {
      setShowIntro(false);
    } else {
      window.sessionStorage.setItem('movement-intro-seen', 'true');
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    requestAnimationFrame(() => {
      const hero = document.getElementById('home');
      hero?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', '#home');
    });
  };

  return (
    <>
      {showIntro ? <CinematicIntro onComplete={handleIntroComplete} /> : null}
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <main>
          <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <motion.div
              initial={{ scale: 1.08, opacity: 0.92 }}
              animate={{ scale: [1.08, 1.02, 1], opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={heroImage} alt="A calm and inspiring landscape" fill priority className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.64)_42%,rgba(255,255,255,0.32)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_55%)]" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center sm:px-10 lg:px-12"
            >
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mb-6 rounded-full border border-border/80 bg-white/80 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-foreground-soft backdrop-blur-xl"
              >
                Reservation Hatao Andolan
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-4xl font-display text-5xl leading-[0.95] text-foreground sm:text-6xl lg:text-8xl"
              >
                Reservation Hatao Andolan
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-soft sm:text-xl"
              >
                Backed by citizens discarded by reservation politics, driven by merit.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.8 }}
                className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-foreground"
              >
                पाते हैं सम्मान तपोबल से भूतल पर शूर<br />जाति-जाति का शोर मचाते केवल कायर क्रूर.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                <Button asChild size="lg" className="group rounded-full border border-border/70 bg-foreground text-white shadow-[0_20px_60px_-24px_rgba(17,17,17,0.35)] hover:-translate-y-1 hover:bg-foreground/90">
                  <a href="#join">
                    Join the Movement <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="group rounded-full border border-border/70 bg-white/80 text-foreground shadow-[0_20px_60px_-24px_rgba(17,17,17,0.22)] backdrop-blur hover:-translate-y-1 hover:border-accent hover:text-accent">
                  <a href="#about">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="mt-12 rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-[0_20px_60px_-24px_rgba(17,17,17,0.22)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 text-sm text-foreground-soft">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>Equal opportunity, transparent policy, constitutional reform.</span>
                </div>
              </motion.div>
              <div className="mt-16 flex flex-col items-center text-sm text-foreground-soft">
                <span className="mb-2 uppercase tracking-[0.35em]">Scroll to explore</span>
                <ChevronDown className="h-5 w-5 animate-bounce" />
              </div>
            </motion.div>
          </section>

          <section id="about" className="relative isolate min-h-screen overflow-hidden scroll-mt-24">
            <Image src={flagImage} alt="National flag background" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.86)_35%,rgba(255,255,255,0.32)_100%)]" />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-24 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12"
            >
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">About the movement</p>
                <h2 className="mt-5 font-display text-4xl leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
                  About Reservation Hatao Andolan
                </h2>
                <p className="mt-6 text-lg leading-8 text-foreground-soft">
                  Reservation Hatao Andolan (RHA) is a citizen-led movement dedicated to creating awareness and encouraging public dialogue on reservation policy in India. Through peaceful, constitutional, and democratic means, the movement seeks to engage citizens, promote informed discussions, and share official research, campaigns, and updates from a single trusted platform.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {aboutCards.map((card, index) => (
                    <motion.article
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                      whileHover={{ y: -6, boxShadow: '0 22px 55px -24px rgba(17,17,17,0.24)' }}
                      className="rounded-[1.5rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl"
                    >
                      <h3 className="font-display text-2xl text-foreground">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-foreground-soft">{card.description}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[2.25rem] border border-white/70 bg-white/70 p-8 shadow-soft backdrop-blur"
              >
                <div className="rounded-[1.75rem] border border-border/70 bg-background-soft/80 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Our Mission</p>
                  <p className="mt-4 text-lg leading-8 text-foreground-soft">
                    To build awareness, encourage informed public participation, and communicate the movement's objectives through research, education, campaigns, and constitutional methods.
                  </p>
                </div>
                <div className="mt-6 rounded-[1.75rem] border border-border/70 bg-background-soft/80 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Our Vision</p>
                  <p className="mt-4 text-lg leading-8 text-foreground-soft">
                    To create a transparent, informed, and engaged society where public policy is discussed through facts, dialogue, and democratic participation.
                  </p>
                </div>
                <blockquote className="mt-6 rounded-[1.5rem] border border-accent/20 bg-accent/10 p-5 text-sm leading-7 text-foreground-soft">
                  “Awareness begins with information. Change begins with participation.”
                </blockquote>
              </motion.div>
            </motion.div>
          </section>

          <section id="why-reservation-removal" className="relative isolate min-h-screen overflow-hidden scroll-mt-24">
            <Image src={flagImage} alt="National flag background" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.78)_45%,rgba(255,255,255,0.3)_100%)]" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-12"
            >
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">Why Reservation Removal?</p>
                <h2 className="mt-4 font-display text-4xl leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
                  Why Reservation Removal?
                </h2>
                <p className="mt-4 text-lg font-semibold text-foreground-soft">The Movement's Perspective</p>
                <p className="mt-4 text-lg leading-8 text-foreground-soft">
                  Reservation Hatao Andolan believes that every citizen should have access to opportunities based on equal standards and transparent evaluation. The movement advocates for a review of the current reservation system through constitutional and democratic processes, arguing that public policy should evolve with changing social and economic realities.
                </p>
                <p className="mt-5 text-lg leading-8 text-foreground-soft">
                  According to the movement, reforms should encourage equal opportunity, strengthen educational and professional excellence, and promote social progress while ensuring support reaches those who need it most.
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {featureCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.article
                      key={card.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                      whileHover={{ y: -6, boxShadow: '0 20px 40px -24px rgba(17,17,17,0.22)' }}
                      className="rounded-[1.6rem] border border-border/70 bg-white/90 p-6 shadow-soft"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-6 font-display text-xl text-foreground">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-foreground-soft">{card.description}</p>
                    </motion.article>
                  );
                })}
              </div>
              <blockquote className="mt-10 max-w-3xl rounded-[1.5rem] border border-accent/20 bg-accent/10 px-6 py-5 text-lg leading-8 text-foreground-soft">
                “The movement advocates for policy reform through constitutional means, informed dialogue, and peaceful public participation.”
              </blockquote>
            </motion.div>
          </section>

          <section id="our-demands" className="relative isolate min-h-screen overflow-hidden scroll-mt-24">
            <Image src={flagImage} alt="National flag background" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.84)_42%,rgba(255,255,255,0.3)_100%)]" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-12"
            >
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">Our demands</p>
                <h2 className="mt-4 font-display text-4xl leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
                  Reservation should be given to only four categories.
                </h2>
                <p className="mt-5 text-lg leading-8 text-foreground-soft">
                  The movement's public demand is grounded in equal opportunity, constitutional clarity, and transparent policy reform.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {demandCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.article
                      key={card.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                      whileHover={{ y: -6, boxShadow: '0 22px 50px -24px rgba(17,17,17,0.24)' }}
                      className="rounded-[1.6rem] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-6 font-display text-2xl text-foreground">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-foreground-soft">{card.description}</p>
                    </motion.article>
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 rounded-[1.75rem] border border-accent/20 bg-accent/10 px-6 py-5 text-center text-lg font-semibold text-foreground shadow-soft"
              >
                Equal Opportunity. Transparent Policy. Constitutional Reform.
              </motion.div>
            </motion.div>
          </section>

          <section id="current-campaign" className="relative isolate min-h-screen overflow-hidden scroll-mt-24">
            <Image src={flagImage} alt="National flag background" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.82)_45%,rgba(255,255,255,0.32)_100%)]" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-12"
            >
              <div className="max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-soft backdrop-blur sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">Current Campaign</p>
                <h2 className="mt-4 font-display text-4xl leading-[1.04] text-foreground sm:text-5xl">
                  Digital Public Awareness Initiative
                </h2>
                <p className="mt-4 text-lg leading-8 text-foreground-soft">
                  Status: 🟢 Active
                </p>
                <p className="mt-5 text-lg leading-8 text-foreground-soft">
                  The movement is currently conducting a nationwide digital awareness initiative to encourage citizens to participate in public discussion on reservation policy through peaceful and lawful civic engagement.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-border/70 bg-background-soft/80 p-5">
                    <h3 className="font-display text-2xl text-foreground">Campaign Objective</h3>
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground-soft">
                      <li>• Increase public awareness about the movement's demands.</li>
                      <li>• Encourage informed discussion on reservation policy.</li>
                      <li>• Promote peaceful and democratic participation through digital platforms.</li>
                    </ul>
                  </div>
                  <div className="rounded-[1.4rem] border border-border/70 bg-background-soft/80 p-5">
                    <h3 className="font-display text-2xl text-foreground">How it Works</h3>
                    <p className="mt-4 text-sm leading-7 text-foreground-soft">
                      Supporters participate by engaging with publicly available posts from government institutions and elected representatives, respectfully sharing their views, discussing the movement's objectives, and encouraging constructive public dialogue.
                    </p>
                  </div>
                </div>
                <div className="mt-8 rounded-[1.5rem] border border-accent/20 bg-accent/10 px-6 py-5 text-lg leading-8 text-foreground-soft">
                  Stay Updated — Follow the movement's official social media channels to learn about current campaigns, upcoming initiatives, and new announcements.
                </div>
              </div>
            </motion.div>
          </section>

          <section id="join" className="relative isolate min-h-screen overflow-hidden scroll-mt-24">
            <Image src={flagImage} alt="National flag background" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_42%,rgba(255,255,255,0.3)_100%)]" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-12"
            >
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">Join the movement</p>
                <h2 className="mt-4 font-display text-4xl leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
                  The next chapter begins with people who are willing to show up.
                </h2>
                <p className="mt-6 text-lg leading-8 text-foreground-soft">
                  Whether through service, generosity, or visibility, the movement grows strongest when more people choose to stand beside it.
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {joinCards.map((card, index) => (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                    whileHover={{ y: -6, boxShadow: '0 26px 60px -24px rgba(17,17,17,0.28)' }}
                    className="rounded-[1.8rem] border border-white/70 bg-white/80 p-7 shadow-soft backdrop-blur"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl text-foreground">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground-soft">{card.description}</p>
                    <Button variant="secondary" className="mt-6" disabled>
                      {card.buttonLabel}
                    </Button>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="ai" className="relative isolate min-h-screen overflow-hidden scroll-mt-24">
            <Image src={flagImage} alt="National flag background" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.82)_40%,rgba(255,255,255,0.3)_100%)]" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-12"
            >
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">AI Assistant</p>
                <h2 className="mt-4 font-display text-4xl leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
                  Coming Soon
                </h2>
                <p className="mt-6 text-lg leading-8 text-foreground-soft">
                  The AI assistant experience is being prepared as a calm, informative companion for visitors exploring the movement and its public policy demands.
                </p>
              </div>
              <div className="mt-10 mx-auto w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-soft backdrop-blur">
                <div className="flex items-center gap-3 text-accent">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.28em]">Upcoming Features</span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-border/70 bg-background-soft/80 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground-soft">Movement guidance</p>
                    <p className="mt-3 text-sm leading-7 text-foreground-soft">Quick answers about the mission, demands, and campaign updates.</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-border/70 bg-background-soft/80 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground-soft">Public information</p>
                    <p className="mt-3 text-sm leading-7 text-foreground-soft">A clear and respectful way to explore the movement's policy and civic messaging.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="border-t border-border/80 bg-white/90">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:justify-between lg:px-12">
              <div className="max-w-md">
                <p className="text-lg font-semibold tracking-[0.26em] text-foreground">Reservation Htao Andolan</p>
                <p className="mt-4 text-sm leading-7 text-foreground-soft">
                  A calm, modern movement for fair and equal opportunity for all.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">Navigate</p>
                  <ul className="mt-4 space-y-3 text-sm text-foreground-soft">
                    <li><a href="#about" className="transition-colors duration-300 hover:text-foreground">About</a></li>
                    <li><a href="#why-reservation-removal" className="transition-colors duration-300 hover:text-foreground">Why Reservation Removal</a></li>
                    <li><a href="#our-demands" className="transition-colors duration-300 hover:text-foreground">Our Demands</a></li>
                    <li><a href="#join" className="transition-colors duration-300 hover:text-foreground">Join</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">Social</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="https://www.instagram.com/reservationhataomovement/?hl=en" target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-2 text-sm text-foreground-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                      Instagram
                    </a>
                    <a href="https://x.com/RHAreforms" target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-2 text-sm text-foreground-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                      X
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-border/80 px-6 py-6 text-center text-sm text-foreground-soft sm:px-10 lg:px-12">
              © 2026 Reservation Htao Andolan. Built with calm intention.
            </div>
          </footer>
        </main>
        <a href="#ai" className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full border border-border/70 bg-foreground px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_-20px_rgba(17,17,17,0.45)] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground/90 sm:bottom-6 sm:right-6">
          <Sparkles className="h-4 w-4" />
          AI Assistant
        </a>
      </div>
    </>
  );
}
