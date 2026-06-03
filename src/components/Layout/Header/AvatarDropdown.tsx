"use client";

import Link from "next/link";
import { useAuth as useAuthSublay, useUser } from "@sublay/react-js";
import { LoaderCircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import UserAvatar from "./UserAvatar";
import ShinyButton from "./ShinyButton";

function AvatarDropdown() {
  const { signOut } = useAuth();
  const { signOut: signOutSublay, initialized } = useAuthSublay();
  const { user } = useUser();

  if (!initialized) {
    return (
      <Button variant="outline" size="icon" className="rounded-full" disabled>
        <LoaderCircleIcon className="animate-spin" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Link
        href="https://dash.sublay.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          asChild
          className="bg-rose-600 hover:bg-rose-500 border-4 border-rose-400 transition-colors duration-300 px-2.5 py-1.5 rounded-xl cursor-pointer"
        >
          <ShinyButton
            text="Start for free"
            disabled={false}
            speed={3}
            className="font-semibold whitespace-nowrap text-white"
          />
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full cursor-pointer"
        >
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <p className="text-xs text-muted-foreground p-2.5">{user.email}</p>

        {["admin", "editor"].includes(user.role) && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/create-post">Create post</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer" asChild>
          <a href="https://dash.sublay.io">Go to Dashboard</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut?.();
            signOutSublay?.();
          }}
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropdown;
