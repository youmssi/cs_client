import Link from 'next/link';

import { getStrapiMediaUrl } from '@/lib/utils/media';
import type { Footer as FooterType } from '@/types';
import Image from 'next/image';

interface FooterProps {
  footer: FooterType;
}

export function Footer({ footer }: Readonly<FooterProps>) {
  const logoUrl = footer.logo?.image
    ? getStrapiMediaUrl(footer.logo.image.url)
    : null;

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={footer.logo?.company || 'Logo'}
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            )}
            {footer.description && (
              <p className="text-sm text-muted-foreground">{footer.description}</p>
            )}
          </div>

          {/* Internal Links */}
          {footer.internal_links && footer.internal_links.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footer.internal_links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.URL}
                      target={link.target || '_self'}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Policy Links */}
          {footer.policy_links && footer.policy_links.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footer.policy_links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.URL}
                      target={link.target || '_self'}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Media Links */}
          {footer.social_media_links && footer.social_media_links.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                {footer.social_media_links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.URL}
                      target={link.target || '_blank'}
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center space-y-2">
          {footer.copyright && (
            <p className="text-sm text-muted-foreground">{footer.copyright}</p>
          )}
          {footer.designed_developed_by && (
            <p className="text-xs text-muted-foreground">
              {footer.designed_developed_by}
            </p>
          )}
          {footer.built_with && (
            <p className="text-xs text-muted-foreground">{footer.built_with}</p>
          )}
        </div>
      </div>
    </footer>
  );
}

