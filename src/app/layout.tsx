import type React from "react";
import { Outfit } from "next/font/google";
import { Metadata } from "next";

import ContextProviders from "../context/context-providers";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Add Social Features to Your App in Minutes | Sublay",
  description:
    "Add powerful community features to your app with Sublay - boost user engagement, reduce churn, and grow brand loyalty - no complicated setup required.",
  keywords: [
    "Sublay",
    "social features",
    "comments",
    "voting",
    "community",
    "engagement",
    "React comments",
    "user interaction",
    "SaaS social tools",
  ],
  authors: [{ name: "Sublay Team" }],
  alternates: {
    canonical: "https://sublay.io", // change if this is a subpage
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: "https://sublay.io/",
    title: "Add Social Features to Your App in Minutes | Sublay",
    description:
      "Sublay makes it easy to add comments, votes, feeds, notifications, and more – everything you need to build a modern community inside your app.",
    images: [
      {
        url: "https://sublay.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sublay OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Social Features to Your App in Minutes | Sublay",
    description:
      "Add comments, votes, feeds & more to your app with Sublay. Engage users & grow community without complex setup.",
    images: [{ url: "https://sublay.io/og-image.png", alt: "Sublay Image" }],
    site: "@sublay_io",
    creator: "@yantsab",
  },
};

// This is your root layout used by Next.js
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID; // Google Tag Manager ID - e.g., 'GTM-XXXXXXX'
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId={gtmId!} />

      <body className={outfit.className}>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
