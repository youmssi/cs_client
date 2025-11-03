import { motion } from 'motion/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { HeroBlock } from '@/types';
import { cn } from '@/lib/utils';

export function Hero({ heading, sub_heading, ctas }: Readonly<HeroBlock>) {
  const buttonVariantMap = {
    simple: 'ghost' as const,
    outline: 'outline' as const,
    primary: 'default' as const,
    muted: 'secondary' as const,
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-background to-background/50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 text-center space-y-8"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight max-w-6xl mx-auto"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {sub_heading}
        </motion.p>

        {ctas && ctas.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {ctas.map((cta) => (
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
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-80 w-full bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

