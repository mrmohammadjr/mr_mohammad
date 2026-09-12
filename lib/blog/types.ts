export type BlogMedia = {
  id: string;
  type: "image" | "video";
  url: string;
  alt: string | null;
  caption: string | null;
  sort_order: number;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  created_at: string;
  blog_media: BlogMedia[];
};