"use client";

import React, { useEffect } from "react";
import { useEntityList } from "@replyke/react-js";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "./ArticleCard";
import { Button } from "../ui/button";

function LatestArticles() {
  const { entities, fetchEntities } = useEntityList({
    listId: "latest-articles",
  });

  useEffect(() => {
    fetchEntities({ sortBy: "new" }, { sourceId: "blog", limit: 4 });
  }, []);

  if (!entities) return null;

  const [_, ...restOfArticle] = entities;

  return (
    <section className="w-full py-16 lg:py-24 bg-muted/50">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Latest Articles
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
              Discover Our Recent Content
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our latest articles, insights, and stories crafted for
              curious minds.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {restOfArticle.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/articles" passHref>
            <Button variant="outline" className="gap-1">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestArticles;
