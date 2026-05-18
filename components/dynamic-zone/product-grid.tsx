import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LocaleLink } from "@/components/locale-link";
import { SectionHeader } from "@/components/global/section-header";
import { getCaller } from "@/trpc/server";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import { DEFAULT_PRODUCT_ACCENT, DEFAULT_LOCALE } from "@/lib/constants";
import { PRODUCT_STATUS_LABEL } from "@/lib/utils";
import type { ProductGridBlock, ProductPageListItem } from "@/types";

interface ProductGridProps extends ProductGridBlock {
  /** Locale forwarded by the parent route. Falls back to DEFAULT_LOCALE if omitted. */
  locale?: string;
}

export async function ProductGrid({
  header_section,
  cta_label,
  show_all_featured,
  locale,
}: Readonly<ProductGridProps>) {
  const resolvedLocale = locale ?? DEFAULT_LOCALE;

  let products: ProductPageListItem[] = [];
  try {
    const caller = await getCaller();
    const data = await caller.comingSoon.getProductPages({ locale: resolvedLocale });
    products = (data ?? []).filter((p) =>
      show_all_featured !== false ? p.featured_in_catalog : true,
    );
  } catch (error) {
    console.warn("[ProductGrid] Failed to fetch product pages:", error instanceof Error ? error.message : error);
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full border-b border-brand-ink/10 bg-brand-surface">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionHeader
            header={header_section}
            defaultHeading="Our software products"
            defaultSubHeading="Production-grade systems built for African institutional realities."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => {
            const logoUrl = product.product_logo
              ? getStrapiMediaUrl(product.product_logo)
              : null;
            const accent = product.accent_color ?? DEFAULT_PRODUCT_ACCENT;
            return (
              <LocaleLink
                key={product.id}
                href={`/apps/${product.slug}`}
                className="group flex flex-col h-full rounded-2xl border border-brand-border bg-brand-surface-raised overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="h-1 w-full" style={{ backgroundColor: accent }} />
                <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                  {logoUrl && (
                    <div className="relative h-12 w-12">
                      <Image src={logoUrl} alt={product.name} fill sizes="48px" className="object-contain" />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl md:text-2xl font-semibold text-brand-ink">{product.name}</h3>
                    {product.release_status && (
                      <span
                        className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full"
                        style={{
                          color: accent,
                          backgroundColor: `color-mix(in oklch, ${accent} 12%, transparent)`,
                        }}
                      >
                        {PRODUCT_STATUS_LABEL[product.release_status] ?? product.release_status}
                      </span>
                    )}
                  </div>
                  {product.tagline && (
                    <p className="text-sm md:text-base text-brand-text leading-relaxed flex-1">{product.tagline}</p>
                  )}
                  <div
                    className="flex items-center gap-2 text-sm font-medium mt-2 group-hover:gap-3 transition-all"
                    style={{ color: accent }}
                  >
                    <span>{cta_label ?? "Learn more"}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </LocaleLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
