"use client";

// import { X } from "lucide-react";
// import { useState, useEffect } from "react";

// const BANNER_DISMISSED_KEY = "open-source-banner-dismissed";

export default function OpenSourceBanner() {
  // const [isDismissed, setIsDismissed] = useState(true); // Start as true to avoid flash

  // useEffect(() => {
  //   const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
  //   setIsDismissed(dismissed === "true");
  // }, []);

  // const handleDismiss = () => {
  //   localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  //   setIsDismissed(true);
  // };

  // if (isDismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-6 bg-muted border-b flex items-center justify-center px-4 text-xs z-[60]">
      <div className="flex items-center gap-2">
        <span className="text-orange-500">This blog repo is open source</span>
        <a
          href="https://github.com/replyke/launch-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:underline font-medium"
        >
          View on GitHub →
        </a>
      </div>
      {/* <button
        onClick={handleDismiss}
        className="absolute right-2 p-1 hover:bg-muted rounded transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-3 w-3" />
      </button> */}
    </div>
  );
}
