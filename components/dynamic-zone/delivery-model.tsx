import {
  Cloud,
  Server,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import type { DeliveryModelBlock } from '@/types';
import { SectionHeader } from '@/components/global/section-header';

const ICON_MAP: Record<string, LucideIcon> = {
  cloud: Cloud,
  server: Server,
  layers: Layers,
};

export function DeliveryModel({ header_section, modes }: Readonly<DeliveryModelBlock>) {
  if (!modes || modes.length === 0) return null;

  return (
    <section className="w-full flex justify-center items-start border-b border-brand-ink/12">
      <div className="flex-1 px-4 md:px-12 lg:px-24 py-16 md:py-20 flex flex-col items-center gap-10 md:gap-14">
        <SectionHeader
          header={header_section}
          defaultHeading="Flexible deployment. No compromises."
          defaultSubHeading="Every platform ships in the model that matches your infrastructure and compliance requirements."
        />

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border">
          {modes.map((mode) => {
            const Icon = mode.icon_name ? ICON_MAP[mode.icon_name] : null;
            return (
              <div
                key={mode.id}
                className="bg-brand-surface-raised p-8 flex flex-col gap-3"
              >
                {Icon && (
                  <div className="w-8 h-8 flex items-center justify-center text-brand-ink">
                    <Icon className="w-6 h-6" />
                  </div>
                )}

                {mode.badge && (
                  <span className="w-fit px-2 py-0.5 border border-brand-border text-xs font-medium text-brand-ink/60 rounded-sm">
                    {mode.badge}
                  </span>
                )}

                {mode.title && (
                  <h3 className="text-brand-dark text-base font-semibold mt-1">
                    {mode.title}
                  </h3>
                )}

                {mode.description && (
                  <p className="text-brand-text text-sm leading-6">
                    {mode.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
