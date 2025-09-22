import type { Metadata } from "next";
import type { Post } from "./types";

export function getDefaultMetadata(): Metadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://igaming-demo.vercel.app";

  return {
    title: {
      default: "iGaming Demo",
      template: "%s | iGaming Demo",
    },
    description:
      "Modern iGaming demo platform built with Next.js, Supabase, and TypeScript. Experience the future of online gaming.",
    keywords: [
      "igaming",
      "demo",
      "nextjs",
      "supabase",
      "typescript",
      "gaming",
      "casino",
      "betting",
    ],
    authors: [{ name: "iGaming Demo Team" }],
    creator: "iGaming Demo",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: "iGaming Demo",
      description:
        "Modern iGaming demo platform built with Next.js, Supabase, and TypeScript. Experience the future of online gaming.",
      type: "website",
      url: siteUrl,
      siteName: "iGaming Demo",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "iGaming Demo",
      description:
        "Modern iGaming demo platform built with Next.js, Supabase, and TypeScript.",
      creator: "@igaming_demo",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function getPostMetadata(post: Post): Metadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://igaming-demo.vercel.app";
  const postUrl = `${siteUrl}/posts/${post.slug}`;
  const description = post.content
    ? post.content.slice(0, 160).replace(/\n/g, " ").trim()
    : `Read ${post.title} on iGaming Demo platform`;

  return {
    title: post.title,
    description,
    keywords: [
      "igaming",
      "gaming",
      "article",
      post.title.toLowerCase().split(" "),
    ].flat(),
    authors: [{ name: "iGaming Demo Team" }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: postUrl,
      siteName: "iGaming Demo",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ["iGaming Demo Team"],
      ...(post.image_url && {
        images: [{ url: post.image_url, alt: post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.image_url && { images: [post.image_url] }),
    },
  };
}

export function getAdminMetadata(): Metadata {
  return {
    title: "Admin Panel",
    description: "Content management system for iGaming Demo platform",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateSlug(slug: string): boolean {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug) && slug.length >= 3 && slug.length <= 100;
}
