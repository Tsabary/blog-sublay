"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, X, SortAsc, Filter } from "lucide-react";
import { CATEGORIES } from "@/constants";

export interface ArticleFilters {
  sortBy: "hot" | "new" | "top";
  category: string | null;
  search: string;
}

interface ArticlesFiltersProps {
  filters: ArticleFilters;
  onFiltersChange: (filters: ArticleFilters) => void;
}

export function ArticlesFilters({
  filters,
  onFiltersChange,
}: ArticlesFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search || "");

  const handleFilterChange = (key: keyof ArticleFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange("search", searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    onFiltersChange({
      sortBy: "new",
      category: null,
      search: "",
    });
  };

  const hasActiveFilters = filters.category || filters.search;

  return (
    <Card className="p-3 md:p-4">
      <div className="flex items-center gap-2">
        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex gap-2 flex-1 min-w-0"
        >
          <Input
            placeholder="Search articles..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-9 flex-1 min-w-0"
          />
          <Button type="submit" size="sm" variant="outline" className="shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </form>

        {/* Sort By - Icon dropdown on mobile, tabs on desktop */}
        <div className="shrink-0">
          {/* Mobile: Icon dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden h-9 w-9 p-0">
                <SortAsc className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleFilterChange("sortBy", "hot")}
                className={filters.sortBy === "hot" ? "bg-accent" : ""}
              >
                Hot
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterChange("sortBy", "new")}
                className={filters.sortBy === "new" ? "bg-accent" : ""}
              >
                New
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterChange("sortBy", "top")}
                className={filters.sortBy === "top" ? "bg-accent" : ""}
              >
                Top
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop: Tabs with label */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Sort:
            </span>
            <Tabs
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="hot" className="text-xs">
                  Hot
                </TabsTrigger>
                <TabsTrigger value="new" className="text-xs">
                  New
                </TabsTrigger>
                <TabsTrigger value="top" className="text-xs">
                  Top
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Category Filter - Icon dropdown on mobile, select on desktop */}
        <div className="shrink-0">
          {/* Mobile: Icon dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden h-9 w-9 p-0">
                <Filter className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleFilterChange("category", null)}
                className={!filters.category ? "bg-accent" : ""}
              >
                All
              </DropdownMenuItem>
              {CATEGORIES.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                  className={filters.category === category ? "bg-accent" : ""}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop: Select with label */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Category:
            </span>
            <Select
              value={filters.category || "all"}
              onValueChange={(value) =>
                handleFilterChange("category", value === "all" ? null : value)
              }
            >
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="shrink-0 h-9 w-9 p-0 md:w-auto md:px-3"
          >
            <X className="w-3.5 h-3.5 md:mr-1" />
            <span className="hidden md:inline">Clear</span>
          </Button>
        )}
      </div>
    </Card>
  );
}
