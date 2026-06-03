"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useEntityList } from "@sublay/react-js";
import { TrendingUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticlePath } from "../../helpers/getArticlePath";

export function TrendingWidget() {
  const { entities, fetchEntities, loading } = useEntityList({
    listId: "trending-articles-widget",
  });

  useEffect(() => {
    fetchEntities(
      {},
      { sortBy: "hot" },
      { sourceId: "blog", limit: 5, include: ["files", "saved", "user"] },
    );
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUpIcon className="w-4 h-4 text-primary" />
          Trending This Week
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="h-3.5 w-full rounded bg-muted animate-pulse" />
              <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
            </div>
          ))
        ) : !entities?.length ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No trending articles yet
          </p>
        ) : (
          entities.map((article, idx) => {
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
                  <span className="text-lg font-bold text-muted-foreground/30 leading-none pt-0.5">
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
          })
        )}
      </CardContent>
    </Card>
  );
}
