"use client";
import { ROUTES } from "@/lib/constants";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import { cn } from "@/lib/utils";
import { Logo } from "@/types";
import { MenuIcon, XIcon } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { LocaleLink } from "@/components/locale-link";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
  linkClassName?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed xl:relative inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        width: visible ? "100%" : "100%",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start bg-transparent px-4 py-3 lg:flex",
        visible && "bg-background/95 backdrop-blur-xs shadow-xs border-b xl:border-none xl:shadow-none xl:backdrop-blur-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, linkClassName }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-foreground",
        className,
      )}
    >
      {items.map((item, idx) => (
        <LocaleLink
          key={`link-${idx}`}
          href={item.link}
          prefetch
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className={cn("relative inline-flex items-center h-9 px-3", linkClassName ?? "text-foreground")}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full bg-muted"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </LocaleLink>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        width: visible ? "100%" : "100%",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-4 py-3 lg:hidden",
        visible && "bg-background/95 backdrop-blur-md shadow-md border-b",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 bg-background px-4 py-8 border shadow-sm",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <XIcon className="text-foreground" onClick={onClick} />
  ) : (
    <MenuIcon className="text-foreground" onClick={onClick} />
  );
};

export const NavbarLogo: React.FC<{ logo: Logo }> = ({ logo }) => {
  return (
    <LocaleLink
      href={ROUTES.HOME}
      prefetch
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-foreground"
    >
      {!logo.image?.url ? (
        <Image
          src={getStrapiMediaUrl(logo.image?.url ?? undefined)}
          alt={logo.company ?? "Company Logo"}
          width={logo.image?.width ?? 100}
          height={logo.image?.height ?? 40}
        />
      ) : (
        <span className="font-bold text-lg text-foreground">{logo.company}</span>
      )}
    </LocaleLink>
  );
};
