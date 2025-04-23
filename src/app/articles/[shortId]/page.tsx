import { ReplykeClient } from "@replyke/js";
import { remark } from "remark";
import html from "remark-html";
import Layout from "../../../components/Layout";
// import ActionsBar from "../../../components/article/ActionsBar";
import ArticleImage from "../../../components/article/ArticleImage";
import ArticleDetails from "../../../components/article/ArticleDetails";
import NavigateHomeButton from "../../../components/article/NavigateHomeButton";
import Subscribe from "../../../components/home/Subscribe";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
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
          {/* <div className="mt-8 flex items-center justify-between border-t pt-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
            </Button>
          </div> */}
        </article>
        {/* <section className="w-full border-t bg-muted/50 py-12">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {post.relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/posts/${relatedPost.id}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        width={300}
                        height={200}
                        className="aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{relatedPost.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section> */}
        <Subscribe />
      </div>
    </Layout>
  );
}
