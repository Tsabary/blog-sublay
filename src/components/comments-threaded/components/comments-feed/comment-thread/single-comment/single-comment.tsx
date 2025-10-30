import { useState } from "react";
import {
  Comment as CommentType,
  getUserName,
  useCommentSection,
  useUser,
} from "@replyke/react-js";
import {
  parseContentWithMentions,
  UserAvatar,
} from "@replyke/ui-core-react-js";
import VoteButtons from "./vote-buttons";
import ActionMenu from "../action-menu";
import NewReplyForm from "../new-reply-form";
import ToggleRepliesVisibilty from "./toggle-replies-visibility";
import IndentationThreadingLines from "./indentation-threading-lines";
import ReplyButtonAndInfo from "./reply-button-and-info";
import { cn } from "@/lib/utils";

interface SingleCommentProps {
  comment: CommentType;
  depth: number;
  hasReplies: boolean;
  isCollapsed: boolean;
  replyCount: number;
  isLastReply?: boolean;
  onToggleCollapse: () => void;
}

function SingleComment({
  comment: commentFromSection,
  depth,
  hasReplies,
  isCollapsed,
  replyCount,
  isLastReply = false,
  onToggleCollapse,
}: SingleCommentProps) {
  const { user } = useUser();
  const { callbacks, highlightedComment } = useCommentSection();
  const [comment, setComment] = useState(commentFromSection);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const maxDepth = 6; // Limit visual nesting depth
  const actualDepth = Math.min(depth, maxDepth);

  // Calculate progressive indentation using inline styles for reliability
  const indentationPx = actualDepth * 24; // 24px per level

  return (
    <div
      className={cn(
        "relative",
        highlightedComment?.comment.id === comment.id &&
          "bg-blue-100 dark:bg-blue-900"
      )}
      style={{
        // 🎨 CUSTOMIZATION: Progressive indentation (dynamic)
        marginLeft: `${indentationPx}px`,
      }}
    >
      {/* Threading lines - positioned behind avatars, relative to indentation */}
      {actualDepth > 0 && (
        <IndentationThreadingLines isLastReply={isLastReply} />
      )}

      <div
        className="py-2 rounded-md transition-colors duration-150"
        // 🎨 CUSTOMIZATION: Spacing
      >
        <div className="flex">
          {/* Avatar positioned for threading line connection with top margin */}
          <div
            className="flex-shrink-0 mr-3 relative mt-1"
            // 🎨 CUSTOMIZATION: Spacing
          >
            <div className="relative z-10">
              <UserAvatar
                user={comment.user}
                // 🎨 CUSTOMIZATION: Avatar styling (Default: 24px)
                borderRadius={24}
                size={24}
              />
            </div>
            {/* Vertical line extending down from this comment's avatar when it has replies */}
            {hasReplies && !isCollapsed && (
              <div
                className="absolute w-px bg-border z-0"
                style={{
                  // 🎨 CUSTOMIZATION: Threading line position
                  left: "50%",
                  top: "20px",
                  height: "calc(100% + 10px)",
                }}
              ></div>
            )}
          </div>

          {/* Comment content area */}
          <div className="flex-1 min-w-0">
            <div
              className="flex items-center justify-between mb-1"
              // 🎨 CUSTOMIZATION: Spacing
            >
              <div
                className="flex items-center gap-2 text-xs text-muted-foreground"
                // 🎨 CUSTOMIZATION: Typography and spacing
              >
                <span
                  className="font-medium text-xs text-foreground"
                  // 🎨 CUSTOMIZATION: Author name styling
                >
                  {getUserName(comment.user)}
                </span>
                <span className="text-muted-foreground">•</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                {isCollapsed && hasReplies && (
                  <span className="text-blue-500 dark:text-blue-400 text-xs">
                    ({replyCount} {replyCount === 1 ? "reply" : "replies"})
                  </span>
                )}
                {hasReplies && (
                  <ToggleRepliesVisibilty
                    isCollapsed={isCollapsed}
                    onToggleCollapse={onToggleCollapse}
                  />
                )}
              </div>
              <ActionMenu comment={comment} />
            </div>

            {!isCollapsed && (
              <>
                {comment.content && (
                  <p
                    className="text-xs text-foreground mb-3 leading-relaxed"
                    // 🎨 CUSTOMIZATION: Comment body typography
                  >
                    {parseContentWithMentions(
                      comment.content,
                      comment.mentions,
                      user?.id,
                      callbacks?.currentUserClickCallback,
                      callbacks?.otherUserClickCallback
                    )}
                  </p>
                )}

                {comment.gif && (
                  <img
                    src={comment.gif.gifUrl}
                    alt={comment.gif.altText}
                    className="rounded overflow-hidden object-cover mb-3"
                    style={{
                      // 🎨 CUSTOMIZATION: GIF dimensions (dynamic based on aspect ratio)
                      width:
                        comment.gif.aspectRatio > 1
                          ? 200
                          : 200 * comment.gif.aspectRatio,
                      height:
                        comment.gif.aspectRatio < 1
                          ? 200
                          : 200 / comment.gif.aspectRatio,
                    }}
                  />
                )}

                <div
                  className="flex items-center justify-between"
                  // 🎨 CUSTOMIZATION: Actions layout
                >
                  <ReplyButtonAndInfo
                    hasReplies={hasReplies}
                    replyCount={replyCount}
                    setShowReplyForm={setShowReplyForm}
                  />
                  {/* Vote buttons inline with reply options */}
                  <div className="flex-shrink-0">
                    <VoteButtons
                      comment={comment}
                      setComment={setComment}
                      size="small"
                    />
                  </div>
                </div>

                {/* Reply form */}
                {showReplyForm && (
                  <NewReplyForm
                    comment={comment}
                    setShowReplyForm={setShowReplyForm}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
