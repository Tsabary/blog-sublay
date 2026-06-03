import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og-image";

// Default OpenGraph image for the blog (home + any page that doesn't set its
// own). Article pages override this with their cover photo via generateMetadata
// in articles/[slugAndId]/page.tsx (deeper segment wins).

export const alt = "Sublay — Infrastructure for user-powered products";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const HEADLINE = [
  { text: "Infrastructure for " },
  { text: "user-powered", accent: true },
  { text: " products." },
];

const CHIPS = [
  "content modeling",
  "threaded discussions",
  "permission graphs",
  "ranking pipelines",
  "search indexing",
  "notification fan-out",
  "social graphs",
  "moderation queues",
];

export default function Image() {
  return renderOgImage({ headline: HEADLINE, chips: CHIPS });
}
