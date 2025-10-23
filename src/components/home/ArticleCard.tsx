"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Entity } from "@replyke/react-js";
import { formatDate2 } from "../../lib/time-formatters";
import calculateReadingTimeFromMarkdown from "../../helpers/calculateReadingTimeFromMarkdown";
import UserAvatar from "../Layout/Header/UserAvatar";
import { getArticlePath } from "../../helpers/getArticlePath";

function ArticleCard({ article }: { article: Entity }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const path = getArticlePath({
    title: article.title,
    shortId: article.shortId,
  });

  const image = article.attachments?.[0]?.publicPath ?? "/placeholder.svg";

  return (
    <Link href={path} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-video w-full overflow-hidden">
          {/* Skeleton shown until image loads */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-md" />
          )}
          <Image
            src={image}
            alt={article.title || "Cover image"}
            width={600}
            height={400}
            className="aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
            onLoadingComplete={() => setImgLoaded(true)}
            placeholder="empty"
          />
        </div>
        <CardHeader>
          <div className="space-y-1.5">
            <CardTitle className="line-clamp-1">{article.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {article.metadata.excerpt}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <UserAvatar user={article.user!} size={24} />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {article.user!.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate2(new Date(article.createdAt))} ·{" "}
                {calculateReadingTimeFromMarkdown(article.content || "")} min
                read
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs">
              {article.metadata.category}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="size-3.5 text-gray-400" fill="#9ca3af" />
            <span className="text-sm text-gray-400">
              {article.upvotes.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircleIcon
              className="size-3.5 text-gray-400"
              fill="#9ca3af"
            />
            <span className="text-sm text-gray-400">
              {article.repliesCount}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ArticleCard;
