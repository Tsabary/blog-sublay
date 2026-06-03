"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Entity, useEntityList } from "@sublay/react-js";
import { MessageCircleIcon } from "lucide-react";
import ReactionSummary from "../article/ReactionSummary";
import calculateReadingTimeFromMarkdown from "../../helpers/calculateReadingTimeFromMarkdown";
import { formatDate2 } from "../../lib/time-formatters";
import UserAvatar from "../Layout/Header/UserAvatar";
import { getArticlePath } from "../../helpers/getArticlePath";

function FeaturedArticle() {
  const { entities, loading } = useEntityList({ listId: "latest-articles" });
  const article: Entity | undefined = entities?.[0];
  const hasNoArticles =
    entities !== undefined && entities.length === 0 && !loading;

  // Track when the actual <Image> has finished loading
  const [imgLoaded, setImgLoaded] = useState(false);

  const path = article
    ? getArticlePath({
        title: article.title,
        shortId: article.shortId,
      })
    : "";

  const image = article?.attachments[0]?.publicPath ?? "/placeholder.svg";

  return (
    <section className="w-full bg-background">
      <div className="w-full">
        {hasNoArticles ? (
          <div className="flex flex-col items-center justify-center text-center py-28 space-y-4">
            <div className="text-6xl">📝</div>
            <h2 className="text-3xl font-bold tracking-tight">
              No Articles Yet
            </h2>
            <p className="text-muted-foreground max-w-md text-lg">
              This blog doesn't have any articles yet. Create the first article
              to get started!
            </p>
          </div>
        ) : (
          <Link href={path} className="group block">
            <div className="flex flex-col">
              {/* Image Container */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl md:rounded-xl">
                {/* Image */}
                {(loading || !imgLoaded) && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}

                {!loading && image && (
                  <Image
                    src={image}
                    alt={article.title || "Cover image"}
                    width={1400}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="empty"
                    onLoad={() => setImgLoaded(true)}
                  />
                )}

                {/* Gradient Overlay - Only on desktop */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content Overlay - Only on desktop */}
                <div className="hidden md:flex absolute inset-0 flex-col justify-end p-6 md:p-10 lg:p-12">
                  <div className="max-w-4xl space-y-4">
                    {/* Category Badge */}
                    {loading ? (
                      <div className="h-6 w-24 rounded bg-white/20 animate-pulse" />
                    ) : (
                      <div className="inline-block rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-gray-900">
                        {article.metadata.category}
                      </div>
                    )}

                    {/* Title */}
                    {loading ? (
                      <div className="h-10 w-3/4 rounded bg-white/20 animate-pulse" />
                    ) : (
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors leading-tight">
                        {article.title}
                      </h1>
                    )}

                    {/* Excerpt */}
                    {loading ? (
                      <div className="h-4 w-2/3 rounded bg-white/20 animate-pulse" />
                    ) : (
                      <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-2 max-w-3xl">
                        {article.metadata.excerpt}
                      </p>
                    )}

                    {/* Author & Metadata */}
                    <div className="flex items-center gap-4 pt-2">
                      {loading ? (
                        <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
                      ) : (
                        <UserAvatar user={article.user!} />
                      )}
                      <div className="flex items-center gap-4 flex-wrap">
                        {loading ? (
                          <>
                            <div className="h-4 w-24 rounded bg-white/20 animate-pulse" />
                            <div className="h-4 w-32 rounded bg-white/20 animate-pulse" />
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-white">
                              {article.user?.name || "Author"}
                            </p>
                            <p className="text-sm text-white/80">
                              {formatDate2(new Date(article.createdAt))} ·{" "}
                              {calculateReadingTimeFromMarkdown(
                                article.content || ""
                              )}{" "}
                              min read
                            </p>
                            <div className="flex items-center gap-3">
                              <ReactionSummary reactionCounts={article.reactionCounts} className="text-white/80" textClassName="text-white/80" />
                              <div className="flex items-center gap-1">
                                <MessageCircleIcon
                                  className="size-4 text-white/80"
                                  fill="currentColor"
                                />
                                <span className="text-sm text-white/80">
                                  {article.repliesCount}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Content Below Image - All content separated */}
              <div className="md:hidden bg-card border border-t-0 rounded-b-xl p-5 space-y-4">
                {/* Category Badge + Stats */}
                <div className="flex items-center justify-between">
                  {loading ? (
                    <div className="h-6 w-24 rounded bg-muted animate-pulse" />
                  ) : (
                    <div className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {article.metadata.category}
                    </div>
                  )}
                  {!loading && (
                    <div className="flex items-center gap-3">
                      <ReactionSummary reactionCounts={article.reactionCounts} />
                      <div className="flex items-center gap-1">
                        <MessageCircleIcon
                          className="size-4 text-muted-foreground"
                          fill="currentColor"
                        />
                        <span className="text-xs text-muted-foreground">
                          {article.repliesCount}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title */}
                {loading ? (
                  <div className="h-8 w-full rounded bg-muted animate-pulse" />
                ) : (
                  <h1 className="text-2xl font-bold tracking-tight leading-tight">
                    {article.title}
                  </h1>
                )}

                {/* Excerpt */}
                {loading ? (
                  <div className="h-4 w-full rounded bg-muted animate-pulse" />
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {article.metadata.excerpt}
                  </p>
                )}

                {/* Author & Metadata */}
                <div className="flex items-center gap-3 pt-2">
                  {loading ? (
                    <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                  ) : (
                    <UserAvatar user={article.user!} />
                  )}
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    {loading ? (
                      <>
                        <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                        <div className="h-3 w-36 rounded bg-muted animate-pulse" />
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium truncate">
                          {article.user!.name || "Author"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate2(new Date(article.createdAt))} ·{" "}
                          {calculateReadingTimeFromMarkdown(
                            article.content || ""
                          )}{" "}
                          min read
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}

export default FeaturedArticle;
