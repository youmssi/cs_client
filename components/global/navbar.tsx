import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getStrapiMediaUrl } from '@/lib/utils/media';
import type { Navbar as NavbarType } from '@/types';
import Image from 'next/image';

interface NavbarProps {
  navbar: NavbarType;
}

export function Navbar({ navbar }: Readonly<NavbarProps>) {
  const logoUrl = navbar.logo?.image
    ? getStrapiMediaUrl(navbar.logo.image.url)
    : null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={navbar.logo?.company || 'Logo'}
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              ) : (
                <span className="text-xl font-bold">MRVIN100</span>
              )}
            </Link>
          </div>

          {/* Left Nav Items */}
          {navbar.left_navbar_items && navbar.left_navbar_items.length > 0 && (
            <div className="hidden md:flex items-center space-x-6">
              {navbar.left_navbar_items.map((item, index) => (
                <Link
                  key={index}
                  href={item.URL}
                  target={item.target || '_self'}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          )}

          {/* Right Nav Items */}
          {navbar.right_navbar_items && navbar.right_navbar_items.length > 0 && (
            <div className="flex items-center space-x-2">
              {navbar.right_navbar_items.map((item, index) => {
                const buttonVariantMap = {
                  simple: 'ghost' as const,
                  outline: 'outline' as const,
                  primary: 'default' as const,
                  muted: 'secondary' as const,
                };

                return (
                  <Button
                    key={index}
                    asChild
                    variant={item.variant ? buttonVariantMap[item.variant] : 'default'}
                  >
                    <Link
                      href={item.URL}
                      target={item.target ?? '_self'}
                      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                    >
                      {item.text}
                    </Link>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

