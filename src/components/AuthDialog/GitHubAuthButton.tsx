import { useTheme } from "next-themes";
import { Button } from "../ui/button";

function GitHubAuthButton() {
  const { theme } = useTheme();

  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const url = BASE_URL + "/internal/auth/github";

  const isDarkTheme =
    theme === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  return (
    <Button variant="outline" type="button" className="w-full" asChild>
      <a href={url}>
        <img
          src={isDarkTheme ? "/github-white.svg" : "/github.svg"}
          className="mr-2 h-4 w-4"
        />
        GitHub
      </a>
    </Button>
  );
}

export default GitHubAuthButton;
