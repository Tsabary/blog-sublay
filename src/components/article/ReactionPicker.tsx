"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { ReactionType } from "@sublay/react-js";

const REACTIONS = [
  { type: "like", emoji: "❤️", label: "Like" },
  { type: "love", emoji: "😍", label: "Love" },
  { type: "wow", emoji: "😮", label: "Wow" },
  { type: "funny", emoji: "😂", label: "Funny" },
] as const;

const PARTICLE_COLORS = [
  "#ff2056",
  "#ff6b8a",
  "#ffc0cb",
  "#ff8c69",
  "#ffb347",
  "#ff6347",
];

function ParticleBurst() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 360) / 6;
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 6,
              height: 6,
              background: PARTICLE_COLORS[i],
              top: "50%",
              left: "50%",
            }}
            initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
            animate={{
              x: `calc(-50% + ${Math.cos(rad) * 22}px)`,
              y: `calc(-50% + ${Math.sin(rad) * 22}px)`,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        );
      })}
    </>
  );
}

// Color is inherited from parent so hover classes can control it.
function TriggerEmoji({ reaction }: { reaction: string | null | undefined }) {
  const found = REACTIONS.find((r) => r.type === reaction);
  if (found) return <span className="text-lg leading-none">{found.emoji}</span>;
  return <HeartIcon className="size-5" />;
}

interface ReactionPickerProps {
  currentReaction: ReactionType | null;
  reactionCounts: Partial<Record<string, number>>;
  onReact: (reactionType: ReactionType) => void;
}

export default function ReactionPicker({
  currentReaction,
  reactionCounts,
  onReact,
}: ReactionPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [burst, setBurst] = useState(false);

  const hoverEnterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalCount = Object.values(reactionCounts).reduce<number>(
    (acc, v) => acc + (v ?? 0),
    0,
  );

  const triggerBurst = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
  };

  const clearHoverLeave = () => {
    if (hoverLeaveTimer.current) clearTimeout(hoverLeaveTimer.current);
  };

  const openPicker = () => {
    clearHoverLeave();
    setShowPicker(true);
  };

  const schedulePicker = () => {
    clearHoverLeave();
    hoverEnterTimer.current = setTimeout(openPicker, 400);
  };

  const schedulePop = () => {
    if (hoverEnterTimer.current) clearTimeout(hoverEnterTimer.current);
    hoverLeaveTimer.current = setTimeout(() => setShowPicker(false), 200);
  };

  const onTouchStart = () => {
    longPressTimer.current = setTimeout(() => openPicker(), 350);
  };

  const onTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const handleTriggerClick = () => {
    if (showPicker) {
      setShowPicker(false);
      return;
    }
    const type: ReactionType = currentReaction || "like";
    onReact(type);
    if (!currentReaction) triggerBurst();
  };

  const handlePickerReact = (type: ReactionType) => {
    const isAdding = type !== currentReaction;
    onReact(type);
    if (isAdding) triggerBurst();
    setShowPicker(false);
  };

  return (
    // group/reaction scopes hover so both icon and count darken together
    <div
      className="relative flex items-center gap-1 group/reaction"
      onMouseEnter={schedulePicker}
      onMouseLeave={schedulePop}
    >
      <div className="relative">
        {/* Floating reaction picker */}
        <AnimatePresence>
          {showPicker && (
            <motion.div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex items-center gap-0.5 bg-background border border-border rounded-full shadow-xl px-2 py-1.5 z-50 whitespace-nowrap"
              initial={{ scale: 0.85, opacity: 0, y: 6 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onMouseEnter={clearHoverLeave}
              onMouseLeave={schedulePop}
            >
              {REACTIONS.map(({ type, emoji, label }, i) => (
                <motion.button
                  key={type}
                  aria-label={label}
                  onClick={() => handlePickerReact(type)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: i * 0.04,
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.35, y: -3 }}
                  whileTap={{ scale: 0.85 }}
                  className={`text-2xl leading-none p-1.5 rounded-full cursor-pointer ${
                    currentReaction === type ? "bg-muted" : ""
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger button */}
        <motion.button
          onClick={handleTriggerClick}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchEnd}
          whileTap={{ scale: 0.88 }}
          className="relative cursor-pointer flex items-center justify-center p-2.5 text-gray-400 group-hover/reaction:text-gray-600 transition-colors"
          aria-label={
            currentReaction
              ? `Reacting with ${currentReaction}`
              : "Add reaction"
          }
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentReaction ?? "none"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.2, 1], opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <TriggerEmoji reaction={currentReaction} />
            </motion.span>
          </AnimatePresence>

          <AnimatePresence>
            {burst && <ParticleBurst key="burst" />}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Animated count */}
      <div className="overflow-hidden h-5 flex items-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={totalCount}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="text-sm tabular-nums select-none block text-gray-400 group-hover/reaction:text-gray-600 transition-colors"
          >
            {totalCount}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
