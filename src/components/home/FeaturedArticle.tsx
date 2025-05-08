"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEntityList } from "@replyke/react-js";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import calculateReadingTimeFromMarkdown from "../../helpers/calculateReadingTimeFromMarkdown";
import { formatDate2 } from "../../lib/time-formatters";
import UserAvatar from "../Layout/Header/UserAvatar";
import { getArticlePath } from "../../helpers/getArticlePath";

function FeaturedArticle() {
  const { entities } = useEntityList();
  const article = entities?.[0];
  const isLoading = !article;

  const path = article
    ? getArticlePath({
        title: article.title,
        shortId: article.shortId,
      })
    : "";

  return (
    <section className="w-full mt-6 bg-white px-4 md:px-6 min-h-screen flex items-center">
      <div className="max-w-3xl lg:max-w-6xl w-full mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] py-28 lg:py-0 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex flex-col gap-4 items-start">
              {isLoading ? (
                <div className="h-5 w-24 rounded bg-muted animate-pulse" />
              ) : (
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  {article.metadata.category}
                </div>
              )}

              {isLoading ? (
                <div className="h-10 w-3/4 rounded bg-muted animate-pulse" />
              ) : (
                <Link href={path}>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none hover:underline">
                    {article.title}
                  </h1>
                </Link>
              )}

              {isLoading ? (
                <div className="h-5 w-full rounded bg-muted animate-pulse" />
              ) : (
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {article.metadata.excerpt}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4">
              {isLoading ? (
                <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
              ) : (
                <UserAvatar user={article.user!} />
              )}
              <div className="flex items-center gap-5">
                {isLoading ? (
                  <>
                    <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-40 rounded bg-muted animate-pulse" />
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium leading-none">
                      {article.user!.name || "Author"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate2(new Date(article.createdAt))} ·{" "}
                      {calculateReadingTimeFromMarkdown(article.content || "")}{" "}
                      min read
                    </p>
                  </>
                )}
                {article && (
                  <>
                    <div className="flex items-center gap-1">
                      <HeartIcon
                        className="size-4 text-gray-400"
                        fill="#9ca3af"
                      />
                      <span className="text-sm text-gray-400">
                        {article.upvotes.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircleIcon
                        className="size-4 text-gray-400"
                        fill="#9ca3af"
                      />
                      <span className="text-sm text-gray-400">
                        {article.repliesCount}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {isLoading ? (
                <div className="h-10 w-40 rounded bg-muted animate-pulse" />
              ) : (
                <Link href={`/articles/${article.shortId}`} passHref>
                  <Button className="inline-flex items-center justify-center">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div> */}
          </div>

          <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:mt-0">
            {isLoading ? (
              <div className="w-full h-full bg-muted animate-pulse rounded-xl" />
            ) : article.attachments[0] ? (
              <Image
                src={article.attachments[0].publicPath || "/placeholder.svg"}
                alt={article.title || "Cover image"}
                width={1200}
                height={600}
                className="aspect-video object-cover"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArticle;
