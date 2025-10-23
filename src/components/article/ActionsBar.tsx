"use client";

import React, { useState } from "react";
import { EntityProvider, useEntity, useUser } from "@replyke/react-js";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { MessageCircleIcon, Share2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { ShareButton } from "./ShareButton";
import { AdminOptions } from "./AdminOptions";
import { Button } from "../ui/button";
import DiscussionSheet from "./DiscussionSheet";

const AnimatedHeartButton = dynamic(() => import("./AnimatedHeartButton"), {
  ssr: false,
});

function InnerActionsBar() {
  const { user } = useUser();

  const {
    entity: article,
    userUpvotedEntity,
    upvoteEntity,
    removeEntityUpvote,
  } = useEntity();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLike = () => {
    if (!user) {
      toast("Please log in first");
      return;
    }

    if (userUpvotedEntity) {
      removeEntityUpvote?.();
    } else {
      upvoteEntity?.();
    }
  };

  return (
    <>
      <DiscussionSheet
        isSheetOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
      <div className="border-t border-b flex py-1">
        <div className="flex items-center gap-1 mr-4">
          <AnimatedHeartButton
            liked={!!userUpvotedEntity}
            onClick={handleLike}
          />

          <span className="text-sm text-gray-400">
            {article?.upvotes.length}
          </span>
        </div>
        <button
          onClick={() => setIsSheetOpen(true)}
          className="flex items-center gap-1"
        >
          <MessageCircleIcon className="size-5 text-gray-400" />
          <span className="text-sm text-gray-400">{article?.repliesCount}</span>
        </button>
        <div className="flex-1" />
        {user && ["admin", "editor"].includes(user.role) && <AdminOptions />}
        <ShareButton>
          <Button variant="ghost" size="icon">
            <Share2Icon className="size-5 text-gray-400" />
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
