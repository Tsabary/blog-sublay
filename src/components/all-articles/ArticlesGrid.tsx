"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useEntityList } from "@replyke/react-js";
import ArticleCard from "../home/ArticleCard";
import { LoaderCircleIcon } from "lucide-react";

function ArticlesGrid() {
  const { entities, loading, loadMore, hasMore } = useEntityList();
  const isFirstLoad = loading && (!entities || entities.length === 0);
  const observerRef = useRef<IntersectionObserver>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        loadMore?.();
      }
    },
    [hasMore, loading, loadMore]
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "200px",
    });
    const node = sentinelRef.current;
    if (node) observerRef.current.observe(node);
    return () => observerRef.current?.disconnect();
  }, [handleIntersect]);

  return (
    <section className="flex-1 w-full py-4 bg-muted/50">
      <div className="container flex flex-col items-center">
        {/* … header … */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {isFirstLoad
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-60 rounded-md bg-gray-300 animate-pulse"
                />
              ))
            : entities?.map((article) => (
                <ArticleCard article={article} key={article.id} />
              ))}
        </div>

        {/* Sentinel for infinite scroll */}
        <div ref={sentinelRef} className="h-1 w-full" />

        {/* Optional loading spinner */}
        {loading && (
          <LoaderCircleIcon className="size-6 animate-spin mx-auto my-4" />
        )}
      </div>
    </section>
  );
}

export default ArticlesGrid;
