"use client";

import React from "react";
import Link from "next/link";
import { MessageCircleIcon } from "lucide-react";
import UserAvatar from "../Layout/Header/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { Comment, useFetchManyComments } from "@replyke/react-js";
import { getArticlePath } from "../../helpers/getArticlePath";

function RecentActivity() {
  const fetchComments = useFetchManyComments();

  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    // Simulate fetching comments
    const fetchData = async () => {
      // In real implementation, fetch from Replyke API
      const latest = await fetchComments({
        page: 1,
        limit: 5,
        sortBy: "new",
        includeEntity: true,
        sourceId: "blog",
      });

      setComments(latest);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircleIcon className="size-4 text-primary" />
        <h3 className="font-semibold text-base">Recent Activity</h3>
      </div>
      <div className="space-y-3">
        {comments.map((comment) => {
          const path = getArticlePath({
            title: comment.entity!.title,
            shortId: comment.entity!.shortId,
          });

          return (
            <div key={comment.id} className="group">
              <div className="flex gap-2.5">
                <UserAvatar
                  user={{
                    id: comment.user.id,
                    name: comment.user.name,
                    avatar: comment.user.avatar,
                  }}
                  size={28}
                />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xs font-medium">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(comment.createdAt, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {comment.content}
                  </p>
                  <Link
                    href={path}
                    className="text-xs text-primary hover:underline inline-block"
                  >
                    {comment.entity?.title || "View Article"}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;
