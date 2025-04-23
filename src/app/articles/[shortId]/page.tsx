import { ReplykeClient } from "@replyke/js";
import { remark } from "remark";
import html from "remark-html";
import Layout from "../../../components/Layout";
import ArticleImage from "../../../components/article/ArticleImage";
import ArticleDetails from "../../../components/article/ArticleDetails";
import NavigateHomeButton from "../../../components/article/NavigateHomeButton";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  try {
    console.log("Project ID:", process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID);

    const replykeClient = await ReplykeClient.init({
      projectId: process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID!,
    });

    const { shortId } = await Promise.resolve(params);
    const article = await replykeClient.entities.fetchEntityByShortId({
      shortId,
    });

    if (!article) {
      return null;
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
    console.error("Failed to load article:", error);
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-red-500">Sorry, something went wrong.</p>
        </div>
      </Layout>
    );
  }
}
