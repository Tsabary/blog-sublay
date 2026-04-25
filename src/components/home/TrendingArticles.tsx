"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useEntityList } from "@replyke/react-js";
import { TrendingUpIcon } from "lucide-react";
import { getArticlePath } from "../../helpers/getArticlePath";

function TrendingArticles() {
  const { entities, fetchEntities, loading } = useEntityList({
    listId: "trending-articles",
  });

  useEffect(() => {
    fetchEntities({}, { sortBy: "hot" }, { sourceId: "blog", limit: 4, include: ["files", "saved", "user"] });
  }, []);

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

  if (!entities?.length) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUpIcon className="size-4 text-primary" />
        <h3 className="font-semibold text-base">Trending</h3>
      </div>
      {entities.map((article, idx) => {
        const path = getArticlePath({
          title: article.title,
          shortId: article.shortId,
        });

        return (
          <Link
            key={article.id}
            href={path}
            className="block group hover:bg-muted/30 rounded-md p-2 -mx-2 transition-colors"
          >
            <div className="flex gap-2.5">
              <span className="text-xl font-bold text-muted-foreground/30 leading-none pt-0.5">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {article.user?.name || "Author"}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default TrendingArticles;
