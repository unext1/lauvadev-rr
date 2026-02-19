import { GithubLogoIcon, LinkedinLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CursorGlow } from '~/components/cursor-glow';
import { ThemeToggle } from '~/components/theme-switcher';
import { buttonVariants } from '~/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { cn } from '~/utils';
import type { Route } from './+types';

export const meta: Route.MetaFunction = () => {
  const title = 'Laurynas Valiulis | Portfolio';
  const description =
    'Full-stack developer turning complex ideas into clear, high-performing products. Based in Sweden. React, TypeScript & Node.js.';
  const url = 'https://lauva.dev';

  return [
    { title },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    { property: 'og:url', content: url },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      tagName: 'link',
      rel: 'canonical',
      href: url,
    },
    { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charSet: 'utf-8' },
    { name: 'author', content: 'Laurynas Valiulis' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Laurynas' },
    { property: 'og:image', content: 'https://lauva.dev/meta.webp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@lauvadev' },
    { name: 'twitter:creator', content: '@lauvadev' },
    { name: 'twitter:image', content: 'https://lauva.dev/meta.webp' },
    { tagName: 'link', rel: 'icon', href: '/favicon.ico' },
  ];
};

const SectionLabel = ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
  <motion.span
    variants={fadeUp}
    className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
    {...props}
  >
    {children}
  </motion.span>
);

const NAV_ITEMS = ['work', 'about', 'experience', 'stack', 'testimonials', 'contact'] as const;
const projects = [
  {
    number: '01',
    title: 'Neuralfinity',
    subtitle:
      'Built websites and internal tools for Neuralfinity, an AI platform startup. Created modern dashboards and systems that made complex AI operations easy to use. Managed multiple projects as a solo developer and contributed across the full stack from product flows to backend integrations.',
    problem: '',
    outcome: '',
    tech: 'React Router v7, TypeScript, Tailwind CSS, Node.js, Docker, Better-Auth, Stripe, PostHog',
    year: '2024-2025',
    image: '/neuralfinity.webp',
    type: 'contract work',
    testimonial: true,
  },
  {
    number: '02',
    title: 'Whop CRM',
    subtitle:
      'A fast, clean CRM for Whop creators and agencies that keeps leads, deals, clients, and tasks organized without the clutter. Used by paying users.',
    problem: 'Most CRMs try to do everything, which slows teams down when they just need the essentials.',
    outcome:
      'Shipped a focused CRM with dashboard analytics, a pipeline view, forms(to catch leads) tasks + notes, and a clear activity timeline so teams can stay on top of relationships and close deals faster.',
    tech: 'React Router v7, Typescript, Whop API, Shadcn, Tailwind CSS, Turso DB, Drizzle ORM',
    year: '2025',
    image: '/crm.webp',
    type: 'personal Project',
  },
  {
    number: '03',
    title: 'Emilis Jokūbas',
    subtitle: 'Website for Lithuanian comedian and content creator Emilis Jokūbas.',
    problem: 'Needed one place for tour dates, key links, and career info that reads well on mobile.',
    outcome: 'Built a simple, fast site that keeps the focus on shows and content.',
    tech: 'React Router v7, TypeScript, Tailwind CSS, Cloudflare Workers',
    year: '2025',
    image: '/emilis.webp',
    type: 'client work',
    testimonial: true,
  },
  {
    number: '04',
    title: 'Dashboard Design',
    subtitle: 'A simple dashboard UI concept.',
    problem: '',
    outcome: '',
    tech: 'React Router v7, Tailwind CSS, Shadcn',
    year: '2025',
    image: '/design.webp',
    type: 'design',
  },
  {
    number: '05',
    title: 'Field Service App (SaaS)',
    subtitle: 'SaaS app for planning, assigning, and tracking field service work.',
    problem: 'Teams needed a simpler way to manage tasks, people, and progress in the field.',
    outcome: 'Built task creation and assignment flows with a kanban board using optimistic UI.',
    tech: 'Remix.run, TypeScript, Node.js, TursoDB',
    year: '2024',
    image: '/fields.webp',
    type: 'Project',
  },
  {
    number: '06',
    title: 'Home By Aurelija',
    subtitle:
      'A portfolio website for an interior designer showcasing their work, services, and design philosophy, with a clean layout.',
    problem: 'Needed a clear place to present projects, services, and approach without distracting UI.',
    outcome: 'Delivered a modern site that highlights the work and makes it easy to understand the services.',
    tech: 'Remix.run, TypeScript, Tailwind CSS, Contentful CMS, Resend',
    year: '2023',
    image: '/aurelija.webp',
    type: 'client work',
  },
];

const experience = [
  {
    period: 'Jun 2024 — Jun 2025',
    company: 'Neuralfinity',
    role: 'Full-Stack Developer',
    description:
      'Built internal tools and dashboards for an AI platform. Implemented full-stack features with server-side routing, authentication, analytics, and third-party integrations. Owned features end to end.',
  },
  {
    period: '2020 — Present',
    company: 'Freelance',
    role: 'Full-Stack Developer',
    description:
      'Delivered custom web systems for clients with a focus on performance, clean interfaces, and codebases that are easy to maintain long after handoff.',
  },
  {
    period: 'Jan — May 2024',
    company: 'Erlin Business Company',
    role: 'Full-Stack Intern',
    description:
      'Led development of a SaaS application from initial concept to production. Owned frontend, backend, UI/UX, API design, and database architecture under tight deadlines.',
  },
  {
    period: 'Apr — May 2023',
    company: 'Brainforest',
    role: 'Full-Stack Intern',
    description:
      'Contributed to an AI-based image alt-text generation tool. Built frontend and backend features, integrated AI services, and worked in an agile team iterating quickly.',
  },
];

const education = [
  {
    period: '2022 — 2024',
    school: 'Borås Yrkeshögskola',
    focus: 'Frontend Development (React)',
    note: 'Focused on modern frontend development using React and TypeScript. Built multiple web apps with emphasis on component architecture, accessibility, and maintainable code. Gained experience collaborating in team-based projects and working from real-world requirements.',
  },
  {
    period: '2019 — 2022',
    school: 'LBS Helsingborg',
    focus: 'Game Development',
    note: 'Built a strong foundation in programming, problem solving, and system thinking. Developed several small games using Unity, focusing on game logic and interactive systems. Independently explored modern web technologies, which led to a transition into web and full-stack development.',
  },
];

const stack = {
  frontend: ['React', 'Next.js', 'React Router v7', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
  backend: ['Node.js', 'Drizzle ORM', 'Better-Auth', 'Stripe', 'PostHog'],
  infrastructure: ['PostgreSQL', 'SQLite', 'Cloudflare Workers', 'Docker'],
  tools: ['Figma', 'Git', 'Bash'],
};

const socialLinks = [
  { short: 'Gh', label: 'GitHub', href: 'https://github.com/unext1', icon: GithubLogoIcon },
  { short: 'Li', label: 'LinkedIn', href: 'https://www.linkedin.com/in/laurynas-valiulis/', icon: LinkedinLogoIcon },
  { short: 'Yt', label: 'YouTube', href: 'https://www.youtube.com/@Lauvadev', icon: YoutubeLogoIcon },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1920, h: 1080 });

  const mx = useMotionValue(dims.w / 2);
  const my = useMotionValue(dims.h / 2);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });
  const rotY = useTransform(smx, [0, dims.w], [-2, 2]);
  const rotX = useTransform(smy, [0, dims.h], [15, -15]);

  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const footerScale = useTransform(footerProgress, [0, 0.6, 1], [0.88, 1, 1]);
  const footerY = useTransform(footerProgress, [0, 0.6, 1], [60, 0, 0]);
  const footerOpacity = useTransform(footerProgress, [0, 0.3, 1], [0.3, 1, 1]);
  const footerRotX = useTransform(footerProgress, [0, 1, 1], [4, 0, 0]);

  const [expandedProject, setExpandedProject] = useState<string | null>('01');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDims({ w: window.innerWidth, h: window.innerHeight });
      mx.set(window.innerWidth / 2);
      my.set(window.innerHeight / 2);
    }
  }, [mx, my]);

  useEffect(() => {
    const sectionIds: string[] = ['hero', ...NAV_ITEMS];

    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const offset = window.innerHeight * 0.3;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - offset <= window.scrollY) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (mobileMenuRef.current?.contains(target)) return;
      setIsMobileMenuOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    },
    [mx, my],
  );
  const onLeave = useCallback(() => {
    mx.set(dims.w / 2);
    my.set(dims.h / 2);
  }, [mx, my, dims]);

  return (
    <div className="relative bg-background min-h-screen flex flex-col">
      <CursorGlow />

      <motion.header
        className="fixed left-0 right-0 z-50  pt-8 pb-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-background backdrop-blur-sm"
          initial={false}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          aria-label="glow effect on header when scrolled"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-6 ">
          <div className="grid grid-cols-3 items-center gap-2 md:gap-4">
            {/* Left section - Logo */}
            <div className="flex justify-start">
              <motion.div
                className={'h-10 py-2 px-4 flex items-center'}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <a href="#hero" className="group">
                  <motion.span
                    className={cn(
                      'text-lg font-medium tracking-tight transition-colors',
                      activeSection === 'hero' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    Laurynas
                  </motion.span>
                </a>
              </motion.div>
            </div>

            {/* Middle section - Navigation */}
            <div className="flex justify-center">
              <div className={'h-10 hidden md:flex items-center gap-8 py-2 px-8'}>
                {NAV_ITEMS.map((section) => (
                  <motion.div
                    key={section}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <a
                      href={`#${section}`}
                      className={cn(
                        'text-sm capitalize tracking-wide transition-colors relative group',
                        activeSection === section ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {section}
                      <span
                        className={cn(
                          'absolute -bottom-1 left-0 h-px bg-muted-foreground transition-all duration-300',
                          activeSection === section ? 'w-full' : 'w-0 group-hover:w-full',
                        )}
                      />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right section - Email & Theme Toggle */}
            <div className="flex justify-end items-center gap-2 md:gap-4">
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    className={'h-10 hidden lg:flex items-center gap-3 py-2 px-5'}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <a
                      href="mailto:info@lauva.dev"
                      className="inline-flex min-h-11 items-center text-sm text-foreground hover:text-foreground transition-colors"
                    >
                      info@lauva.dev
                    </a>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">I don't bite 👋</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    className={'h-11 w-11 flex items-center justify-center'}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <ThemeToggle />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">Switch vibes</TooltipContent>
              </Tooltip>

              <div ref={mobileMenuRef} className="md:hidden relative">
                <motion.button
                  className={'h-9 w-9 flex items-center justify-center'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-navigation"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                  </motion.svg>
                </motion.button>

                {/* Mobile menu */}
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10, x: 0 }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10, x: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      id="mobile-navigation"
                      className="md:hidden absolute right-0 mt-2 origin-top bg-card/80 backdrop-blur-sm  border border-muted shadow-lg min-w-50 z-50 overflow-hidden"
                      style={{ transformOrigin: 'top right' }}
                    >
                      <nav className="flex flex-col p-4 gap-4">
                        {NAV_ITEMS.map((section, index) => (
                          <motion.div
                            key={section}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, delay: 0.05 * (index + 1) }}
                          >
                            <a
                              href={`#${section}`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                              }}
                              className={cn(
                                'text-sm capitalize tracking-wide transition-colors block py-1 relative w-fit',
                                activeSection === section
                                  ? 'text-foreground'
                                  : 'text-muted-foreground hover:text-foreground',
                              )}
                            >
                              {section}
                            </a>
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, delay: 0.25 }}
                          className="mt-2 pt-2 border-t border-border/10"
                        >
                          <a
                            href="mailto:info@lauva.dev"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1.5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            info@lauva.dev
                          </a>
                        </motion.div>
                      </nav>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <div
        id="hero"
        className="relative m-4 flex min-h-[calc(100svh-2rem)] flex-col overflow-hidden border bg-linear-to-b from-card to-background"
      >
        <div
          ref={heroRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative flex pt-10 min-h-full flex-1 flex-col overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(255,255,255,0.04),transparent_70%)]" />
          </div>
          <motion.div
            className="absolute -bottom-10 -rotate-10 left-0 right-0 z-0 pointer-events-none mix-blend-screen"
            style={{ perspective: '1200px' }}
            initial={{ opacity: 0, y: 80, scale: 0.97 }}
            animate={{ opacity: 0.14, y: 0, scale: 1.01 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <motion.img
              src="/fingers.png"
              className="w-full h-200 scale-120 object-cover"
              alt=""
              draggable={false}
              style={{
                transformStyle: 'preserve-3d',
                rotateX: rotX,
                rotateY: rotY,
              }}
              animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10 md:px-12">
            <div className="max-w-5xl w-full">
              <motion.div initial="hidden" animate="show" variants={stagger}>
                <motion.p
                  variants={fadeUp}
                  custom={0}
                  className="mb-6 font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Laurynas Valiulis
                </motion.p>
                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="font-display text-2xl md:text-5xl lg:text-7xl xl:text-[90px] font-bold leading-[0.95] tracking-tight"
                >
                  I turn complex ideas into
                  <br />
                  clear, <span className="italic font-bold text-muted-foreground"> high performing products.</span>
                </motion.h1>

                <motion.div variants={fadeUp} custom={2} className="mt-10 flex flex-col gap-1.5 lg:items-end">
                  <p className="text-xs text-foreground sm:text-base md:text-lg">
                    Full-stack developer. Based in Sweden.
                  </p>
                  <p className="text-xs text-muted-foreground sm:text-base md:text-lg">React, TypeScript & Node.js.</p>
                </motion.div>
                <div className="flex lg:items-end w-full flex-col">
                  <motion.div variants={fadeUp} custom={3} className="mt-10 flex items-center gap-6">
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          href="mailto:info@lauva.dev"
                          className="order-2 inline-flex min-h-11 items-center px-2 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground lg:order-1"
                        >
                          info@lauva.dev
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Say hi, I'm friendly</TooltipContent>
                    </Tooltip>
                    <a
                      href="#work"
                      className={buttonVariants({
                        variant: 'default',
                        size: 'lg',
                        className:
                          'order-1 md:h-11 border-border px-6 font-mono text-xs uppercase tracking-wide hover:border-foreground lg:order-2',
                      })}
                    >
                      View work ↓
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative z-20 px-6 md:px-12"
          >
            <div className="max-w-5xl mx-auto w-full pb-10 flex items-end lg:justify-end">
              <div className="flex items-center">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Tooltip key={s.label}>
                      <TooltipTrigger>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                          aria-label={s.label}
                        >
                          <Icon size={20} weight="regular" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>{s.label}</TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <section id="work">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-12 py-20 md:py-28">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>01 · Selected Work</SectionLabel>
                <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold mt-4">
                  Things I've built.
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} custom={2} className="max-w-xs text-sm text-muted-foreground md:text-right">
                Click any row to see the story.
              </motion.p>
            </div>
            <div>
              {projects.map((p, i) => {
                const isOpen = expandedProject === p.number;
                const techItems = p.tech
                  .split(',')
                  .map((item) => item.trim())
                  .filter(Boolean);
                return (
                  <motion.div key={p.number} variants={fadeUp} custom={i + 3}>
                    <button
                      type="button"
                      onClick={() => setExpandedProject(isOpen ? null : p.number)}
                      className={`group w-full grid cursor-pointer grid-cols-1 items-center gap-4 border-b border-border px-6 py-6 transition-colors duration-300 md:grid-cols-[20px_1.4fr_1fr_80px] md:gap-8  text-left ${isOpen ? 'bg-muted/30' : 'hover:bg-muted/30'}`}
                    >
                      <span className="font-mono text-xs text-muted-foreground">{p.number}</span>
                      <div>
                        <h3 className="font-display text-lg md:text-xl font-semibold group-hover:translate-x-1 transition-transform duration-300">
                          {p.title}
                        </h3>
                        <p className="mt-1 font-mono line-clamp-1 text-sm text-muted-foreground capitalize">{p.type}</p>
                      </div>
                      <div className="scrollbar-hide hidden overflow-x-auto md:block">
                        <div className="flex w-full min-w-max items-center gap-2 whitespace-nowrap">
                          {techItems.map((item) => (
                            <span
                              key={`${p.number}-${item}`}
                              className="border border-border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="hidden text-right font-mono text-xs text-muted-foreground md:block">
                        {p.year}
                      </span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 border-b border-border bg-muted/30 px-6 py-8 md:grid-cols-2 md:pl-19">
                        <div className="space-y-4">
                          <p className="text-base leading-relaxed whitespace-pre-line text-foreground">{p.subtitle}</p>

                          {p.problem ? (
                            <div>
                              <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                                Problem
                              </span>
                              <p className="mt-1 text-sm text-muted-foreground">{p.problem}</p>
                            </div>
                          ) : null}
                          {p.outcome ? (
                            <div>
                              <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                                Outcome
                              </span>
                              <p className="mt-1 text-sm text-muted-foreground">{p.outcome}</p>
                            </div>
                          ) : null}
                          {'testimonial' in p && p.testimonial ? (
                            <a
                              href="#testimonials"
                              className={buttonVariants({
                                variant: 'default',
                                size: 'sm',
                                className:
                                  'border-border font-mono text-xs uppercase tracking-wide hover:border-foreground order-4',
                              })}
                            >
                              View testimonial →
                            </a>
                          ) : null}
                        </div>
                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                              Stack
                            </span>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {techItems.map((item) => (
                                <span
                                  key={`${p.number}-expanded-${item}`}
                                  className="border border-border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mt-6">
                            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                              Preview
                            </span>
                            <Dialog>
                              <DialogTrigger className="group mt-3 block w-full border border-border bg-card/70 hover:bg-card transition-colors duration-200 cursor-pointer">
                                <div className="relative aspect-video overflow-hidden">
                                  <img
                                    src={p.image}
                                    alt={`${p.title} preview`}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-200" />
                                  <div className="absolute bottom-3 right-3 rounded-none border border-border bg-background/80 px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                                    Open
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent
                                showCloseButton={false}
                                className="w-full max-w-7xl border border-border bg-background p-4 shadow-2xl"
                              >
                                <div className="flex items-center justify-between">
                                  <DialogTitle className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                                    {p.title} — Preview
                                  </DialogTitle>
                                  <DialogClose className="font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
                                    Close
                                  </DialogClose>
                                </div>
                                <div className=" border border-border bg-card ">
                                  <img
                                    src={p.image}
                                    alt={`${p.title} full preview`}
                                    className="h-full w-full object-contain"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={fadeUp} custom={8} className="mt-10">
              <a
                href="mailto:info@lauva.dev"
                className="font-mono text-xs tracking-wide text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                Want to see more? Let's talk →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative py-20 md:py-28 bg-card m-4 border">
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
            <SectionLabel>02 · About</SectionLabel>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-8 max-w-4xl border-l-2 border-border pl-6 font-display text-4xl font-bold tracking-tight md:pl-8 md:text-6xl "
            >
              I build products that
              <br />
              <span className="text-muted-foreground italic">feel simple to use.</span>
            </motion.h2>

            <div className="mt-14 space-y-8">
              <motion.p
                variants={fadeUp}
                custom={2}
                className="max-w-3xl text-base leading-relaxed text-muted-foreground"
              >
                I'm a full-stack developer with a strong frontend focus and a product mindset. I've worked in an early
                stage startup and on freelance projects, taking features from idea to production across both frontend
                and backend.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="ml-auto w-full max-w-xl space-y-6 text-right">
                <p className="text-base leading-relaxed text-muted-foreground">
                  I enjoy moving fast, keeping things simple, and making interfaces that feel good to use. In my free
                  time I build side projects, design dashboard UIs for fun, and sometimes make YouTube videos to share
                  what I'm learning.
                </p>

                <div className="ml-auto border-t border-border pt-4">
                  <div className="flex items-center justify-end">
                    {socialLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Tooltip key={s.label}>
                          <TooltipTrigger>
                            <a
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                              aria-label={s.label}
                            >
                              <Icon size={20} weight="regular" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>{s.label}</TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <SectionLabel>03 · Experience</SectionLabel>
                <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold mt-4">
                  Where I've shipped.
                </motion.h2>
              </div>
              <motion.span
                variants={fadeUp}
                custom={1.5}
                className="font-mono text-xs uppercase tracking-wide text-muted-foreground"
              >
                {new Date().getFullYear() - 2020}+ years · 4 companies
              </motion.span>
            </div>

            <div>
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  variants={fadeUp}
                  custom={i + 2}
                  className="group grid grid-cols-1 gap-3 border-b border-border px-6 py-8 transition-colors duration-300 md:grid-cols-[180px_180px_1fr]"
                >
                  <div>
                    <h3 className="font-display text-base font-semibold">{exp.company}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{exp.role}</p>
                  </div>
                  <span className="self-start pt-1 font-mono text-xs tracking-wide text-muted-foreground">
                    {exp.period}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <motion.div variants={fadeUp} custom={7} className="mt-10">
              <span className="mb-6 block font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Education
              </span>
              {education.map((ed) => (
                <div
                  key={ed.school}
                  className="group grid grid-cols-1 gap-3 border-b border-border px-6 py-8 transition-colors duration-300 md:grid-cols-[180px_180px_1fr]"
                >
                  <div>
                    <h3 className="font-display text-base font-semibold">{ed.school}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{ed.focus}</p>
                  </div>
                  <span className="self-start pt-1 font-mono text-xs tracking-wide text-muted-foreground">
                    {ed.period}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{ed.note}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="stack" className="py-20 md:py-28 bg-card m-4 border">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <SectionLabel>04 · Stack</SectionLabel>
                <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold mt-4">
                  What I work with.
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} custom={1.5} className="max-w-sm text-sm text-muted-foreground md:text-right">
                Tools I reach for daily. Always growing.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} custom={1.8} className="h-px bg-border mb-12" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 md:gap-20">
              {Object.entries(stack).map(([category, items], ci) => (
                <motion.div key={category} variants={fadeUp} custom={ci + 2}>
                  <span className="mb-4 block font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    {category}
                  </span>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="cursor-default font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="testimonials" className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <SectionLabel>05 · Kind Words</SectionLabel>
                <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold mt-4">
                  What people say.
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} custom={1.5} className="max-w-xs text-sm text-muted-foreground md:text-right">
                From clients & colleagues I've worked with.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px ">
              {/* Video testimonial */}
              <motion.div variants={fadeUp} custom={2} className="flex flex-col justify-between md:pr-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-muted-foreground">01</span>
                    <div className="h-px flex-1 bg-border" />
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Video</span>
                  </div>
                  <div className="aspect-video w-full overflow-hidden border border-border bg-background">
                    {/** biome-ignore lint/a11y/useMediaCaption: I have explenation in p tag */}
                    <video className="h-full w-full object-cover" controls preload="none" poster="/">
                      <source src="/testimonial.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    I worked with Lithuanian comedian Emilis Jokūbas with over 200k+ following cross platform. In this
                    video, he shouts me out for web development and design work, and reflects positively on the
                    collaboration with me.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <span className="block text-sm font-semibold text-foreground">Emilis Jokūbas</span>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      Content Creator · 200k+ followers
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Written testimonial */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-col justify-between mt-8 md:mt-0  md:pl-8">
                <div className="space-y-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-muted-foreground">02</span>
                    <div className="h-px flex-1 bg-border" />
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Written</span>
                  </div>

                  <div className="relative flex-1 justify-center items-center flex">
                    <blockquote className="relative flex justify-center items-center ">
                      <p className="text-base  leading-relaxed text-muted-foreground italic">
                        " Laurynas is an exceptional full-stack developer who independently built and maintained several
                        applications to a high standard. He proactively drove meaningful tech-stack improvements, that
                        lead to real world benefits and business value. Highly autonomous yet very much a team player,
                        he took ownership eagerly and consistently championed solid engineering principles while
                        carefully managing the full application lifecycle. "
                      </p>
                    </blockquote>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-6 mt-6 md:mt-0">
                  <div>
                    <span className="block text-sm font-semibold text-foreground">Jannik Meissner</span>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      Neuralfinity · Founder
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-4 mt-10">
        <motion.div
          ref={footerRef}
          style={{
            scale: footerScale,
            y: footerY,
            opacity: footerOpacity,
            rotateX: footerRotX,
            transformPerspective: 500,
          }}
          className="origin-bottom bg-card border border-border overflow-hidden will-change-transform"
        >
          <div className="relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
            </div>

            <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-24 md:px-12 md:pb-24 md:pt-32">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="font-display text-3xl md:text-6xl font-bold leading-[1.1] text-center"
                >
                  Ready to <span className="font-mono font-light text-muted-foreground">build a story</span>
                  <br />
                  that hits different?
                </motion.h2>

                <motion.div variants={fadeUp} custom={2} className="mt-8 flex justify-center">
                  <a
                    href="mailto:info@lauva.dev"
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'lg',
                      className: 'group h-11 rounded-full px-10 font-mono text-xs uppercase tracking-wide',
                    })}
                  >
                    Let's connect
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            <div className="border-t border-border">
              <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 pt-6 md:flex-row md:px-12">
                <div className="flex items-center gap-6 flex-wrap text-center justify-center">
                  {NAV_ITEMS.map((s) => (
                    <a
                      key={s}
                      href={`#${s}`}
                      className="inline-flex min-h-11 items-center px-1 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s}
                    </a>
                  ))}
                </div>
                <div className="flex items-center">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Tooltip key={s.label}>
                        <TooltipTrigger>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                            aria-label={s.label}
                          >
                            <Icon size={20} weight="regular" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>{s.label}</TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* giant name + copyright */}
            <div className="relative overflow-hidden">
              <div className="w-full text-center font-display text-[clamp(4rem,20vw,18rem)] font-bold tracking-tighter leading-none text-muted-foreground/10 whitespace-nowrap select-none">
                LAURYNAS
              </div>
              <div className="mb-4 flex justify-center">
                <span className="font-mono text-xs uppercase flex items-center tracking-wide text-muted-foreground">
                  © {new Date().getFullYear()} Laurynas all rights reserved.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
