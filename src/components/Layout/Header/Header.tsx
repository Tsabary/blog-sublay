"use client";

import { HeaderMenu } from "./HeaderMenu";
import AvatarDropdown from "./AvatarDropdown";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@replyke/react-js";

function Header() {
  const { user } = useUser();
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
      <div className="flex items-center gap-6 mx-auto max-w-6xl">
        <Link href="/" className="flex gap-2 items-end">
          <Image
            src="/logo.webp"
            alt="logo"
            className="w-max h-8"
            width={128}
            height={32}
          />
          {/* <span className="font-medium text-sm text-gray-500 mb-0.5">Blog</span> */}
        </Link>
        <div className="flex-1">
          <div className="hidden md:block">
            <HeaderMenu />
          </div>
        </div>

        {user && ["admin", "editor"].includes(user.role) && (
          <Link href="/create-post" className="text-sm">
            + Create Post
          </Link>
        )}

        <AvatarDropdown />
      </div>
    </header>
  );
}

export default Header;
