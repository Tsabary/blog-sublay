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
import { getArticlePath } from "../../../helpers/getArticlePath";

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
  console.log("Project ID:", process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID);
  try {
    const replykeClient = await ReplykeClient.init({
      projectId: process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID!,
    });

    const { slugAndId } = await Promise.resolve(params);

    // 1) split the URL segment into [slug]-[id]
    const hyphen = slugAndId.lastIndexOf("-");
    if (hyphen < 0) return notFound();

    const slugPart = slugAndId.slice(0, hyphen);
    const shortId = slugAndId.slice(hyphen + 1);

    const article = await replykeClient.entities.fetchEntityByShortId({
      shortId,
    });

    if (!article) {
      return null;
    }

    // 3) if the slug doesn’t match your title, redirect to the “correct” URL
    const correctSlug = slugify(article.title, { lower: true });
    if (slugPart !== correctSlug) {
      return redirect(`/articles/${correctSlug}-${shortId}`);
    }

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
  } catch (error) {
    handleError(error, "Failed to load article:");
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-red-500">Sorry, something went wrong.</p>
        </div>
      </Layout>
    );
  }
}
