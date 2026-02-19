import type { SEOHandle } from '@nasa-gcn/remix-seo';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { buttonVariants } from '~/components/ui/button';

export const handle: SEOHandle = {
  getSitemapEntries: () => null,
};

export function meta() {
  return [
    { title: '404 - Page Not Found' },
    { name: 'description', content: 'The page you are looking for does not exist.' },
  ];
}

export default function NotFoundPage() {
  return (
    <div className="relative flex-1 flex flex-col bg-background">
      <div className="flex-1 flexrelative m-4 flex flex-col overflow-hidden border bg-linear-to-b from-card to-background">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1  items-center justify-center px-6 py-16 text-center md:px-12">
          <div className="">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">404 · Not Found</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-foreground"
            >
              This page took a
              <br />
              <span className="text-muted-foreground">different route.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-sm md:text-base text-muted-foreground"
            >
              The page you are looking for doesn&apos;t exist, was moved, or the link is outdated.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex justify-center"
            >
              <Link
                to="/"
                className={buttonVariants({
                  variant: 'default',
                  size: 'lg',
                  className: 'group h-11 px-6 font-mono text-xs uppercase tracking-wide',
                })}
              >
                <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to home
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-6 md:px-12">
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              © {new Date().getFullYear()} Laurynas all rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
