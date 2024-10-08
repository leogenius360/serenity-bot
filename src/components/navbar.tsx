"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  Button,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import clsx from "clsx";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { SingleThemeSwitch } from "./theme-switch";
import { SupportButton } from "./buttons";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { UserProfile } from "@/components/user_profile";
import { useAuth } from "@/auth/provider";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const AuthComponentsMounter = dynamic(() =>
    import("@/auth/components").then((mod) => mod.AuthComponentsMounter),
  );

  const { user } = useAuth();

  return (
    <NextUINavbar
      isBordered
      maxWidth="2xl"
      className="border-b-1 border-emerald-100 dark:border-default shadow-md shadow-emerald-100 dark:shadow-none"
      classNames={{ wrapper: "px-2 lg:px-6" }}
    >
      <NavbarContent className="gap-1">
        <Dropdown
          showArrow
          placement="bottom-start"
          offset={16}
          crossOffset={-20}
          radius="sm"
          shadow="md"
          isOpen={isMenuOpen}
          classNames={{ trigger: "md:hidden" }}
          onOpenChange={setIsMenuOpen}
        >
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light" aria-label="Menu">
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Menu">
              {siteConfig.navItems.map((item) => (
                <DropdownItem key={item.label}>
                  <NextLink href={item.href}>{item.label}</NextLink>
                </DropdownItem>
              ))}
            </DropdownSection>

            <DropdownSection className="mb-0">
              <DropdownItem>
                <SupportButton />
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        <NavbarBrand className="font-bold text-sm lg:text-base">
          <NextLink
            className="flex justify-start items-center gap-0 md:gap-1"
            href="/"
          >
            <Logo />
            <p className="" aria-label="Genius Tech Space">
              {siteConfig.shortName}
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* navItems */}
      <NavbarContent className="hidden md:flex gap-3 lg:ms-5">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                "text-sm hover:shadow-emerald-400 dark:hover:shadow-slate-500 rounded px-2 py-1 shadow-sm",
                {
                  ["shadow-emerald-400 dark:shadow-slate-500"]:
                    item.href === pathname,
                },
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* End/Left side navItems */}
      <NavbarContent className="gap-5 md:gap-5" justify="end">
        <button type="button" aria-label="theme" className="w-4 h-7">
          <SingleThemeSwitch />
        </button>

        {user ? <UserProfile user={user} /> : <AuthComponentsMounter />}
        <div className="hidden md:flex">
          <SupportButton />
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
};
