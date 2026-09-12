// lib/blog/getBlogs.ts

import { supabaseAdmin } from "../supabase/client";

export async function getBlogs() {
  try {
    const { data, error } = await supabaseAdmin
      .from("blogs")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        content,
        cover_image,
        created_at,
        blog_media (
          id,
          type,
          url,
          alt,
          caption,
          sort_order
        )
      `,
      )
      .order("created_at", { ascending: false });
    console.log(data, error);
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}
