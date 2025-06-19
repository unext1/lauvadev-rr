import { motion } from 'motion/react';
import { Mic } from 'lucide-react';

export default function MicrophoneAnimation() {
  return (
    <motion.div
      animate={{
        rotate: [0, 5, -5, 5, 0]
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse'
      }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-full bg-[#00BFFF]/20 animate-pulse" />
      <Mic size={48} className="text-[#00BFFF]" />
    </motion.div>
  );
}
