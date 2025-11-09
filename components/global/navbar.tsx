import type { Navbar as NavbarType } from '@/types';

import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button"; 

interface NavbarProps {
  navbar: NavbarType;
}

export function Navbar({ navbar }: Readonly<NavbarProps>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = navbar.left_navbar_items?.map(item => ({
    id: item.id,
    name: item.text,
    target: item.target,
    link: item.URL,
    variant: item.variant,
  })) || [];

  const buttonVariantMap: Record<string, 'default' | 'secondary' | 'outline' | 'ghost'> = {
    primary: 'default',
    outline: 'outline',
    simple: 'ghost',
    muted: 'secondary',
  };

  return (
    <ResizableNavbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo logo={navbar.logo} />
        <NavItems items={navItems} />
        <div className="relative z-[70] flex items-center gap-4">
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
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo logo={navbar.logo} />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
        >
          {navItems.map((item) => (
            <Link
              key={`mobile-link-${item.name}-${item.link}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-foreground"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full flex-col gap-4">
            {navbar.right_navbar_items?.map((button) => (
              <Button
                key={`${button.id}`}
                variant={buttonVariantMap[button.variant || 'primary'] || 'default'}
                className="w-full"
                asChild
              >
                <Link href={button.URL} target={button.target} onClick={() => setIsMobileMenuOpen(false)}>
                  {button.text}
                </Link>
              </Button>
            ))}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
