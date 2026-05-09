import Image from 'next/image';
import {
  Stethoscope,
  GraduationCap,
  Building2,
  Truck,
  Phone,
  Landmark,
  Users,
  ShoppingBag,
  Factory,
  type LucideIcon,
} from 'lucide-react';
import type { EcosystemShowcaseBlock } from '@/types';
import { ANCHORS } from '@/lib/constants';
import { SectionHeader } from '@/components/global/section-header';
import { getStrapiMediaUrl } from '@/lib/media.strapi';

const ICON_MAP: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  'graduation-cap': GraduationCap,
  'building-2': Building2,
  truck: Truck,
  phone: Phone,
  landmark: Landmark,
  users: Users,
  'shopping-bag': ShoppingBag,
  factory: Factory,
};

export function EcosystemShowcase({
  label,
  header_section,
  industries,
  logos,
}: Readonly<EcosystemShowcaseBlock>) {
  const hasIndustries = industries && industries.length > 0;
  const hasLogos = logos && logos.length > 0;

  if (!hasIndustries && !hasLogos && !header_section) return null;

  return (
    <section
      id={ANCHORS.ECOSYSTEM}
      className="w-full flex justify-center items-start border-b border-brand-ink/12"
    >
      <div className="flex-1 px-4 md:px-12 lg:px-24 py-16 md:py-20 flex flex-col items-center gap-10 md:gap-14">
        {/* Overline label */}
        {label && (
          <p className="text-brand-ink/50 text-xs font-medium uppercase tracking-widest">
            {label}
          </p>
        )}

        <SectionHeader
          header={header_section}
          defaultHeading="Built for complex institutional environments"
          defaultSubHeading="Our systems are designed for the operational reality of large organizations — not proof-of-concepts, but production infrastructure."
        />

        {/* Industry pills */}
        {hasIndustries && (
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((industry) => {
              const Icon = industry.icon_name ? ICON_MAP[industry.icon_name] : null;
              return (
                <div
                  key={industry.id}
                  className="flex items-center gap-2 px-4 py-2 border border-brand-border rounded-sm text-brand-dark text-sm font-medium"
                >
                  {Icon && <Icon className="w-4 h-4 text-brand-ink/60 shrink-0" />}
                  <span>{industry.name}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Optional logo strip */}
        {hasLogos && (
          <div className="w-full flex flex-wrap justify-center items-center gap-6 md:gap-10 mt-2">
            {logos!.map((logo, index) => {
              const logoUrl = logo.image ? getStrapiMediaUrl(logo.image.url) : null;
              if (!logoUrl) return null;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2.5 opacity-50 hover:opacity-80 transition-opacity duration-200"
                >
                  <div className="w-8 h-8 relative overflow-hidden">
                    <Image
                      src={logoUrl}
                      alt={logo.company || 'Logo'}
                      width={logo.image!.width ?? 32}
                      height={logo.image!.height ?? 32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {logo.company && (
                    <span className="text-brand-ink text-sm font-medium whitespace-nowrap">
                      {logo.company}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
