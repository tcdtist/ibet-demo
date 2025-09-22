export type Post = {
  id: string;
  title: string;
  slug: string | null;
  content: string | null;
  published: boolean;
  published_at?: string | null; // For compatibility with user specification
  image_url?: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
};

export type CreatePostData = {
  title: string;
  slug?: string | null;
  content?: string | null;
  published?: boolean;
  image_url?: string | null;
  author_id: string;
};

export type UpdatePostData = {
  title?: string;
  slug?: string | null;
  content?: string | null;
  published?: boolean;
  image_url?: string | null;
};
