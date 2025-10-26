import { useTheme } from "next-themes";

function DiscordButton() {
  const { theme } = useTheme();

  const isDarkTheme =
    theme === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  return (
    <a
      href="https://discord.com/invite/REKxnCJzPz"
      target="_blank"
      className="flex items-center px-1.5 py-1 bg-container rounded-xl cursor-pointer text-sm border-2 border-border text-foreground"
    >
      <img
        src={isDarkTheme ? "/discord-white.svg" : "/discord.svg"}
        alt="Discord icon"
        className="size-6"
      />
      <div className="ml-2 mr-1 hidden md:block">Discord</div>
    </a>
  );
}

export default DiscordButton;
