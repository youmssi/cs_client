import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { CTABlock } from '@/types';
import { cn } from '@/lib/utils';

export function CTA({ heading, sub_heading, CTAs: ctas }: Readonly<CTABlock>) {
  const buttonVariantMap = {
    simple: 'ghost' as const,
    outline: 'outline' as const,
    primary: 'default' as const,
    muted: 'secondary' as const,
  };

  return (
    <section className="py-20 md:py-32 bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {heading}
          </h2>
          {sub_heading && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {sub_heading}
            </p>
          )}

          {ctas && ctas.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 pt-4">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

