import { SublayClient } from "@sublay/js";
import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og-image";

// Per-article social card: the branded template with the article's title as the
// headline. This file-based image overrides the root branded card for article
// pages (and beats `openGraph.images` set in generateMetadata).

export const alt = "Sublay Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const revalidate = 60; // match the page's ISR window

// Long titles need a smaller headline so they don't overflow the card.
function headlineSizeFor(title: string): number {
  if (title.length <= 36) return 72;
  if (title.length <= 64) return 58;
  if (title.length <= 96) return 48;
  return 40;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slugAndId: string }>;
}) {
  const { slugAndId } = await params;

  let title: string | null = null;
  try {
    const hyphen = slugAndId.lastIndexOf("-");
    if (hyphen >= 0) {
      const shortId = slugAndId.slice(hyphen + 1);
      const client = await SublayClient.init({
        projectId: process.env.NEXT_PUBLIC_SUBLAY_PROJECT_ID!,
      });
      const article = await client.entities.fetchEntityByShortId({ shortId });
      title = article?.title ?? null;
    }
  } catch {
    // Fall through to the generic card if the lookup fails.
  }

  // Fallback to the generic blog card when the article can't be resolved.
  if (!title) {
    return renderOgImage({
      headline: [
        { text: "Infrastructure for " },
        { text: "user-powered", accent: true },
        { text: " products." },
      ],
      chips: [
        "content modeling",
        "threaded discussions",
        "permission graphs",
        "ranking pipelines",
        "search indexing",
        "notification fan-out",
        "social graphs",
        "moderation queues",
      ],
    });
  }

  return renderOgImage({
    headline: [{ text: title }],
    headlineFontSize: headlineSizeFor(title),
  });
}
