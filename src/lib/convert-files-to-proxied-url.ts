export function convertFilesToProxiedUrl(url: string): string {
  const SUPABASE_PUBLIC_PREFIX =
    "supabase.co/storage/v1/object/public/projects-public/";
  const PROXY_PREFIX = "https://api.replyke.com/internal/files/";

  try {
    const parsed = new URL(url);

    // Already proxied?
    if (
      parsed.hostname === "api.replyke.com" &&
      parsed.pathname.startsWith("/internal/files/")
    ) {
      return url;
    }

    // Direct supabase public storage URL
    const fullPath = parsed.href.split(SUPABASE_PUBLIC_PREFIX)[1];
    if (fullPath) {
      return `${PROXY_PREFIX}${fullPath}`;
    }

    // Not a recognized Supabase storage URL, return as-is
    return url;
  } catch (err) {
    // Not a valid URL
    return url;
  }
}
