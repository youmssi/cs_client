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
    <div className="w-full">
      {/* Brillance nav bar sits inside the rail container and overlays a horizontal rule */}
      <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0">
        <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]" />

        <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
          <div className="flex justify-center items-center">
            <div className="flex justify-start items-center">
              <Link href="/" className="flex items-center gap-2">
                {logoUrl ? (
                  <Image src={logoUrl} alt={brandName} width={24} height={24} className="h-6 w-6" />
                ) : null}
                <div className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans">
                  {brandName}
                </div>
              </Link>
            </div>

            <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 hidden sm:flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-4">
              {leftItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.URL ?? '#'}
                  target={item.target ?? '_self'}
                  className="flex justify-start items-center"
                >
                  <div className="flex flex-col justify-center text-[rgba(49,45,43,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans hover:text-[rgba(49,45,43,1)] transition-colors">
                    {item.text ?? ''}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="h-6 sm:h-7 md:h-8 flex justify-start items-center gap-2 sm:gap-3">
            {rightItems.map((button) => (
              <Link
                key={button.id}
                href={button.URL ?? '#'}
                target={button.target ?? '_self'}
                className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)] overflow-hidden rounded-full flex justify-center items-center"
              >
                <div className="flex flex-col justify-center text-[#37322F] text-xs md:text-[13px] font-medium leading-5 font-sans">
                  {button.text ?? ''}
                </div>
              </Link>
            ))}

            {/* Theme + locale toggles (desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              <ModeToggle />
              <LocaleSwitcher />
            </div>

            {/* Simple mobile menu toggle */}
            <button
              type="button"
              className="sm:hidden px-2 py-1 rounded-full border border-[rgba(0,0,0,0.15)] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.08)] text-xs font-medium"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden pt-20 px-4">
          <div className="bg-white border border-[rgba(0,0,0,0.15)] rounded-lg shadow-sm p-4 space-y-3">
            {leftItems.map((item) => (
              <Link
                key={`m-${item.id}`}
                href={item.URL ?? '#'}
                onClick={() => setMobileOpen(false)}
                className="block text-[#37322F] text-sm font-medium"
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
