"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/locale-link";
import { Spotlight } from "@/components/aceternity/spotlight";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import { cn } from "@/lib/utils";
import type { ProductHeroBlock } from "@/types";

interface ProductHeroProps extends ProductHeroBlock {
  productName?: string | null;
  productLogo?: { url: string; alternativeText?: string | null } | null;
  status?: string | null;
  version?: string | null;
  accentColor?: string | null;
  complianceTags?: string[] | null;
}

const STATUS_LABEL: Record<string, string> = {
  alpha: "Alpha",
  beta: "Beta",
  ga: "Production",
  "coming-soon": "Coming soon",
};

const TRUSTED_EMBED_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "player.vimeo.com",
  "www.loom.com",
  "loom.com",
]);

function isTrustedEmbedUrl(raw: string | null | undefined): raw is string {
  if (!raw) return false;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:") return false;
    return TRUSTED_EMBED_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

export function ProductHero({
  eyebrow,
  heading,
  sub_heading,
  primary_cta,
  secondary_cta,
  preview_image,
  preview_video_url,
  show_status_pill,
  productName,
  productLogo,
  status,
  version,
  accentColor,
  complianceTags,
}: Readonly<ProductHeroProps>) {
  const logoUrl = productLogo ? getStrapiMediaUrl(productLogo as unknown as Record<string, unknown>) : null;
  const previewUrl = preview_image ? getStrapiMediaUrl(preview_image as unknown as Record<string, unknown>) : null;
  const showStatus = show_status_pill !== false && status;

  return (
    <section
      className="relative w-full overflow-hidden border-b border-brand-ink/10 bg-brand-surface"
      style={{ "--product-accent": accentColor ?? "#50B8D9" } as React.CSSProperties}
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill={accentColor ?? "#50B8D9"} />

      <div
        className="absolute inset-0 -z-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, color-mix(in oklch, ${accentColor ?? "#50B8D9"} 22%, transparent), transparent 60%)`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-16 md:pb-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {logoUrl && (
            <div className="h-14 w-14 md:h-16 md:w-16 relative">
              <Image src={logoUrl} alt={productName ?? "Product logo"} fill sizes="64px" className="object-contain" />
            </div>
          )}

          {(showStatus || version) && (
            <div className="flex items-center gap-2 text-xs font-medium">
              {showStatus && (
                <span
                  className="px-3 py-1 rounded-full border"
                  style={{
                    color: accentColor ?? "#50B8D9",
                    borderColor: `color-mix(in oklch, ${accentColor ?? "#50B8D9"} 35%, transparent)`,
                    backgroundColor: `color-mix(in oklch, ${accentColor ?? "#50B8D9"} 10%, transparent)`,
                  }}
                >
                  {STATUS_LABEL[status as string] ?? status}
                </span>
              )}
              {version && (
                <span className="px-3 py-1 rounded-full border border-brand-border text-brand-text">{version}</span>
              )}
            </div>
          )}

          {eyebrow && (
            <p className="text-sm md:text-base font-medium tracking-wide uppercase text-brand-text">{eyebrow}</p>
          )}

          {heading && (
            <h1 className={cn(
              "max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.05] tracking-tight text-balance text-brand-ink",
            )}>
              {heading}
            </h1>
          )}

          {sub_heading && (
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-brand-text text-pretty">
              {sub_heading}
            </p>
          )}

          {(primary_cta || secondary_cta) && (
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              {primary_cta?.URL && (
                <Button
                  asChild
                  size="lg"
                  className="text-white shadow-lg hover:brightness-110 transition-all"
                  style={{ backgroundColor: accentColor ?? "#50B8D9" }}
                >
                  <LocaleLink
                    href={primary_cta.URL}
                    target={primary_cta.target ?? "_self"}
                    rel={primary_cta.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {primary_cta.text ?? "Get started"}
                  </LocaleLink>
                </Button>
              )}
              {secondary_cta?.URL && (
                <Button asChild size="lg" variant="outline" className="border-brand-border">
                  <LocaleLink
                    href={secondary_cta.URL}
                    target={secondary_cta.target ?? "_self"}
                    rel={secondary_cta.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {secondary_cta.text ?? "Watch demo"}
                  </LocaleLink>
                </Button>
              )}
            </div>
          )}

          {Array.isArray(complianceTags) && complianceTags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {complianceTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-md border border-brand-border bg-brand-surface-raised text-brand-text"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {(previewUrl || preview_video_url) && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-12 md:mt-16 w-full max-w-5xl"
          >
            <div
              className="rounded-2xl overflow-hidden border bg-brand-surface-raised shadow-2xl"
              style={{ borderColor: `color-mix(in oklch, ${accentColor ?? "#50B8D9"} 40%, var(--brand-border))` }}
            >
              {isTrustedEmbedUrl(preview_video_url) ? (
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={preview_video_url}
                    title={`${productName ?? "Product"} preview`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : previewUrl ? (
                <div className="relative aspect-video">
                  <Image
                    src={previewUrl}
                    alt={`${productName ?? "Product"} preview`}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
