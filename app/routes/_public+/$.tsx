import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { DotPattern } from '~/components/dot-bg';
import { Button } from '~/components/ui/button';
import { cn } from '~/utils';

export function meta() {
  return [
    { title: '404 - Page Not Found' },
    { name: 'description', content: 'The page you are looking for does not exist.' }
  ];
}

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background selection:bg-blue-500/10 selection:text-blue-500">
      {/* Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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

      {/* Gradient Spots */}
      <div className="absolute -top-40 left-[20%] w-[40vw] h-[40vh] bg-blue-500/2 rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-40 right-[20%] w-[30vw] h-[30vh] bg-blue-500/2 rounded-full blur-[100px] opacity-20" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-7xl md:text-8xl font-light text-blue-500/90">404</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-normal tracking-tight text-foreground mb-6"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-12"
        >
          The page you are looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Button variant="outline" size="lg" className="group relative overflow-hidden" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 z-10 transition-transform group-hover:-translate-x-1 delay-200" />
              <span className="relative z-10">Back to home</span>
              <span className="absolute inset-0 bg-blue-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
