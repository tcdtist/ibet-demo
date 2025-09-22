import { MetadataRoute } from "next";
import { createServerComponentClient } from "@/lib/supabase-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://igaming-demo.vercel.app";

  try {
    const supabase = createServerComponentClient();
    const { data: posts } = await (supabase as any)
      .from("posts")
      .select("slug, created_at, updated_at, published")
      .eq("published", true)
      .not("slug", "is", null);

    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${siteUrl}/login`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.3,
      },
      {
        url: `${siteUrl}/dashboard`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
    ];

    const postRoutes: MetadataRoute.Sitemap =
      posts?.map((post: any) => ({
        url: `${siteUrl}/posts/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })) || [];

    return [...staticRoutes, ...postRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}
