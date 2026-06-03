import { ImageResponse } from "next/og";

// ─────────────────────────────────────────────────────────────────────────────
// Shared social-share image template (OpenGraph + Twitter).
//
// One source of truth for the 1200×630 share card. Routes stay thin: they
// import `renderOgImage` and pass content. Copied from the landing repo — keep
// the two in sync when the design changes.
//
// Rendering engine note: next/og uses Satori, NOT a browser. Satori is stricter
// than CSS — quirks already worked around here:
//   • Absolutely-positioned fills need explicit width/height; `inset: 0` is
//     ignored, so the element would collapse to 0×0 and paint nothing.
//   • Use `radial-gradient(ellipse at X% Y%, …)`. The explicit-size form
//     (`ellipse 70% 55% at …`) is dropped silently.
//   • Tiled backgrounds (backgroundSize dot grids) don't repeat — omitted.
//   • Only TTF/OTF/WOFF fonts load (not woff2); see loadGoogleFont below.
// ─────────────────────────────────────────────────────────────────────────────

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const ACCENT = "#f43f5e";

// Light variant of the Sublay mark, inlined as a data URI so Satori renders it
// reliably (rather than relying on inline <svg> polygon support).
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-18 25 426 426">
<polygon fill="#8c8c90" points="195,211 378,129 378,179 195,261"/>
<polygon fill="#bcbcc0" points="12,129 195,211 195,261 12,179"/>
<polygon fill="#e3e3e5" points="195,47 378,129 195,211 12,129"/>
<polygon fill="#ef4a62" points="12,219 195,301 195,345 12,263"/>
<polygon fill="#c52340" points="195,301 378,219 378,263 195,345"/>
<polygon fill="#f15a70" points="12,219 195,301 195,275 12,193"/>
<polygon fill="#e03a54" points="195,301 378,219 378,193 195,275"/>
<polygon fill="#ef4a62" points="12,303 195,385 195,429 12,347"/>
<polygon fill="#c52340" points="195,385 378,303 378,347 195,429"/>
<polygon fill="#f15a70" points="12,303 195,385 195,359 12,277"/>
<polygon fill="#e03a54" points="195,385 378,303 378,277 195,359"/>
</svg>`;

const MARK_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString(
  "base64"
)}`;

// Fetch TTFs from Google Fonts at render time. Requesting the css2 endpoint with
// the default fetch UA returns `format('truetype')`, which Satori can parse (it
// can't read woff2). Share images are cached, so this runs rarely.
async function loadGoogleFont(family: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!src) throw new Error(`Failed to load font: ${family} ${weight}`);
  return (await fetch(src[1])).arrayBuffer();
}

export interface OgImageContent {
  /** Headline segments. Set `accent: true` to render a segment in the brand color. */
  headline: { text: string; accent?: boolean }[];
  /** Pill labels rendered in monospace below the headline. Omit for a title-only card. */
  chips?: string[];
  /** Headline font size in px. Defaults to 72; drop it for long article titles. */
  headlineFontSize?: number;
}

export async function renderOgImage({
  headline,
  chips = [],
  headlineFontSize = 72,
}: OgImageContent) {
  const [outfit700, geistMono400] = await Promise.all([
    loadGoogleFont("Outfit", 700),
    loadGoogleFont("Geist Mono", 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          position: "relative",
          fontFamily: "Outfit",
        }}
      >
        {/* Gradient glows — separate full-bleed layers, Satori-safe syntax. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "radial-gradient(ellipse at 50% 128%, rgba(244,63,94,0.55), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "radial-gradient(ellipse at 85% -22%, rgba(139,92,246,0.45), transparent 58%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "radial-gradient(ellipse at -10% 50%, rgba(6,182,212,0.20), transparent 55%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 64px",
            gap: 28,
          }}
        >
          {/* Wordmark — nudged left so the text (where the eye lands) reads as
              centered, rather than the geometric center of mark+text. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              transform: "translateX(-24px)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MARK_DATA_URI} width={72} height={72} alt="" />
            <span
              style={{
                fontFamily: "Outfit",
                fontWeight: 700,
                fontSize: 52,
                letterSpacing: "-0.025em",
                color: "#ffffff",
              }}
            >
              Sublay
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: 980,
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: headlineFontSize,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            {headline.map((part, i) => (
              <span key={i} style={{ color: part.accent ? ACCENT : "#ffffff" }}>
                {part.text}
              </span>
            ))}
          </div>

          {/* Chips (omitted for title-only cards) */}
          {chips.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              maxWidth: 1000,
              marginTop: 8,
            }}
          >
            {chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: "Geist Mono",
                  fontSize: 21,
                  color: "#d4d4d8",
                  border: "1px solid #52525b",
                  backgroundColor: "rgba(24, 24, 27, 0.6)",
                  borderRadius: 999,
                  padding: "6px 18px",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
          )}
        </div>

        {/* Bottom brand strip */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 40px",
            height: 56,
          }}
        >
          <span
            style={{ fontFamily: "Geist Mono", fontSize: 16, color: "#52525b" }}
          >
            sublay.io
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              margin: "0 24px",
              background:
                "linear-gradient(to right, transparent, #f43f5e55, transparent)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Outfit", data: outfit700, weight: 700, style: "normal" },
        { name: "Geist Mono", data: geistMono400, weight: 400, style: "normal" },
      ],
    }
  );
}
