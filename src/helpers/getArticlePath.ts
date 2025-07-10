// lib/articles.ts
import slugify from "slugify";

export function getArticleSlug({ title }: { title: string | null }): string {
  const slug = slugify(title || "article", {
    lower: true,
    strict: true, // removes characters like ':', '&', etc.
  });
  return slug;
}

/**
 * @param article An object with at least `title` and `shortId`
 * @returns a path like '/articles/your-title-ABC123'
 */
export function getArticlePath({
  title,
  shortId,
}: {
  title: string | null;
  shortId: string;
}): string {
  const slug = getArticleSlug({ title });
  return `/articles/${slug}-${shortId}`;
}
