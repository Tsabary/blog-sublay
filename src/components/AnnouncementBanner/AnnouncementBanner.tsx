"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface AnnouncementBannerProps {
  onDismiss?: () => void;
}

export function AnnouncementBanner({ onDismiss }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-30 w-full bg-rose-600 text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-center gap-2 text-center">
      <span>
        This blog is implemented with Replyke v7.{" "}
        <Link
          href="https://github.com/Tsabary/blog-replyke"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 font-medium hover:text-white/80 transition-colors"
        >
          View the repo
        </Link>
      </span>
      <button
        onClick={() => { setDismissed(true); onDismiss?.(); }}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
