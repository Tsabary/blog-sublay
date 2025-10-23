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

export function HeaderMenu() {
  return (
    <NavigationMenu className="text-foreground">
      <NavigationMenuList>
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
            <a href="https://support.replyke.com">Support</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="bg-transparent px-2 py-1 lg:px-4 lg:py-2">
            Repositories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-[400px] md:w-[500px]">
            <ListItem
              title="React Clients"
              href="https://github.com/replyke/monorepo"
            >
              Complete client-side implementation for React and React Native
              applications. Build engaging social features with ready-to-use
              components.
            </ListItem>
            <ListItem
              title="Express Server"
              href="https://github.com/replyke/express"
            >
              Backend server implementation using Express.js. Handles
              authentication, data management, and API endpoints for Replyke
              integrations.
            </ListItem>
            <ListItem
              title="LaunchKit"
              href="https://github.com/replyke/launch-kit"
            >
              Three complete, ready-to-deploy applications that cover essential
              SaaS needs: Blog, Roadmap and Support. Clone and launch your SaaS
              quickly.
            </ListItem>
          </NavigationMenuContent>
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
