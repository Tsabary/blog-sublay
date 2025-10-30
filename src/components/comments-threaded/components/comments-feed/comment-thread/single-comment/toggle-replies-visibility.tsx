import { cn } from "@/lib/utils";

function ToggleRepliesVisibilty({
  isCollapsed,
  onToggleCollapse,
}: {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) {
  return (
    <button
      onClick={onToggleCollapse}
      className={cn(
        "ml-1 w-4 h-4",
        "flex items-center justify-center",
        "text-muted-foreground",
        "bg-muted",
        "rounded-sm",
        "transition-all duration-150",
        "text-sm font-bold",
        "cursor-pointer",
        "hover:text-foreground",
        "hover:bg-accent",
        isCollapsed && "border border-border"
      )}
      title={isCollapsed ? "Expand thread" : "Collapse thread"}
    >
      {isCollapsed ? "+" : "−"}
    </button>
  );
}

export default ToggleRepliesVisibilty;
