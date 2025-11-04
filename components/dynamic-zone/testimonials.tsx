'use client';

import { useMemo } from 'react';

import { CardStack } from '@/components/aceternity/card-stack';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { TestimonialBlock } from '@/types';
import { getUserFullName, getUserInitials } from '@/lib/utils/type-helpers';

export function Testimonials({
  heading,
  sub_heading,
  testimonials,
}: Readonly<TestimonialBlock>) {
  const cardStackItems = useMemo(() => {
    if (!testimonials) return [];
    return testimonials.map((testimonial, index) => {
      const name = getUserFullName(testimonial.user);
      const designation = testimonial.user?.job || '';

      return {
        id: index,
        name,
        designation,
        content: (
          <div className="space-y-2">
                    <p className="text-sm md:text-base leading-relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
          </div>
        ),
      };
    });
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {heading}
          </h2>
          {sub_heading && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {sub_heading}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Card Stack */}
          <div className="shrink-0">
            <CardStack items={cardStackItems} />
          </div>

          {/* Individual Testimonials Grid (for larger screens) */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {testimonials.slice(0, 4).map((testimonial, index) => {
              const name = getUserFullName(testimonial.user);
              const job = testimonial.user?.job || '';
              const imageUrl = testimonial.user?.image?.url || null;
              const initials = getUserInitials(testimonial.user);

              return (
                <Card key={index} className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <Avatar>
                        <AvatarImage src={imageUrl || undefined} alt={name} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{name}</p>
                        {job && <p className="text-sm text-muted-foreground">{job}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

