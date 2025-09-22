"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/providers/supabase-provider";
import PostForm from "@/components/cms/PostForm";
import type { CreatePostData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function NewPostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
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

  const handleSubmit = async (data: CreatePostData) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          author_id: user.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create post");
      }

      router.push("/admin");
    } catch (error) {
      console.error("Error creating post:", error);
      throw error; // Re-throw so PostForm can handle it
    }
  };

  return (
    <div>
      {/* Navigation */}
      <div className="flex items-center mb-8">
        <Button onClick={() => router.push("/admin")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Button>
      </div>

      {/* Form */}
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Create New Post
        </h1>
        <PostForm onSubmit={handleSubmit} />
      </Card>
    </div>
  );
}
