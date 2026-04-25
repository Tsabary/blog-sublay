"use client";

import { useRef, useEffect, useCallback } from "react";
import { EntityListFilters, useEntityList } from "@replyke/react-js";
import { LoaderCircleIcon } from "lucide-react";
import ArticleCard from "../home/ArticleCard";
import ArticleListItem from "../home/ArticleListItem";
import { ArticleFilters } from "./ArticlesFilters";

interface ArticlesGridProps {
  filters: ArticleFilters;
  viewMode: "list" | "grid";
}

function ArticlesGrid({ filters, viewMode }: ArticlesGridProps) {
  const { entities, loading, loadMore, hasMore, fetchEntities } = useEntityList(
    {
      listId: "all-articles",
    },
  );
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
    [hasMore, loading, loadMore],
  );

  // Fetch entities when filters change
  useEffect(() => {
    const fetchParams: Partial<EntityListFilters> = {};

    // Add category filter if selected
    if (filters.category) {
      fetchParams.metadataFilters = {
        includes: { category: filters.category },
      };
    }

    // Add search filter if provided
    if (filters.search) {
      fetchParams.titleFilters = { includes: filters.search };
    }

    fetchEntities(
      fetchParams,
      { sortBy: filters.sortBy },
      { sourceId: "blog", limit: 12, include: ["files", "saved", "user"] },
    );
  }, [filters]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "200px",
    });
    const node = sentinelRef.current;
    if (node) observerRef.current.observe(node);
    return () => observerRef.current?.disconnect();
  }, [handleIntersect]);

  // Render landscape list view
  if (viewMode === "list") {
    return (
      <section className="w-full">
        <div className="flex flex-col gap-6">
          {isFirstLoad ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-40 rounded-lg bg-muted animate-pulse"
              />
            ))
          ) : entities && entities.length > 0 ? (
            entities.map((article) => (
              <ArticleListItem article={article} key={article.id} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No articles found. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* Sentinel for infinite scroll */}
          <div ref={sentinelRef} className="h-1 w-full" />

          {/* Loading spinner */}
          {loading && !isFirstLoad && (
            <LoaderCircleIcon className="size-6 animate-spin mx-auto my-4" />
          )}
        </div>
      </section>
    );
  }

  // Render grid view
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isFirstLoad ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-60 rounded-md bg-muted animate-pulse" />
          ))
        ) : entities && entities.length > 0 ? (
          entities.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">
              No articles found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-1 w-full" />

      {/* Loading spinner */}
      {loading && !isFirstLoad && (
        <LoaderCircleIcon className="size-6 animate-spin mx-auto my-4" />
      )}
    </section>
  );
}

export default ArticlesGrid;
