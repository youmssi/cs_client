import { Check } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { StrapiPricingPlan } from '@/types/products';

type ProductPricingSectionProps = Readonly<{
  headline: string;
  subheadline?: string | null;
  pricingPlansData?: StrapiPricingPlan[];
}>;

export function ProductPricingSection({
  headline,
  subheadline,
  pricingPlansData = [],
}: ProductPricingSectionProps) {
  if (pricingPlansData.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pricingPlansData.map((plan) => (
            <Card
              key={plan.id}
              className={plan.popular ? 'border-primary shadow-lg scale-105' : ''}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {plan.description && (
                  <CardDescription>{plan.description}</CardDescription>
                )}
                <div className="pt-4">
                  {plan.price_monthly !== null && plan.price_monthly !== undefined && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        {plan.currency || '$'}
                        {plan.price_monthly.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  )}
                  {plan.price_yearly !== null &&
                    plan.price_yearly !== undefined && (
                      <div className="text-sm text-muted-foreground mt-2">
                        {plan.currency || '$'}
                        {plan.price_yearly.toFixed(2)} /year
                      </div>
                    )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.text}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check
                          className={feature.available ? 'text-primary mt-0.5 shrink-0' : 'text-muted-foreground/50 mt-0.5 shrink-0'}
                          size={16}
                        />
                        <span
                          className={
                            feature.available
                              ? ''
                              : 'text-muted-foreground line-through'
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
              {plan.cta_text && plan.cta_url && (
                <CardFooter>
                  <Button asChild className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    <a
                      href={plan.cta_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.cta_text}
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

