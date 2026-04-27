"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "lucide-react";
import { useTheme } from "next-themes";

function GitHubButton() {
  const { resolvedTheme } = useTheme();
  const [stars, setStars] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/replyke/monorepo")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((err) => console.error("Failed to fetch star count:", err));
  }, []);

  return (
    <a
      href="https://github.com/replyke/monorepo"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
    >
      <img
        src={resolvedTheme === "dark" ? "/github-white.svg" : "/github.svg"}
        alt="Github icon"
        className="size-4 opacity-70"
      />
      <span>{stars}</span>
      <StarIcon className="size-3.5" fill="#ffb900" stroke="none" />
    </a>
  );
}

export default GitHubButton;
