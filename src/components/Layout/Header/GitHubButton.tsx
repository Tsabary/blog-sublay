import { useEffect, useState } from "react";
import { StarIcon } from "lucide-react";
import { useTheme } from "next-themes";

function GitHubButton() {
  const { theme } = useTheme();
  const [stars, setStars] = useState(null);

  const isDarkTheme =
    theme === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  useEffect(() => {
    fetch(`https://api.github.com/repos/replyke/monorepo`)
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((err) => console.error("Failed to fetch star count:", err));
  }, []);

  return (
    <a
      href="https://github.com/replyke/monorepo"
      target="_blank"
      className="flex items-center px-1.5 py-1 bg-container rounded-xl cursor-pointer text-sm border-2 border-border text-foreground"
    >
      <img
        src={isDarkTheme ? "/github-white.svg" : "/github.svg"}
        alt="Github icon"
        className="size-6"
      />
      <div className="ml-2 mr-1">{stars}</div>
      <StarIcon className="size-4" fill="#ffb900" />
    </a>
  );
}

export default GitHubButton;
