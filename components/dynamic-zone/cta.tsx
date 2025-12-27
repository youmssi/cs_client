import { LocaleLink } from '@/components/locale-link';

import { Button } from '@/components/ui/button';
import type { CTABlock } from '@/types';
import { cn } from '@/lib/utils';

export function CTA({ heading, sub_heading, CTAs: ctas }: Readonly<CTABlock>) {
  const buttonVariantMap: Record<string, 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link'> = {
    default: 'default',
    outline: 'outline',
    ghost: 'ghost',
    destructive: 'destructive',
    secondary: 'secondary',
    link: 'link',
  };

  return (
    <section className="w-full relative overflow-hidden flex flex-col justify-center items-center gap-2">
      {/* Content with oblique lines background */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-t border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6 relative z-10">
        {/* Oblique lines pattern background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-4 w-full rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                style={{
                  top: `${i * 16 - 120}px`,
                  left: "-100%",
                  width: "300%",
                }}
              />
            ))}
          </div>
        </div>

        {/* Content container */}
        <div className="w-full max-w-[586px] px-6 py-5 md:py-8 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-6 relative z-20">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <h2 className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[56px] font-sans tracking-tight">
              {heading}
            </h2>
            {sub_heading && (
              <p className="self-stretch text-center text-[#605A57] text-base leading-7 font-sans font-medium">
                {sub_heading}
              </p>
            )}
          </div>

          {ctas && ctas.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {ctas.map((cta) => (
                <Button
                  key={cta.URL}
                  asChild
                  variant={cta.variant ? buttonVariantMap[cta.variant] ?? 'default' : 'default'}
                  size="lg"
                  className={cn('transition-all duration-200')}
                >
                  {cta.URL ? (
                    <LocaleLink
                      href={cta.URL}
                      target={cta.target || '_self'}
                      rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                    >
                      {cta.text}
                    </LocaleLink>
                  ) : (
                    <span>{cta.text}</span>
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

