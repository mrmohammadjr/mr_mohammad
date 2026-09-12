import { supabaseAdmin } from "../supabase/client";

export async function getProjects() {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select(
        `
        id,
        slug,
        title,
        description,
        long_description,
        image_url,
        year,
        category,
        technologies,
        github,
        live,
        sort_order
      `,
      )
      .order("sort_order", { ascending: true });

    if (error) console.error("Error fetching projects:", error);
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}