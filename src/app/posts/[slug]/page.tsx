import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createServerComponentClient } from "@/lib/supabase-server";
import { getPostMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import type { Post } from "@/lib/types";

interface PostPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const supabase = createServerComponentClient();
    const { data, error } = await (supabase as any)
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested post could not be found.",
    };
  }

  return getPostMetadata(post);
}

function PostContent({ post }: { post: Post }) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.updated_at !== post.created_at && (
            <span>
              Updated:{" "}
              {new Date(post.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-8"
          />
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        {post.content?.split("\n").map(
          (paragraph, index) =>
            paragraph.trim() && (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            )
        )}
      </div>
    </article>
  );
}

function NotFoundContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
      <p className="text-gray-600 mb-8">
        The post you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd post={post} />
      <PostContent post={post} />
    </>
  );
}
