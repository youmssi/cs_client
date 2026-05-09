import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { AppCatalogBlock } from '@/types';
import { ANCHORS } from '@/lib/constants';
import { SectionHeader } from '@/components/global/section-header';
import { getStrapiMediaUrl } from '@/lib/media.strapi';

function DeliveryBadges({ is_saas, is_on_premise, is_hybrid }: {
  is_saas: boolean;
  is_on_premise: boolean;
  is_hybrid: boolean;
}) {
  const active = [
    is_saas && 'SaaS',
    is_on_premise && 'On-Premise',
    is_hybrid && 'Hybrid',
  ].filter(Boolean) as string[];

  if (active.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {active.map((label) => (
        <span
          key={label}
          className="px-2 py-0.5 border border-brand-border text-xs font-medium text-brand-ink rounded-sm"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function AppCatalog({ header_section, apps }: Readonly<AppCatalogBlock>) {
  if (!apps || apps.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: apps.map((app, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: app.name,
      description: app.tagline,
      url: app.external_url ?? undefined,
    })),
  };

  return (
    <section
      id={ANCHORS.APPS_CATALOG}
      className="w-full flex justify-center items-start border-b border-brand-ink/12"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026') }}
      />
      <div className="flex-1 px-4 md:px-12 lg:px-24 py-16 md:py-20 flex flex-col items-center gap-10 md:gap-14">
        <SectionHeader
          header={header_section}
          defaultHeading="Software systems built for enterprise operations"
          defaultSubHeading="Independently engineered platforms — each designed to address a specific institutional need at scale."
        />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
          {apps.map((app) => {
            const logoUrl = app.logo ? getStrapiMediaUrl(app.logo.url) : null;

            return (
              <div
                key={app.slug}
                className="bg-white flex flex-col gap-4 p-6 hover:bg-brand-surface transition-colors duration-200"
              >
                {/* Logo */}
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden bg-brand-surface rounded-sm shrink-0">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={app.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-brand-ink text-sm font-semibold">
                      {app.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Category */}
                <span className="text-brand-ink/50 text-xs font-medium uppercase tracking-widest">
                  {app.category}
                </span>

                {/* Name + Tagline */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-brand-dark text-base font-semibold leading-tight">
                    {app.name}
                  </h3>
                  <p className="text-brand-text text-sm leading-6">
                    {app.tagline}
                  </p>
                </div>

                {/* Delivery badges — push to bottom */}
                <div className="mt-auto flex flex-col gap-3">
                  <DeliveryBadges
                    is_saas={app.is_saas}
                    is_on_premise={app.is_on_premise}
                    is_hybrid={app.is_hybrid}
                  />

                  {/* CTA */}
                  {app.external_url && (
                    <a
                      href={app.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-brand-ink text-sm font-medium hover:text-brand-dark transition-colors duration-150"
                    >
                      Explore Platform
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
