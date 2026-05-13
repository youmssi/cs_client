import Link from 'next/link';
import { LocaleLink } from '@/components/locale-link';
import type { Footer as FooterType, Link as LinkType, SocialLink as SocialLinkType } from '@/types';

interface FooterProps {
  footer: FooterType;
}

export function Footer({ footer }: Readonly<FooterProps>) {

  const renderSocialIcon = (link: SocialLinkType) => {
    if (link.platform === 'x') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
        </svg>
      );
    }
    if (link.platform === 'linkedin') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" fill="currentColor" />
        </svg>
      );
    }
    if (link.platform === 'discord') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" fill="currentColor" />
        </svg>
      );
    }
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.374-12-12-12z" fill="currentColor" />
      </svg>
    );
  };

  return (
    <footer className="border-t border-brand-ink/12 bg-brand-surface">
      <div className="max-w-[1060px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-brand-dark">
          <div className="h-auto p-4 md:p-8 flex flex-col justify-start items-start gap-8">
            <div className="self-stretch flex justify-start items-center gap-3">
              <div className="text-center text-brand-dark text-xl font-semibold leading-4 font-sans">
                {footer.logo?.company ?? 'Brand'}
              </div>
            </div>
            {footer.description && (
              <div
                className="text-brand-dark/90 text-sm font-medium leading-[18px] font-sans max-w-[220px] sm:max-w-[320px] overflow-hidden"
                style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}
              >
                {footer.description}
              </div>
            )}
            {footer.social_media_links && footer.social_media_links.length > 0 && (
              <div className="flex justify-start items-start gap-4">
                {footer.social_media_links.map((link: SocialLinkType) => (
                  <Link
                    key={link.id}
                    href={link.URL ?? '#'}
                    target={link.target || '_blank'}
                    rel="noopener noreferrer"
                    className="w-6 h-6 relative overflow-hidden text-brand-dark hover:text-brand-ink transition-colors"
                  >
                    <div className="w-6 h-6 left-0 top-0 absolute flex items-center justify-center">
                      {renderSocialIcon(link)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {(footer.cities || footer.contact_email || footer.contact_phones) && (
              <div className="flex flex-col gap-1.5 text-sm">
                {footer.cities && (
                  <span className="text-brand-dark/55 font-medium">{footer.cities}</span>
                )}
                {footer.contact_email && (
                  <a
                    href={`mailto:${footer.contact_email}`}
                    className="text-brand-dark/80 hover:text-brand-ink transition-colors"
                  >
                    {footer.contact_email}
                  </a>
                )}
                {footer.contact_phones && (
                  <span className="text-brand-dark/70">{footer.contact_phones}</span>
                )}
              </div>
            )}
          </div>

          {/* Right-side link groups */}
          <div className="self-stretch p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {footer.internal_links && footer.internal_links.length > 0 && (
              <div>
                <h3 className="self-stretch text-brand-dark/50 text-sm font-medium leading-5 font-sans">Quick Links</h3>
                <ul className="space-y-2 mt-3">
                  {footer.internal_links.map((link: LinkType) => (
                    <li key={link.id}>
                      <LocaleLink
                        href={link.URL ?? '#'}
                        target={link.target || '_self'}
                        className="text-sm text-brand-dark hover:text-brand-ink transition-colors"
                      >
                        {link.text}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {footer.policy_links && footer.policy_links.length > 0 && (
              <div>
                <h3 className="self-stretch text-brand-dark/50 text-sm font-medium leading-5 font-sans">Legal</h3>
                <ul className="space-y-2 mt-3">
                  {footer.policy_links.map((link: LinkType) => (
                    <li key={link.id}>
                      <LocaleLink
                        href={link.URL ?? '#'}
                        target={link.target || '_self'}
                        className="text-sm text-brand-dark hover:text-brand-ink transition-colors"
                      >
                        {link.text}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-brand-ink/12 text-center space-y-2">
          {footer.copyright && (
            <p className="text-sm text-brand-dark/90">{footer.copyright}</p>
          )}
        </div>
      </div>
      {/* Bottom pattern strip */}
      <div className="w-full h-12 relative overflow-hidden border-t border-b border-brand-ink/12">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[300px] h-16 border border-brand-stripe"
                style={{
                  left: `${i * 300 - 600}px`,
                  top: "-120px",
                  transform: "rotate(-45deg)",
                  transformOrigin: "top left",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
