"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useEntityList } from "@sublay/react-js";
import { TagIcon } from "lucide-react";
import { Badge } from "../ui/badge";

function CategoryNavigation() {
  const { entities, fetchEntities, loading } = useEntityList({
    listId: "categories-articles",
  });

  useEffect(() => {
    fetchEntities(
      {},
      { sortBy: "new" },
      { sourceId: "blog", limit: 50, include: ["files", "saved", "user"] },
    );
  }, []);

  // Extract unique categories with counts
  const categories = useMemo(() => {
    if (!entities) return [];

    const categoryMap = new Map<string, number>();

    entities.forEach((article) => {
      const category = article.metadata?.category;
      if (category) {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      }
    });

    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [entities]);

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <TagIcon className="size-4" />
          <h3 className="font-semibold text-base">Topics</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-6 w-16 rounded-full bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!categories.length) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <TagIcon className="size-4 text-primary" />
        <h3 className="font-semibold text-base">Topics</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/articles?category=${encodeURIComponent(category.name)}`}
          >
            <Badge
              variant="secondary"
              className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-xs py-0.5"
            >
              {category.name}
              {category.count > 1 && (
                <span className="ml-1 opacity-70">{category.count}</span>
              )}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryNavigation;
