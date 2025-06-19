import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const navItems = [
  { name: 'HOME', href: '#' },
  { name: 'TOUR', href: '#tour' },
  { name: 'VIDEOS', href: '#videos' },
  { name: 'ABOUT', href: '#about' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          scrolled ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl md:text-3xl font-bold text-white">
              EJ
            </Link>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white hover:text-[#00BFFF] transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="#contact"
                className="bg-[#FFD700] text-black px-4 py-2 rounded font-medium hover:bg-[#FFD700]/80 transition-colors"
              >
                CONTACT
              </Link>
            </nav>

            <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6">
                <Link to="/" className="text-2xl font-bold text-white">
                  EJ
                </Link>
                <button className="text-white" onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 space-y-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className="text-3xl font-bold text-white hover:text-[#00BFFF]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Link
                    to="#contact"
                    className="bg-[#FFD700] text-black px-6 py-3 rounded font-bold text-xl hover:bg-[#FFD700]/80 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    CONTACT
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
