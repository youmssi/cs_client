import { motion } from 'motion/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getStrapiMediaUrl } from '@/lib/utils/media';
import type { Button as ButtonType, Image as ImageType } from '@/types';
import type { StrapiSaaSProduct } from '@/types/products';
import Image from 'next/image';

interface ProductHeroProps {
  headline: string;
  subheadline?: string | null;
  primary_cta?: ButtonType | null;
  secondary_cta?: ButtonType | null;
  hero_image?: ImageType | null;
  demo_video?: ImageType | null;
  trust_indicators?: Array<{
    text: string;
    icon?: ImageType | null;
  }> | null;
  product?: StrapiSaaSProduct | null;
}

export function ProductHero({
  headline,
  subheadline,
  primary_cta,
  secondary_cta,
  hero_image,
  trust_indicators,
  product,
}: Readonly<ProductHeroProps>) {
  const heroImageUrl = hero_image
    ? getStrapiMediaUrl(hero_image.url)
    : product?.product_logo
      ? getStrapiMediaUrl(product.product_logo.url)
      : null;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {product && (
              <div className="flex items-center gap-2 mb-4">
                {product.product_type && (
                  <Badge variant="secondary">{product.product_type}</Badge>
                )}
                {product.product_icon && (
                  <Image
                    src={getStrapiMediaUrl(product.product_icon.url)}
                    alt={product.name}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                )}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {headline}
            </h1>

            {subheadline && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {subheadline}
              </p>
            )}

            {/* Trust Indicators */}
            {trust_indicators && trust_indicators.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {trust_indicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {indicator.icon && (
                      <Image
                        src={getStrapiMediaUrl(indicator.icon.url)}
                        alt=""
                        width={20}
                        height={20}
                      />
                    )}
                    <span>{indicator.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              {primary_cta && (
                <Button asChild size="lg">
                  <Link
                    href={primary_cta.URL}
                    target={primary_cta.target || '_self'}
                    rel={primary_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    {primary_cta.text}
                  </Link>
                </Button>
              )}
              {secondary_cta && (
                <Button asChild variant="outline" size="lg">
                  <Link
                    href={secondary_cta.URL}
                    target={secondary_cta.target || '_self'}
                    rel={secondary_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    {secondary_cta.text}
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Image/Video */}
          {heroImageUrl && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted/50">
                <Image
                  src={heroImageUrl}
                  alt={headline}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

