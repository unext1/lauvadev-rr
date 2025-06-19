import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const images = [
  '/placeholder.svg?height=1080&width=1920',
  '/placeholder.svg?height=1080&width=1920',
  '/placeholder.svg?height=1080&width=1920'
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-muted/40"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-[#00BFFF]' : 'bg-white/50'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
