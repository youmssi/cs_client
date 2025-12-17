"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Navbar as NavbarType } from '@/types';
import { getStrapiMediaUrl } from '@/lib/media.strapi';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {
  navbar: NavbarType;
}

export function Navbar({ navbar }: Readonly<NavbarProps>) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoUrl = navbar.logo?.image?.url ? getStrapiMediaUrl(navbar.logo.image.url) : null;
  const brandName = navbar.logo?.company ?? 'Brillance';
  const leftItems = navbar.left_navbar_items ?? [];
  const rightItems = navbar.right_navbar_items ?? [];

  return (
    <ResizableNavbar className="w-full bg-transparent">
      <NavBody className="max-w-[1060px] text-[#37322f]">
        <div className="mx-auto w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden flex justify-between items-center relative z-30">
          <div className="flex items-center">
            <div className="flex items-center">
              <NavbarLogo logo={navbar.logo} />
            </div>
            <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 hidden md:flex">
              <NavItems
                items={navItems}
                className="flex flex-row gap-3 md:gap-4"
                linkClassName="text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {navbar.right_navbar_items?.map((button) => (
              <Button
                key={`${button.id}`}
                variant={buttonVariantMap[button.variant || 'primary'] || 'default'}
                asChild
              >
                <Link href={button.URL} target={button.target}>{button.text}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <MobileNav className="bg-[#F7F5F3]">
        <MobileNavHeader>
          <NavbarLogo logo={navbar.logo} />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          className="bg-[#F7F5F3] border-[#37322f]/10"
        >
          {navItems.map((item) => (
            <Link
              key={`mobile-link-${item.name}-${item.link}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-[#37322f]"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full flex-col gap-4">
            {navbar.right_navbar_items?.map((button) => (
              <Button
                key={`${button.id}`}
                variant={buttonVariantMap[button.variant || 'primary'] || 'default'}
                asChild
              >
                {item.text ?? ''}
              </Link>
            ))}
            <div className="pt-2">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
