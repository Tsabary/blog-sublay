"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@replyke/react-js";
import { useTheme } from "next-themes";
import { HeaderMenu } from "./HeaderMenu";
import AvatarDropdown from "./AvatarDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.webp";
import logoR from "@/assets/logo-r.webp";
import logoWhite from "@/assets/logo-white.webp";
import logoRwhite from "@/assets/logo-r-white.webp";

function Header() {
  const { user } = useUser();
  const { theme } = useTheme();
  return (
    <header className="fixed top-6 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
      <div className="flex items-center gap-6 mx-auto max-w-6xl">
        <Link href="https://replyke.com" className="flex gap-2 items-end">
          <Image
            src={theme === "dark" ? logoWhite : logo}
            alt="logo"
            className="w-auto h-8 shrink-0 hidden lg:block"
          />
          <Image
            src={theme === "dark" ? logoRwhite : logoR}
            alt="logo-mini"
            className="w-auto h-8 shrink-0 block lg:hidden"
          />
        </Link>
        <div className="flex-1">
          <div className="hidden md:block">
            <HeaderMenu />
          </div>
        </div>

        {user && ["admin", "editor"].includes(user.role) && (
          <Link href="/create-post" className="text-sm hidden md:block">
            + Create Post
          </Link>
        )}

        <ThemeToggle />
        <AvatarDropdown />
      </div>
    </header>
  );
}

export default Header;
