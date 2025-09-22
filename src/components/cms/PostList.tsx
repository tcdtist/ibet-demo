"use client";

import useSWR from "swr";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Eye, Calendar } from "lucide-react";

async function fetcher(url: string): Promise<Post[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

type Props = {
  onDelete?: (id: string) => void;
};

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4">Error loading posts</div>
      <Button onClick={onRetry} variant="outline">
        Try Again
      </Button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </Card>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-500 mb-4">No posts found</div>
      <Link href="/admin/new">
        <Button>Create your first post</Button>
      </Link>
    </div>
  );
}

function PostItem({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: (post: Post) => void;
}) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
              {post.title}
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                post.published
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
          </div>

          {post.slug && (
            <p className="text-sm text-gray-500 mb-2">
              Slug:{" "}
              <code className="bg-gray-100 px-1 rounded">{post.slug}</code>
            </p>
          )}

          {post.content && (
            <p className="text-gray-600 line-clamp-2 mb-3">
              {post.content.length > 150
                ? `${post.content.substring(0, 150)}...`
                : post.content}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            {post.updated_at !== post.created_at && (
              <div className="flex items-center gap-1">
                <span>
                  Updated: {new Date(post.updated_at).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {post.published && (
            <Button
              variant="outline"
              size="sm"
              disabled
              title="Preview (Coming Soon)"
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}
          <Link href={`/admin/${post.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(post)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function PostList({ onDelete }: Props) {
  const {
    data: posts,
    error,
    isLoading,
    mutate,
  } = useSWR<Post[]>("/api/posts", fetcher);

  const handleDelete = async (post: Post) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");

      mutate();

      if (onDelete) onDelete(post.id);
    } catch (error) {
      alert("Failed to delete post. Please try again.");
    }
  };

  if (error) return <ErrorState onRetry={mutate} />;
  if (isLoading) return <LoadingState />;
  if (!posts || posts.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
}
