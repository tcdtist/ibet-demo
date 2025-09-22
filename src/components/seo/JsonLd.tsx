"use client";

import Script from "next/script";
import type { Post } from "@/lib/types";

type ArticleSchema = {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  url: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
  };
  image?: string;
  wordCount?: number;
};

type WebsiteSchema = {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  sameAs: string[];
};

function createArticleSchema(post: Post): ArticleSchema {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://igaming-demo.vercel.app";
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;

  const schema: ArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.content
      ? post.content.slice(0, 160).replace(/\n/g, " ").trim()
      : post.title,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: `${siteUrl}/posts/${post.slug}`,
    author: {
      "@type": "Person",
      name: "iGaming Demo Team",
    },
    publisher: {
      "@type": "Organization",
      name: "iGaming Demo",
    },
  };

  if (post.image_url) {
    schema.image = post.image_url;
  }

  if (wordCount > 0) {
    schema.wordCount = wordCount;
  }

  return schema;
}

function createWebsiteSchema(): WebsiteSchema {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://igaming-demo.vercel.app";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "iGaming Demo",
    description:
      "Modern iGaming demo platform built with Next.js, Supabase, and TypeScript",
    url: siteUrl,
    sameAs: [
      "https://twitter.com/igaming_demo",
      "https://github.com/igaming-demo",
    ],
  };
}

function PostJsonLd({ post }: { post: Post }) {
  const schema = createArticleSchema(post);

  return (
    <Script
      id="post-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function WebsiteJsonLd() {
  const schema = createWebsiteSchema();

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function JsonLd({
  post,
  type = "post",
}: {
  post?: Post;
  type?: "post" | "website";
}) {
  if (type === "website") {
    return <WebsiteJsonLd />;
  }

  if (post) {
    return <PostJsonLd post={post} />;
  }

  return null;
}
