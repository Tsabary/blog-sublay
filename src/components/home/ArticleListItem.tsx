"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { Entity } from "@replyke/react-js";
import { formatDate2 } from "../../lib/time-formatters";
import calculateReadingTimeFromMarkdown from "../../helpers/calculateReadingTimeFromMarkdown";
import { getArticlePath } from "../../helpers/getArticlePath";

function ArticleListItem({ article }: { article: Entity }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const path = getArticlePath({
    title: article.title,
    shortId: article.shortId,
  });

  const image = article.attachments?.[0]?.publicPath ?? "/placeholder.svg";

  return (
    <Link href={path} className="group">
      <article className="rounded-lg border bg-card hover:shadow-md transition-all overflow-hidden">
        {/* Mobile: Compact overlay layout */}
        <div className="md:hidden relative w-full aspect-[16/9] overflow-hidden">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <Image
            src={image}
            alt={article.title || "Cover image"}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onLoadingComplete={() => setImgLoaded(true)}
            placeholder="empty"
          />

          {/* Gradient overlay for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content overlay for mobile */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className="space-y-2">
              {/* Category and date */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-gray-900">
                  {article.metadata.category}
                </span>
                <span className="text-xs text-white/80">
                  {formatDate2(new Date(article.createdAt))} ·{" "}
                  {calculateReadingTimeFromMarkdown(article.content || "")} min
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold line-clamp-2 text-white group-hover:text-white/90 transition-colors leading-tight">
                {article.title}
              </h3>

              {/* Author and stats */}
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-xs font-medium truncate">
                  {article.user?.name || "Author"}
                </span>
                <span className="text-white/60">·</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <HeartIcon className="size-3 text-white/70" fill="rgba(255,255,255,0.7)" />
                    <span className="text-xs">{article.upvotes.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircleIcon className="size-3 text-white/70" fill="rgba(255,255,255,0.7)" />
                    <span className="text-xs">{article.repliesCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden md:flex gap-0 min-h-[180px]">
          {/* Thumbnail */}
          <div className="relative w-48 flex-shrink-0 overflow-hidden">
            {!imgLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <Image
              src={image}
              alt={article.title || "Cover image"}
              width={192}
              height={180}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onLoadingComplete={() => setImgLoaded(true)}
              placeholder="empty"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between p-5">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="inline-block rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                  {article.metadata.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate2(new Date(article.createdAt))} ·{" "}
                  {calculateReadingTimeFromMarkdown(article.content || "")} min
                </span>
              </div>
              <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-3">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {article.metadata.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">
                  {article.user?.name || "Author"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <HeartIcon className="size-3.5 text-gray-400" fill="#9ca3af" />
                  <span className="text-xs text-gray-400">
                    {article.upvotes.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircleIcon
                    className="size-3.5 text-gray-400"
                    fill="#9ca3af"
                  />
                  <span className="text-xs text-gray-400">
                    {article.repliesCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ArticleListItem;
