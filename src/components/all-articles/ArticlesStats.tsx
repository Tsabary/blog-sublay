"use client";

import { Card } from "@/components/ui/card";
import { Entity } from "@sublay/react-js";
import { FileText, TrendingUp, MessageCircle, Heart } from "lucide-react";

interface ArticlesStatsProps {
  articles: Entity[];
  loading: boolean;
}

export function ArticlesStats({ articles, loading }: ArticlesStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="h-16 animate-pulse bg-muted rounded" />
          </Card>
        ))}
      </div>
    );
  }

  const totalArticles = articles.length;
  const totalLikes = articles.reduce(
    (sum, article) => sum + article.upvotes.length,
    0
  );
  const totalComments = articles.reduce(
    (sum, article) => sum + article.repliesCount,
    0
  );

  // Find most popular category
  const categoryCounts: Record<string, number> = {};
  articles.forEach((article) => {
    const category = article.metadata?.category;
    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });

  const mostPopularCategory =
    Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "N/A";

  const stats = [
    {
      label: "Total Articles",
      value: totalArticles,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      label: "Most Popular",
      value:
        mostPopularCategory.charAt(0).toUpperCase() +
        mostPopularCategory.slice(1),
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      label: "Total Likes",
      value: totalLikes,
      icon: Heart,
      color: "text-red-600",
    },
    {
      label: "Total Comments",
      value: totalComments,
      icon: MessageCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
