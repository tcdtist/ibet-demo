"use client";

import { useState, useEffect } from "react";
import type { Post, CreatePostData, UpdatePostData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { generateSlugFromTitle, validateSlug } from "@/lib/seo";

type Props = {
  initial?: Partial<Post>;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
};

export default function PostForm({
  initial = {},
  onSubmit,
  loading = false,
}: Props) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [content, setContent] = useState(initial.content ?? "");
  const [slug, setSlug] = useState(initial.slug ?? "");
  const [published, setPublished] = useState(initial.published ?? false);
  const [imageUrl, setImageUrl] = useState(initial.image_url ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [isSlugTouched, setIsSlugTouched] = useState(false);

  useEffect(() => {
    if (!isSlugTouched && title && !initial.slug) {
      const generatedSlug = generateSlugFromTitle(title);
      setSlug(generatedSlug);
    }
  }, [title, isSlugTouched, initial.slug]);

  useEffect(() => {
    if (slug && isSlugTouched) {
      if (!validateSlug(slug)) {
        setSlugError(
          "Slug must be 3-100 characters, lowercase letters, numbers, and hyphens only"
        );
      } else {
        setSlugError("");
      }
    }
  }, [slug, isSlugTouched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (slug && !validateSlug(slug)) {
      alert("Please fix the slug format");
      return;
    }

    setIsSubmitting(true);
    try {
      const finalSlug = slug.trim() || generateSlugFromTitle(title);

      const data = {
        title: title.trim(),
        content: content.trim() || null,
        slug: finalSlug,
        published,
        image_url: imageUrl.trim() || null,
      };

      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setIsSlugTouched(true);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isSlugTouched) {
      const generatedSlug = generateSlugFromTitle(value);
      setSlug(generatedSlug);
    }
  };

  const regenerateSlug = () => {
    if (title) {
      const generatedSlug = generateSlugFromTitle(title);
      setSlug(generatedSlug);
      setIsSlugTouched(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter post title"
            required
            disabled={isSubmitting || loading}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={regenerateSlug}
              disabled={!title || isSubmitting || loading}
              className="text-xs"
            >
              Regenerate
            </Button>
          </div>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
              slugError
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="post-slug-here"
            disabled={isSubmitting || loading}
          />
          {slugError && (
            <p className="mt-1 text-xs text-red-600">{slugError}</p>
          )}
          {slug && !slugError && (
            <p className="mt-1 text-xs text-gray-500">
              URL will be: /posts/{slug}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image URL
          </label>
          <input
            id="image_url"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
            disabled={isSubmitting || loading}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your post content here..."
            disabled={isSubmitting || loading}
          />
        </div>

        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isSubmitting || loading}
          />
          <label
            htmlFor="published"
            className="ml-2 block text-sm text-gray-900"
          >
            Publish immediately
          </label>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting || loading || !title.trim()}
            className="flex-1 sm:flex-none"
          >
            {isSubmitting ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
