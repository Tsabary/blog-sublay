"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@replyke/react-js";
import { useTheme } from "next-themes";
import AvatarDropdown from "./AvatarDropdown";
import GitHubButton from "./GitHubButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.webp";
import logoR from "@/assets/logo-r.webp";
import logoWhite from "@/assets/logo-white.webp";
import logoRwhite from "@/assets/logo-r-white.webp";

const navLinks = [
  { label: "Docs", href: "https://docs.replyke.com", external: true },
  { label: "Playground", href: "https://play.replyke.com", external: true },
  { label: "Roadmap", href: "https://roadmap.replyke.com", external: true },
];

const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2 group"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl px-6 md:px-8 transition-all duration-300",
            isScrolled &&
              "bg-background/50 max-w-5xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex items-center justify-between py-3 lg:py-4">
            {/* Left: logo + desktop nav */}
            <div className="flex items-center gap-6">
              <Link href="https://replyke.com" aria-label="home" className="flex items-center">
                <Image
                  src={resolvedTheme === "dark" ? logoWhite : logo}
                  alt="logo"
                  className="w-auto h-8 hidden lg:block"
                />
                <Image
                  src={resolvedTheme === "dark" ? logoRwhite : logoR}
                  alt="logo"
                  className="w-auto h-8 block lg:hidden"
                />
              </Link>

              <ul className="hidden lg:flex items-center gap-1 text-sm">
                {navLinks.map(({ label, href, external }) => (
                  <li key={label}>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-lg bg-transparent"
                    >
                      <a
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {label}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: desktop CTAs + mobile hamburger */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-3">
                <ThemeToggle />
                <GitHubButton />
                <AvatarDropdown />
              </div>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative lg:hidden -m-2.5 -mr-4 block cursor-pointer p-2.5"
              >
                <Menu className="group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className="hidden group-data-[state=active]:block lg:hidden -mx-2 bg-background border-b shadow-lg dark:shadow-[0_8px_24px_rgba(255,255,255,0.07)]">
          <div className="px-8 py-5">
            <ul className="space-y-4 text-sm">
              {navLinks.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-muted-foreground hover:text-foreground block duration-150"
                    onClick={() => setMenuState(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://discord.gg/REKxnCJzPz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground block duration-150"
                  onClick={() => setMenuState(false)}
                >
                  Discord
                </a>
              </li>
              {user && ["admin", "editor"].includes(user.role) && (
                <li>
                  <Link
                    href="/create-post"
                    className="text-muted-foreground hover:text-foreground block duration-150"
                    onClick={() => setMenuState(false)}
                  >
                    + Create Post
                  </Link>
                </li>
              )}
              <li>
                <a
                  href="https://dash.replyke.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground block duration-150"
                  onClick={() => setMenuState(false)}
                >
                  {user ? "Dashboard" : "Start for free"}
                </a>
              </li>
            </ul>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
              <div className="-ml-2.5">
                <GitHubButton />
              </div>
              <ThemeToggle showLabel />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
