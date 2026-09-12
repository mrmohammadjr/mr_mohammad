import { notFound } from "next/navigation";

import BlogModal from "../../../components/sections/BlogModal";
import { getBlogs } from "@/lib/blog/getBlogs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogModalPage({
  params,
}: Props) {
 const { slug } = await params;
  const blogs = await getBlogs()
  const post = blogs?.find(
    (post) => post.slug === slug,
  );


  if (!post) {
    notFound();
  }

  return <BlogModal post={post} />;
}