"use client";

import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/providers/supabase-provider";
import useSWR from "swr";
import PostForm from "@/components/cms/PostForm";
import type { Post, UpdatePostData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

async function fetcher(url: string): Promise<Post> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading } = useAuth();

  const {
    data: post,
    error,
    isLoading,
  } = useSWR<Post>(params?.id ? `/api/posts/${params.id}` : null, fetcher);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading post</div>
        <Button onClick={() => router.push("/admin")} variant="outline">
          Back to Posts
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">Post not found</div>
        <Button onClick={() => router.push("/admin")} variant="outline">
          Back to Posts
        </Button>
      </div>
    );
  }

  const handleSubmit = async (data: UpdatePostData) => {
    try {
      const response = await fetch(`/api/posts/${params?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update post");
      }

      router.push("/admin");
    } catch (error) {
      console.error("Error updating post:", error);
      throw error; // Re-throw so PostForm can handle it
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${params?.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete post");
      }

      router.push("/admin");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <div>
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Button onClick={() => router.push("/admin")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Button>

        <Button
          onClick={handleDelete}
          variant="outline"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Delete Post
        </Button>
      </div>

      {/* Form */}
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Post</h1>
        <p className="text-gray-600 mb-8">
          Created on {new Date(post.created_at).toLocaleDateString()}
          {post.updated_at !== post.created_at && (
            <span className="ml-2">
              • Updated on {new Date(post.updated_at).toLocaleDateString()}
            </span>
          )}
        </p>
        <PostForm initial={post} onSubmit={handleSubmit} />
      </Card>
    </div>
  );
}
