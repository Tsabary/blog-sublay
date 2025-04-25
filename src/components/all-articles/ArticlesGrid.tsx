"use client";

import React from "react";
import { useFeed } from "@replyke/react-js";
import ArticleCard from "../home/ArticleCard";

function ArticlesGrid() {
  const { entities, loading } = useFeed();

  const isFirstLoad = loading && (!entities || entities.length === 0);

  // return (
  //   <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
  //     <div className="container">
  //       <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
  //         {Array.from({ length: 6 }).map((_, idx) => (
  //           <div
  //             key={idx}
  //             className="h-60 rounded-md bg-gray-300 animate-pulse"
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );

  return (
    <section className="flex-1 w-full py-12 md:py-24 bg-muted/50">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm">
              All of Our Articles
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
              Discover Our Content
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our articles, insights, and stories crafted for curious
              minds.
            </p>
          </div>
        </div>
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
      </div>
    </section>
  );
}

export default ArticlesGrid;
