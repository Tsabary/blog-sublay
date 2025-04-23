import { handleError } from "@replyke/core";
import { ReplykeClient } from "@replyke/js";
import { remark } from "remark";
import html from "remark-html";
import slugify from "slugify";

import Layout from "../../../components/Layout";
import ArticleImage from "../../../components/article/ArticleImage";
import ArticleDetails from "../../../components/article/ArticleDetails";
import NavigateHomeButton from "../../../components/article/NavigateHomeButton";
import { notFound, redirect } from "next/navigation";
import {
  getArticlePath,
  getArticleSlug,
} from "../../../helpers/getArticlePath";

export const revalidate = 60; // ISR: regenerate at most once per minute

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugAndId: string }>;
}): Promise<{ alternates: { canonical: string } }> {
  const { slugAndId } = await Promise.resolve(params);

  // pull out the ID
  const hyphen = slugAndId.lastIndexOf("-");
  if (hyphen < 0)
    return { alternates: { canonical: "https://blog.replyke.com" } };

  const shortId = slugAndId.slice(hyphen + 1);
  const client = await ReplykeClient.init({
    projectId: process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID!,
  });
  const article = await client.entities.fetchEntityByShortId({ shortId });
  if (!article)
    return { alternates: { canonical: "https://blog.replyke.com" } };

  const path = getArticlePath(article);
  return {
    alternates: {
      canonical: `https://blog.replyke.com${path}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slugAndId: string }>;
}) {
  const { slugAndId } = await Promise.resolve(params);

  const hyphen = slugAndId.lastIndexOf("-");
  if (hyphen < 0) return notFound();

  const slugPart = slugAndId.slice(0, hyphen);
  const shortId = slugAndId.slice(hyphen + 1);

  // 1) Isolate your network call in its own try/catch:
  let article;

  try {
    const replykeClient = await ReplykeClient.init({
      projectId: process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID!,
    });
    article = await replykeClient.entities.fetchEntityByShortId({ shortId });
  } catch (networkError) {
    // only catches init/fetch failures
    handleError(networkError, "Failed to fetch article");
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-red-500">
            Sorry, we couldn’t load that article right now.
          </p>
        </div>
      </Layout>
    );
  }

  // 2) Handle “not found”:
  if (!article) return notFound();

  // 3) NOW do your slug check / redirect outside of the catch
  const correctSlug = getArticleSlug({
    title: article.title,
  });
  if (slugPart !== correctSlug) {
    const path = getArticlePath({
      title: article.title,
      shortId,
    });

    console.log({ slugPart, correctSlug });
    // this will throw Next.js’s built-in redirect exception
    // redirect(path);
  }

  // 4) Your rendering/HTML-processing can go here (or in another try/catch if you like)
  const processed = await remark().use(html).process(article.content);
  const contentHtml = processed.toString();

  return (
    <Layout>
      <div className="flex-1 pt-16 bg-white">
        <article className="container max-w-3xl py-6 lg:py-12">
          <div className="space-y-4">
            <NavigateHomeButton />
            <ArticleDetails article={article} />
            {/* <ActionsBar /> */}
          </div>
          <ArticleImage article={article} />
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
          {/* <BackToArticlesButton /> */}
        </article>
        {/* <RelatedArticles/> */}
        {/* <Subscribe /> */}
      </div>
    </Layout>
  );
}
