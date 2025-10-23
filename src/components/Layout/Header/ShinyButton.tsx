import { cn } from "@/lib/utils";

interface ShinyButtonProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyButton = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyButtonProps) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={cn("shiny-text", disabled ? "disabled" : "", className)}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyButton;
