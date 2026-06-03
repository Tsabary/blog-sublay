// Twitter/X card for an article — reuses the per-article OpenGraph image.
// `revalidate` must be declared directly (Next can't follow it through a re-export).
export { default, alt, size, contentType } from "./opengraph-image";

export const revalidate = 60; // match the page's ISR window
