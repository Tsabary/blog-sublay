"use client";

import { useState } from "react";
import { EntityProvider, useEntity, useUser, useReactionToggle, ReactionType } from "@replyke/react-js";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { MessageCircleIcon, Share2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { ShareButton } from "./ShareButton";
import { AdminOptions } from "./AdminOptions";
import { Button } from "../ui/button";
import DiscussionSheet from "./DiscussionSheet";

const ReactionPicker = dynamic(() => import("./ReactionPicker"), { ssr: false });

function InnerActionsBar() {
  const { user } = useUser();

  const { entity: article } = useEntity();

  const { currentReaction, reactionCounts, toggleReaction } = useReactionToggle({
    targetType: "entity",
    targetId: article?.id,
    initialReaction: article?.userReaction,
    initialReactionCounts: article?.reactionCounts,
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleReact = (reactionType: string) => {
    if (!user) {
      toast("Please log in first");
      return;
    }
    toggleReaction({ reactionType: reactionType as ReactionType });
  };

  return (
    <>
      <DiscussionSheet
        isSheetOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
      <div className="border-t border-b flex items-center gap-2 py-1">
        {/* Left: engagement actions */}
        <div className="flex items-center gap-3">
          <ReactionPicker
            currentReaction={currentReaction}
            reactionCounts={reactionCounts}
            onReact={handleReact}
          />
          <button
            onClick={() => setIsSheetOpen(true)}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors p-2.5"
          >
            <MessageCircleIcon className="size-4.5" />
            <span className="text-sm tabular-nums">{article?.repliesCount ?? 0}</span>
          </button>
        </div>

        <div className="flex-1" />

        {/* Right: admin + share */}
        {user && ["admin", "editor"].includes(user.role) && <AdminOptions />}
        <ShareButton>
          <Button variant="ghost" size="icon">
            <Share2Icon className="size-4.5 text-gray-400" />
          </Button>
        </ShareButton>
      </div>
    </>
  );
}

function ActionsBar() {
  const { slugAndId } = useParams();
  if (typeof slugAndId !== "string") return null;

  const hyphen = slugAndId.lastIndexOf("-");
  if (hyphen < 0) return null;

  const shortId = slugAndId.slice(hyphen + 1);

  return (
    <EntityProvider shortId={shortId}>
      <InnerActionsBar />
    </EntityProvider>
  );
}
export default ActionsBar;
