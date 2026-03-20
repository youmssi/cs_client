import type { Navbar as NavbarType } from '@/types';

import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { LocaleLink } from "@/components/locale-link";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";

interface NavbarProps {
  navbar: NavbarType;
}

export function Navbar({ navbar }: Readonly<NavbarProps>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const buttonVariantMap: Record<
    string,
    "default" | "outline" | "ghost" | "destructive" | "secondary" | "link"
  > = {
    default: "default",
    outline: "outline",
    ghost: "ghost",
    destructive: "destructive",
    secondary: "secondary",
    link: "link",
  };

  return (
    <ResizableNavbar className="w-full bg-transparent">
      <NavBody className="max-w-[1060px] text-[#37322f]">
        <div className="mx-auto w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[480px] lg:w-[480px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 pr-2 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden flex justify-between items-center relative z-30">
          <NavbarLogo logo={navbar.logo} />
          <div className="flex items-center gap-2 sm:gap-3">
            {navbar.right_navbar_items?.map((button) => (
              <Button
                key={button.id}
                variant={button.variant ? buttonVariantMap[button.variant] ?? "default" : "default"}
                asChild
              >
                <LocaleLink href={button.URL ?? "#"} target={button.target ?? "_self"}>
                  {button.text}
                </LocaleLink>
              </Button>
            ))}
            <LocaleSwitcher className="h-9 px-3 rounded-md justify-center text-xs font-medium" />
          </div>
        </div>
      </NavBody>

      <MobileNav className="bg-[#F7F5F3]">
        <MobileNavHeader>
          <NavbarLogo logo={navbar.logo} />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} className="bg-[#F7F5F3] border-[#37322f]/10">
          <div className="flex w-full flex-col gap-4">
            {navbar.right_navbar_items?.map((button) => (
              <Button
                key={button.id}
                variant={button.variant ? buttonVariantMap[button.variant] ?? "default" : "default"}
                asChild
              >
                <LocaleLink
                  href={button.URL ?? "#"}
                  target={button.target ?? "_self"}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {button.text}
                </LocaleLink>
              </Button>
            ))}
            <div className="w-full">
              <LocaleSwitcher className="w-full" />
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
