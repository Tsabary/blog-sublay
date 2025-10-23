import { ReplykeClient } from "@replyke/js";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { handleError } from "@/lib/handle-error";
import NavigateHomeButton from "../../../components/article/NavigateHomeButton";
import Layout from "../../../components/Layout";
import ArticleImage from "../../../components/article/ArticleImage";
import ArticleDetails from "../../../components/article/ArticleDetails";
import {
  getArticlePath,
  getArticleSlug,
} from "../../../helpers/getArticlePath";
import ActionsBar from "../../../components/article/ActionsBar";
import BackToArticlesButton from "../../../components/article/BackToArticlesButton";

export const revalidate = 60; // ISR: regenerate at most once per minute

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugAndId: string }>;
}): Promise<Metadata> {
  const { slugAndId } = await Promise.resolve(params);

  // Extract base URL from headers
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host");
  const protocol = hdrs.get("x-forwarded-proto") || "https";
  const baseUrl = `${protocol}://${host}`;

  // pull out the ID
  const hyphen = slugAndId.lastIndexOf("-");
  if (hyphen < 0) return { alternates: { canonical: baseUrl } };

  const shortId = slugAndId.slice(hyphen + 1);
  const client = await ReplykeClient.init({
    projectId: process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID!,
  });
  const article = await client.entities.fetchEntityByShortId({ shortId });
  if (!article)
    return {
      alternates: { canonical: baseUrl },
    };

  const path = getArticlePath(article);
  const canonicalUrl = `${baseUrl}${path}`;
  return {
    title: article.title || "Article",
    description: article.metadata.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.metadata.excerpt,
      url: canonicalUrl, // adjust if needed
      type: "website",
      images: [
        {
          url: article.attachments[0].publicPath,
          width: 1200,
          height: 630,
          alt: "Cover photo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metadata.excerpt,
      images: [
        {
          url: article.attachments[0].publicPath,
          alt: "Cover photo",
        },
      ],
      // site: "",
      // creator: "",
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
    // this will throw Next.js’s built-in redirect exception
    redirect(path);
  }

  // 4) Your rendering/HTML-processing can go here (or in another try/catch if you like)
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(rehypeStringify)
    .process(article.content);
  const contentHtml = processed.toString();

  return (
    <Layout>
      <article className="container max-w-3xl flex-1 pt-24 pb-8 bg-background">
        <div className="space-y-4">
          <NavigateHomeButton />
          <ArticleDetails article={article} />
          <ActionsBar />
        </div>
        <ArticleImage article={article} />
        <div className="prose prose-gray max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
        <BackToArticlesButton />
      </article>
    </Layout>
  );
}
