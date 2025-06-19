import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Layers, Linkedin, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { DotPattern } from '~/components/dot-bg';
import { ThemeToggle } from '~/components/theme-switcher';
import { Button } from '~/components/ui/button';
import { cn } from '~/utils';
const Technology = ({ name }: { name: string }) => {
  return (
    <div className="hover:bg-muted/20 dark:hover:bg-muted/10 rounded-lg border border-border/10 p-3 transition-colors">
      <h3 className="text-sm font-medium">{name}</h3>
    </div>
  );
};
const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();

  useEffect(() => {
    const sections = ['hero', 'work', 'about', 'skills', 'journey', 'contact'];

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Update URL without scroll
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Consider element in view when it's in the middle
        threshold: 0
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    // Initial active section from hash
    const hash = location.hash.slice(1);
    if (hash && sections.includes(hash)) {
      setActiveSection(hash);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [location]);

  return activeSection;
};

// Navigation items
const navItems = [
  { name: 'work', href: '#work' },
  { name: 'about', href: '#about' },
  { name: 'journey', href: '#journey' },
  { name: 'contact', href: '#contact' }
];

export function meta() {
  return [
    { title: 'Laurynas Valiulis - Portfolio' },
    { name: 'description', content: 'Portfolio of Laurynas Valiulis' }
  ];
}

const Index = () => {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);

  const activeSection = useActiveSection();

  // Add smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative bg-background min-h-screen selection:bg-[#2563EB]/10 selection:text-[#2563EB]">
      {/* Header */}
      <motion.header
        className="fixed top-4 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 xl:px-6">
          <div className="grid grid-cols-3 items-center">
            {/* Left section - Logo */}
            <div className="flex justify-start">
              <motion.div
                className={`h-10 py-2 px-4 rounded-full backdrop-blur-md border border-muted flex items-center`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link to="/" className="group" onClick={(e) => handleNavClick(e, '#hero')}>
                  <motion.span
                    className="text-lg font-medium text-foreground tracking-tight group-hover:text-[#2563EB] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    laurynas<span className="text-[#2563EB]">.</span>
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Middle section - Navigation */}
            <div className="flex justify-center">
              <motion.div
                className={`h-10 hidden md:flex items-center gap-8 py-2 px-8 rounded-full backdrop-blur-md border border-muted`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {/* Logo/Icon in the middle */}
                <motion.button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-5 h-5 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded-md transition-colors duration-300 border-2 border-muted',
                      activeSection === 'hero' ? 'bg-blue-500/70' : 'bg-transparent'
                    )}
                  />
                </motion.button>

                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'text-sm transition-colors relative group',
                      activeSection === item.name.toLowerCase()
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-px bg-[#2563EB] transition-all duration-300',
                        activeSection === item.name.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Right section - Email & Theme Toggle */}
            <div className="flex justify-end items-center gap-4">
              <motion.div
                className={`h-10 hidden lg:flex items-center gap-3 py-2 px-5 rounded-full backdrop-blur-md border border-muted`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <a
                  href="mailto:info@lauva.dev"
                  className="text-sm text-foreground hover:text-blue-500 transition-colors"
                >
                  info@lauva.dev
                </a>
              </motion.div>

              <motion.div
                className={`h-10 flex items-center justify-center p-2 rounded-full backdrop-blur-md border border-muted`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ThemeToggle />
              </motion.div>

              <div className="md:hidden relative">
                <motion.div
                  className={`h-10 flex items-center justify-center p-2 rounded-full backdrop-blur-md border border-muted`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      whileTap={{ scale: 0.9 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                      />
                    </motion.svg>
                  </Button>
                </motion.div>

                {/* Mobile menu */}
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10, x: 0 }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10, x: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="md:hidden absolute right-0 origin-top bg-background/95 backdrop-blur-sm rounded-2xl border border-muted shadow-lg min-w-[200px] z-50 overflow-hidden"
                      style={{ transformOrigin: 'top right' }}
                    >
                      <nav className="flex flex-col py-4 px-6 gap-4">
                        {navItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, delay: 0.05 * (index + 1) }}
                          >
                            <Link
                              to={item.href}
                              onClick={(e) => {
                                handleNavClick(e, item.href);
                                setIsMobileMenuOpen(false);
                              }}
                              className={cn(
                                'text-sm transition-colors block py-1.5 relative w-fit',
                                activeSection === item.name.toLowerCase()
                                  ? 'text-blue-500'
                                  : 'text-foreground hover:text-blue-500'
                              )}
                            >
                              {item.name}
                              {activeSection === item.name.toLowerCase() && (
                                <div className="h-px w-full bg-blue-500 mt-1" />
                              )}
                            </Link>
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, delay: 0.25 }}
                          className="mt-2 pt-2 border-t border-border/10"
                        >
                          <span className="text-sm text-muted-foreground block py-1.5">info@lauva.dev</span>
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
      <section id="hero" className="relative h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute inset-0"
        >
          <DotPattern
            width={24}
            height={24}
            className={cn(
              'absolute inset-0 opacity-50 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]'
            )}
          />
        </motion.div>

        <div className="max-w-screen-xl w-full mx-auto px-6 md:px-12 lg:px-16 xl:px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center mb-6 text-sm text-blue-500/70 tracking-wide border border-blue-500/10 rounded-full py-1 px-3"
            >
              <span className="w-1 h-1 rounded-full bg-blue-500/80 mr-2"></span>
              <motion.span
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              >
                available for projects
              </motion.span>
            </motion.span> */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base w-fit mx-auto rounded-full bg-background mb-4 text-muted-foreground p-1 px-4 border"
            >
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>Based in Sweden</span>
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl font-normal tracking-tight text-foreground mb-6"
            >
              Hi, i'm{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Laurynas</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed text-center mx-auto"
            >
              Full stack dev crafting sleek, scalable sites with code & taste.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-6 items-center justify-center"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative overflow-hidden">
                <a
                  href="mailto:info@lauva.dev"
                  className="relative z-10 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#2563EB]/80 to-[#1E40AF]/80 text-white font-medium flex items-center gap-2 shadow-lg shadow-[#2563EB]/20 hover:shadow-[#2563EB]/30 transition-shadow duration-300"
                >
                  Contact me
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ opacity: opacityTransform }}
          className="absolute left-1/2 bottom-12 transform z-20 -translate-x-1/2 flex flex-col items-center"
        >
          <Link to="#work" className="flex items-center flex-col text-center justify-center">
            <motion.div className="w-5 h-9 border border-muted-foreground/20 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [-2, 2, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-1 h-1.5 bg-[#2563EB]/50 rounded-full mt-2"
              />
            </motion.div>
            <span className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground/40">scroll</span>
          </Link>
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 relative">
        <div className="absolute -top-40 left-[20%] w-[40vw] h-[40vh] bg-[#2563EB]/2 rounded-full blur-[120px] opacity-20"></div>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 xl:px-6">
          <motion.header
            className="mb-16 md:mb-20 flex items-end justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground">work</h2>
            <span className="text-sm text-muted-foreground hidden md:block">selected projects</span>
          </motion.header>

          {/* Project 1 */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <a
              href="https://emilisjokubas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="bg-muted/10 rounded-2xl p-8 md:p-10 relative overflow-hidden group border border-border/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 z-10">
                    <motion.h3
                      className="text-3xl md:text-4xl font-normal text-foreground mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      Emilis Jokūbas
                    </motion.h3>

                    <motion.div
                      className="flex items-center text-sm text-muted-foreground mb-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="uppercase tracking-wider">Client</span>
                      <span className="mx-2">•</span>
                      <span>2025</span>
                    </motion.div>

                    <motion.p
                      className="text-lg text-muted-foreground mb-10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Emilis Jokūbas is a Lithuanian comedian and content creator. The website was designed to promote
                      his upcoming tour dates and provide information about his comedy career and his activities.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Button variant="outline" className="group relative overflow-hidden cursor-pointer">
                        <span className="relative z-10 group-hover:text-white duration-300 transition-colors">
                          View project
                        </span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 duration-300 relative z-10 group-hover:text-white" />
                        <span className="absolute inset-0 bg-[#2563EB] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                      </Button>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-7 z-10">
                    <motion.div
                      className="relative aspect-[16/10] rounded-lg overflow-hidden transition-transform group-hover:scale-[1.01] duration-700"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.9, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{
                        boxShadow: '0 20px 40px -20px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {/* Content */}
                      <img
                        src="/emilis.png"
                        alt="Field Service App"
                        className="w-full h-full object-cover rounded-lg z-10 "
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Project 2 */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <a
              href="https://fields.lauva.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="bg-muted/10 rounded-2xl p-8 md:p-10 relative overflow-hidden group border border-border/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 z-10">
                    <motion.div
                      className="w-10 h-10 bg-[#2563EB]/5 rounded-xl flex items-center justify-center mb-8 shadow-sm"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Layers className="h-5 w-5 text-[#2563EB]/70" />
                    </motion.div>

                    <motion.h3
                      className="text-3xl md:text-4xl font-normal text-foreground mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      Field Service App (SaaS)
                    </motion.h3>

                    <motion.div
                      className="flex items-center text-sm text-muted-foreground mb-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <span className="uppercase tracking-wider">Personal</span>
                      <span className="mx-2">•</span>
                      <span>2024</span>
                    </motion.div>

                    <motion.p
                      className="text-lg text-muted-foreground mb-10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Field Service App is a SaaS application that allows users to manage their field service
                      operations. Create, manage, and track tasks, assign them to people, and track their progress.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Button variant="outline" className="group relative overflow-hidden cursor-pointer">
                        <span className="relative z-10 group-hover:text-white duration-300 transition-colors">
                          View project
                        </span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 duration-300 relative z-10 group-hover:text-white" />
                        <span className="absolute inset-0 bg-[#2563EB] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                      </Button>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-7 z-10">
                    <motion.div
                      className="relative aspect-[16/10] rounded-lg overflow-hidden transition-transform group-hover:scale-[1.01] duration-700"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.9, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{
                        boxShadow: '0 20px 40px -20px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <img
                        src="/fields.png"
                        alt="Field Service App"
                        className="w-full h-full object-cover rounded-lg z-10 "
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
        <motion.div
          className="text-center -mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/unext1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2563EB] transition-colors group"
          >
            <span>View all projects</span>
            <Github className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      {/* About Me Section with Technologies */}
      <section id="about" className="pt-32 pb-48 relative bg-gradient-to-b from-background to-muted/20">
        <div className="absolute -top-20 right-[10%] w-[30vw] h-[30vh] bg-[#2563EB]/2 rounded-full blur-[100px] opacity-20"></div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 xl:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-6 lg:col-span-7">
              <motion.header
                className="mb-8 md:mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground">about me</h2>
              </motion.header>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="flex flex-col gap-6">
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I'm a 21 y/o developer with a strong expertise on frontend, backend, design, and devops. I crafting
                    apps that scale, look good, run fast, and feel right.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I take pride in shipping reliable products with care — thinking through the user experience, code
                    quality, and how it all comes together in production.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-8">
                    {/* Social links */}
                    <motion.a
                      href="https://github.com/unext1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-background/70 flex items-center justify-center group-hover:bg-[#2563EB]/10 transition-colors">
                        <Github className="h-4 w-4 text-muted-foreground group-hover:text-[#2563EB] transition-colors" />
                      </div>
                      <span className="text-muted-foreground group-hover:text-[#2563EB] transition-colors">GitHub</span>
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/laurynas-valiulis/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-background/70 flex items-center justify-center group-hover:bg-[#2563EB]/10 transition-colors">
                        <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-[#2563EB] transition-colors" />
                      </div>
                      <span className="text-muted-foreground group-hover:text-[#2563EB] transition-colors">
                        LinkedIn
                      </span>
                    </motion.a>

                    <motion.a
                      href="https://www.youtube.com/@Lauvadev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-background/70 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-muted-foreground group-hover:text-red-500 transition-colors"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg>
                      </div>
                      <span className="text-muted-foreground group-hover:text-red-500 transition-colors">YouTube</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Technologies Grid */}
            <div className="md:col-span-6 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
                className="md:pt-[4.5rem]"
              >
                <div className="[mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
                  <div className="bg-muted/10 dark:bg-muted/5 rounded-2xl border border-border/10 p-4 shadow-lg">
                    <h3 className="text-xl font-medium mb-4 px-2">technologies</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <Technology name="React Router" />
                      <Technology name="React" />
                      <Technology name="TypeScript" />
                      <Technology name="Node.js" />
                      <Technology name="Tailwind" />
                      <Technology name="Framer Motion" />
                      <Technology name="Shadcn UI" />
                      <Technology name="DrizzleORM" />
                      <Technology name="Docker" />
                      <Technology name="Better-Auth" />
                      <Technology name="Next.js" />
                      <Technology name="HTML" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-24 relative bg-gradient-to-t from-background to-muted/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 xl:px-6">
          <header className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground">journey</h2>
          </header>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-px"></div>

            {/* Timeline entries */}
            <div className="space-y-16 md:space-y-24 relative">
              {/* Entry 1 - Current Position */}
              <motion.div
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="md:text-right md:pr-16 pl-12 md:pl-0 relative">
                  <div className="absolute left-4 md:left-auto md:right-0 top-0 w-3 h-3 rounded-full bg-[#2563EB] translate-x-[-6.5px] md:translate-x-[6.5px]"></div>
                  <span className="text-sm text-[#2563EB] font-medium tracking-wider uppercase mb-2 block">
                    2024 - Present
                  </span>
                  <h3 className="text-2xl font-medium mb-3">Full-Stack Developer at Neuralfinity</h3>
                  <p className="text-muted-foreground">
                    Currently working as a full-stack developer, building innovative AI powered solutions with modern
                    web technologies.
                  </p>
                </div>
                <div className="md:pl-12"></div>
              </motion.div>

              {/* Entry 2 - Freelance Work */}
              <motion.div
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="md:pr-12"></div>
                <div className="pl-12 md:pl-16 relative">
                  <div className="absolute left-4 md:left-0 top-0 w-3 h-3 rounded-full bg-[#2563EB] translate-x-[-6.5px]"></div>
                  <span className="text-sm text-[#2563EB] font-medium tracking-wider uppercase mb-2 block">
                    2020 - Present
                  </span>
                  <h3 className="text-2xl font-medium mb-3">Freelance</h3>
                  <p className="text-muted-foreground">
                    Building and delivering custom web solutions for diverse clients. Strong focus on performance, user
                    interface, and creating delightful user experiences.
                  </p>
                </div>
              </motion.div>

              {/* Entry 3 - Internship at Erlin */}
              <motion.div
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="md:text-right md:pr-16 pl-12 md:pl-0 relative">
                  <div className="absolute left-4 md:left-auto md:right-0 top-0 w-3 h-3 rounded-full bg-[#2563EB] translate-x-[-6.5px] md:translate-x-[6.5px]"></div>
                  <span className="text-sm text-[#2563EB] font-medium tracking-wider uppercase mb-2 block">
                    Jan 2024 - May 2024
                  </span>
                  <h3 className="text-2xl font-medium mb-3">Intern at Erlin Business Company</h3>
                  <p className="text-muted-foreground">
                    Led the development of a Field Service SaaS application, showcasing full-stack development
                    capabilities and independent project management skills.
                  </p>
                </div>
                <div className="md:pl-12"></div>
              </motion.div>

              {/* Entry 4 - Internship at Brainforest */}
              <motion.div
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="md:pr-12"></div>
                <div className="pl-12 md:pl-16 relative">
                  <div className="absolute left-4 md:left-0 top-0 w-3 h-3 rounded-full bg-[#2563EB] translate-x-[-6.5px]"></div>
                  <span className="text-sm text-[#2563EB] font-medium tracking-wider uppercase mb-2 block">
                    Apr 2023 - May 2023
                  </span>
                  <h3 className="text-2xl font-medium mb-3">Intern at Brainforest</h3>
                  <p className="text-muted-foreground">
                    Collaborated in an agile team environment, developing an AI-powered SEO optimization tool{' '}
                    <span>(before AI was a big thing)</span> for WordPress images. Enhanced teamwork skills and expanded
                    technical knowledge.
                  </p>
                </div>
              </motion.div>

              {/* Entry 5 - Education at Borås */}
              <motion.div
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="md:text-right md:pr-16 pl-12 md:pl-0 relative">
                  <div className="absolute left-4 md:left-auto md:right-0 top-0 w-3 h-3 rounded-full bg-[#2563EB] translate-x-[-6.5px] md:translate-x-[6.5px]"></div>
                  <span className="text-sm text-[#2563EB] font-medium tracking-wider uppercase mb-2 block">
                    2022 - 2024
                  </span>
                  <h3 className="text-2xl font-medium mb-3">Borås Yrkeshögskola</h3>
                  <p className="text-muted-foreground">
                    Specialized in Frontend Development with React. Enhanced UI/UX knowledge and explored various React
                    frameworks, preparing for professional development work.
                  </p>
                </div>
                <div className="md:pl-12"></div>
              </motion.div>

              {/* Entry 6 - Education Start */}
              <motion.div
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="md:pr-12"></div>
                <div className="pl-12 md:pl-16 relative">
                  <div className="absolute left-4 md:left-0 top-0 w-3 h-3 rounded-full bg-[#2563EB] translate-x-[-6.5px]"></div>
                  <span className="text-sm text-[#2563EB] font-medium tracking-wider uppercase mb-2 block">
                    2019 - 2022
                  </span>
                  <h3 className="text-2xl font-medium mb-3">LBS Kreativa Gymnasiet</h3>
                  <p className="text-muted-foreground">
                    Studied Game Development using C# and Unity. Explored GraphQL basics and learned JavaScript in my
                    free time, laying the foundation for my web development journey.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 xl:px-6">
          <motion.div
            className="bg-muted/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 border border-border/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-[30%] h-[80%] bg-gradient-to-bl from-[#2563EB]/5 via-transparent to-transparent transform origin-top-right"></div>
            <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></div>

            <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto relative z-10">
              <span className="inline-flex items-center mb-4 text-sm text-[#2563EB]/80 tracking-wide border border-[#2563EB]/20 rounded-full py-1 px-3">
                Get in touch
              </span>

              <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground mb-6">
                let's work together
              </h2>

              <p className="text-lg text-muted-foreground max-w-xl mb-10">
                Have a project in mind? I'm always available and open to discussing new opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <Button size="lg" className="bg-[#2563EB] hover:bg-[#1E40AF] text-white min-w-[180px]" asChild>
                  <a href="mailto:info@lauva.dev" className="flex items-center gap-2 justify-center">
                    Contact me
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 xl:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <Link to="/" className="inline-block group">
                <span className="text-lg font-medium text-foreground tracking-tight group-hover:text-[#2563EB] transition-colors">
                  laurynas<span className="text-[#2563EB]">.</span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Full stack dev crafting sleek, scalable sites with code & taste.
              </p>
            </div>

            <div className="flex gap-6">
              <a
                href="https://github.com/unext1"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="GitHub"
              >
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[#2563EB]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-[#2563EB] transition-colors" />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/laurynas-valiulis/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[#2563EB]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-[#2563EB] transition-colors" />
                </div>
              </a>
              <a
                href="https://www.youtube.com/@Lauvadev"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="YouTube"
              >
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-muted-foreground group-hover:text-red-500 transition-colors"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Laurynas Valiulis. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
