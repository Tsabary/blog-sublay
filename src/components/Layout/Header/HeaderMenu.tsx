"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const components: {
  title: string;
  href?: string;
  path?: string;
  description: string;
}[] = [
  {
    title: "Comment Section (Web & Mobile)",
    href: "https://replyke.com/comment-section",
    description:
      "A comment section implementation built with ReactJS & TailwindCSS.",
  },
  {
    title: "Roadmap",
    href: "https://replyke.com/roadmap",
    description: "A public roadmap component built with ReactJS & TailwindCSS.",
  },
  {
    title: "Discord Board",
    href: "https://replyke.com/discord-bot",
    description: "Use your Discord server's activity for improved SEO.",
  },
  {
    title: "Community forum",
    href: "https://replyke.com/forum",
    description:
      "A community forum built with ReactJS & Shadcn UI. Supports multiple topics.",
  },
  // {
  //   title: "Social Network App",
  //   href: "https://github.com/replyke/reel-snap",
  //   description: "A social network app built with Expo & NativeWind.",
  // },
];

export function HeaderMenu() {
  return (
    <NavigationMenu className="text-stone-800">
      <NavigationMenuList>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="bg-transparent px-2 py-1 lg:px-4 lg:py-2">
            Ready Apps
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  path={component.path}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={
              navigationMenuTriggerStyle() +
              " bg-transparent px-2 py-1 lg:px-4 lg:py-2"
            }
          >
            <a href="https://discord.com/invite/REKxnCJzPz">Community</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={
              navigationMenuTriggerStyle() +
              " bg-transparent px-2 py-1 lg:px-4 lg:py-2"
            }
          >
            <a href="https://roadmap.replyke.com">Roadmap</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={
              navigationMenuTriggerStyle() +
              " bg-transparent px-2 py-1 lg:px-4 lg:py-2"
            }
          >
            <a href="https://docs.replyke.com">Documentation</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={
              navigationMenuTriggerStyle() +
              " bg-transparent px-2 py-1 lg:px-4 lg:py-2"
            }
          >
            <a href="https://blog.replyke.com">Blog</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { path?: string }
>(({ className, title, children, path, href, ...props }, ref) => {
  const content = (
    <div
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {children}
      </p>
    </div>
  );

  return (
    <li>
      <NavigationMenuLink asChild>
        {path ? (
          <Link href={`/${path}`} passHref legacyBehavior>
            <a ref={ref} {...props}>
              {content}
            </a>
          </Link>
        ) : (
          <a ref={ref} href={href} {...props} rel="noopener noreferrer">
            {content}
          </a>
        )}
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
