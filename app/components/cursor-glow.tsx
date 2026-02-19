import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";

export const CursorGlow = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
        
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden lg:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div className="h-52 w-52 rounded-full bg-foreground/4 blur-3xl" />
    </motion.div>
  );
};