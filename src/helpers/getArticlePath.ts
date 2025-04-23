// lib/articles.ts
import slugify from "slugify";

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
  const slug = slugify(title || "article", {
    lower: true,
    strict: true, // removes characters like ':', '&', etc.
  });
  return `/articles/${slug}-${shortId}`;
}
