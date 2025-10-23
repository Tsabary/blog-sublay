import type { MetadataRoute } from "next";
import { ReplykeClient } from "@replyke/js"; // or your own DB helper
import { getArticlePath } from "../helpers/getArticlePath";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace with your URL
  const base = "https://blog.replyke.com";

  const client = await ReplykeClient.init({
    projectId: process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID!,
  });
  const articles: { title: string; shortId: string; updatedAt: string }[] =
    await client.entities.fetchManyEntities({ limit: 1000, sourceId: "blog" });

  return articles.map(({ title, shortId, updatedAt }) => ({
    url: `${base}/${getArticlePath({ title, shortId })}`,
    lastModified: new Date(updatedAt), // optional but recommended
    changeFrequency: "daily", // optional
  }));
}
