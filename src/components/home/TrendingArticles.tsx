"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useEntityList, Entity } from "@replyke/react-js";
import { TrendingUpIcon } from "lucide-react";
import { getArticlePath } from "../../helpers/getArticlePath";

function TrendingArticles() {
  const { entities, fetchEntities, loading } = useEntityList({
    listId: "trending-articles",
  });

  useEffect(() => {
    fetchEntities({ sortBy: "new" }, { sourceId: "blog", limit: 20 });
  }, []);

  // Sort articles by engagement (upvotes + comments)
  const trendingArticles = useMemo(() => {
    if (!entities) return [];

    return [...entities]
      .sort((a, b) => {
        const engagementA = (a.upvotes?.length || 0) + (a.repliesCount || 0);
        const engagementB = (b.upvotes?.length || 0) + (b.repliesCount || 0);
        return engagementB - engagementA;
      })
      .slice(0, 4);
  }, [entities]);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUpIcon className="size-4" />
          <h3 className="font-semibold text-base">Trending</h3>
        </div>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="h-3.5 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (!trendingArticles.length) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUpIcon className="size-4 text-primary" />
        <h3 className="font-semibold text-base">Trending</h3>
      </div>
      {trendingArticles.map((article, idx) => {
        const path = getArticlePath({
          title: article.title,
          shortId: article.shortId,
        });
        const engagement = (article.upvotes?.length || 0) + (article.repliesCount || 0);

        return (
          <Link
            key={article.id}
            href={path}
            className="block group hover:bg-muted/30 rounded-md p-2 -mx-2 transition-colors"
          >
            <div className="flex gap-2.5">
              <span className="text-xl font-bold text-muted-foreground/30 leading-none pt-0.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {article.user?.name || "Author"}
                  </span>
                  {engagement > 0 && (
                    <>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-xs text-muted-foreground">
                        {engagement} interactions
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default TrendingArticles;
