import { motion } from 'motion/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import type { HeroBlock } from '@/types';
import { cn } from '@/lib/utils';

export function Hero({ heading, sub_heading, CTAs }: Readonly<HeroBlock>) {
  const buttonVariantMap = {
    simple: 'ghost' as const,
    outline: 'outline' as const,
    primary: 'default' as const,
    muted: 'secondary' as const,
    default: 'default' as const,
  };

  return (
    <HeroHighlight containerClassName="min-h-screen">
      <div className="container mx-auto px-4 text-center space-y-8">
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-6xl leading-relaxed lg:leading-snug text-center mx-auto"
        >
          {heading && (
            <>
              {heading.split(' ').slice(0, -1).join(' ')}{' '}
              <Highlight className="text-black dark:text-white">
                {heading.split(' ').slice(-1)[0]}
              </Highlight>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed"
        >
          {sub_heading}
        </motion.p>

        {CTAs && CTAs.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {CTAs.map((cta) => (
              <Button
                key={cta.URL}
                asChild
                variant={cta.variant ? buttonVariantMap[cta.variant] : 'default'}
                size="lg"
                className={cn(
                  cta.variant === 'primary' && 'shadow-lg hover:shadow-xl',
                  'transition-all duration-200'
                )}
              >
                <Link
                  href={cta.URL}
                  target={cta.target || '_self'}
                  rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                >
                  {cta.text}
                </Link>
              </Button>
            ))}
          </motion.div>
        )}
      </div>
    </HeroHighlight>
  );
}

