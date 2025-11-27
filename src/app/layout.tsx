import type React from "react";
import { Outfit } from "next/font/google";
import { Metadata } from "next";

import ContextProviders from "../context/context-providers";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Add Social Features to Your App in Minutes | Replyke",
  description:
    "Add powerful community features to your app with Replyke - boost user engagement, reduce churn, and grow brand loyalty - no complicated setup required.",
  keywords: [
    "Replyke",
    "social features",
    "comments",
    "voting",
    "community",
    "engagement",
    "React comments",
    "user interaction",
    "SaaS social tools",
  ],
  authors: [{ name: "Replyke Team" }],
  alternates: {
    canonical: "https://replyke.com", // change if this is a subpage
  },
  icons: {
    icon: "/favicon.ico", // must be a valid path or URL
  },
  openGraph: {
    type: "website",
    url: "https://replyke.com/",
    title: "Add Social Features to Your App in Minutes | Replyke",
    description:
      "Replyke makes it easy to add comments, votes, feeds, notifications, and more – everything you need to build a modern community inside your app.",
    images: [
      {
        url: "https://replyke.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Replyke OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Social Features to Your App in Minutes | Replyke",
    description:
      "Add comments, votes, feeds & more to your app with Replyke. Engage users & grow community without complex setup.",
    images: [{ url: "https://replyke.com/og-image.png", alt: "Replyke Image" }],
    site: "@ReplykeJs",
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
