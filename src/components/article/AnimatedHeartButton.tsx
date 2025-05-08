"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export default function AnimatedHeartButton({
  liked,
  onClick,
  size = 20,
}: {
  liked: boolean;
  onClick: () => void;
  size?: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer"
      aria-label="Like"
    >
      <motion.div
        key={liked ? "liked" : "unliked"}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <HeartIcon
          fill={liked ? "#ff2056" : "#fff"}
          className={cn(liked ? "text-rose-500" : "text-gray-400")}
          size={size}
        />
      </motion.div>
    </motion.button>
  );
}
