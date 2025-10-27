import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import useAuth from "../../hooks/useAuth";

function GitHubAuthButton() {
  const { theme } = useTheme();
  const { handleGithubLogin } = useAuth();

  const isDarkTheme =
    theme === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={handleGithubLogin}
    >
      <img
        src={isDarkTheme ? "/github-white.svg" : "/github.svg"}
        className="mr-2 h-4 w-4"
      />
      GitHub
    </Button>
  );
}

export default GitHubAuthButton;
