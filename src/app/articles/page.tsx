"use client";

import React, { useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import ArticlesGrid from "../../components/all-articles/ArticlesGrid";
import {
  ArticlesFilters,
  ArticleFilters as ArticleFiltersType,
} from "../../components/all-articles/ArticlesFilters";
// import { ArticlesStats } from "../../components/all-articles/ArticlesStats";
import { TrendingWidget } from "../../components/all-articles/TrendingWidget";
import Layout from "../../components/Layout";
import NavigateHomeButton from "../../components/article/NavigateHomeButton";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

function ArticlesPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [filters, setFilters] = useState<ArticleFiltersType>({
    sortBy: "new",
    category: categoryFromUrl || null,
    search: "",
  });

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Update filters when URL category changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryFromUrl || null,
    }));
  }, [categoryFromUrl]);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <NavigateHomeButton />
          <div className="mt-6 space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">All Articles</h1>
            <p className="text-lg text-muted-foreground">
              Browse and discover articles from our community
            </p>
          </div>
        </div>

        {/* Stats */}
        {/* <div className="mb-8">
          <ArticlesStats
            articles={allArticles || []}
            loading={statsLoading}
          />
        </div> */}

        {/* Layout with Filters, Articles, and Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Filters and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 w-full">
                <ArticlesFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Articles Grid/List */}
            <ArticlesGrid filters={filters} viewMode={viewMode} />
          </div>

          {/* Sidebar - Trending (hidden on mobile) */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <TrendingWidget />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ArticlesPage;
