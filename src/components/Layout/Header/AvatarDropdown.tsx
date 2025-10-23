"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, useAuth as useAuthReplyke } from "@replyke/react-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import ShinyButton from "./ShinyButton";
import { AuthDialog } from "../../AuthDialog";
import useAuth from "../../../hooks/useAuth";

function AvatarDropdown() {
  const { signOut } = useAuth();
  const { signOut: signOutReplyke } = useAuthReplyke();

  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user)
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          className="bg-rose-600 hover:bg-rose-500 border-4 border-rose-400 transition-colors duration-300 px-2.5 py-1.5 rounded-xl cursor-pointer"
        >
          <ShinyButton
            text="Get Started"
            disabled={false}
            speed={3}
            className="font-semibold whitespace-nowrap text-white"
          />
        </Button>
        <AuthDialog open={open} setOpen={setOpen} />
      </>
    );

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
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuItem onClick={() => navigate("/")}>
          New Style
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/styles")}>
          My Styles
        </DropdownMenuItem> */}

        <p className="text-xs text-gray-400 p-2.5">{user.email}</p>

        {user && ["admin", "editor"].includes(user.role) && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/create-post">Create post</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer" asChild>
          <a href="https://dash.replyke.com">Go to Dashboard</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut?.();
            signOutReplyke();
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
