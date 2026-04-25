import { Entity } from "@replyke/react-js";

const REACTION_EMOJI: Record<string, string> = {
  like: "❤️",
  love: "😍",
  wow: "😮",
  funny: "😂",
};

interface ReactionSummaryProps {
  reactionCounts: Entity["reactionCounts"];
  className?: string;
}

export default function ReactionSummary({
  reactionCounts,
  className = "",
}: ReactionSummaryProps) {
  const counts = reactionCounts ?? {};

  const total = Object.values(counts).reduce<number>((a, b) => a + (b ?? 0), 0);

  const topEmojis = Object.entries(counts)
    .filter(([, v]) => (v ?? 0) > 0)
    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
    .slice(0, 3)
    .map(([type]) => REACTION_EMOJI[type])
    .filter(Boolean);

  if (total === 0) return null;

  return (
    <span className={`flex items-center gap-1 ${className}`}>
      <span className="leading-none">{topEmojis.join("")}</span>
      <span className="text-xs text-muted-foreground">{total} reactions</span>
    </span>
  );
}
