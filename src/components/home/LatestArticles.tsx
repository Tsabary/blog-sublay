"use client";

import React, { useEffect } from "react";
import { useEntityList } from "@replyke/react-js";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleListItem from "./ArticleListItem";
import { Button } from "../ui/button";

function LatestArticles() {
  const { entities, fetchEntities, loading } = useEntityList({
    listId: "latest-articles",
  });
  const hasNoArticles =
    entities !== undefined && entities.length === 0 && !loading;

  useEffect(() => {
    fetchEntities(
      {},
      { sortBy: "new" },
      { sourceId: "blog", limit: 4, include: ["files", "saved", "user"] },
    );
  }, []);

  if (!entities) return null;

  const [_, ...restOfArticle] = entities;

  if (hasNoArticles) return null;

  return (
    <section className="w-full mt-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Latest Articles
            </h2>
            <p className="text-muted-foreground mt-1">
              Explore our latest articles and insights
            </p>
          </div>
          <Link href="/articles" passHref>
            <Button variant="outline" size="sm" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          {restOfArticle.map((article) => (
            <ArticleListItem article={article} key={article.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestArticles;
