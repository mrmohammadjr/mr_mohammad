import { getBlogs } from "@/lib/blog/getBlogs"
import BlogsCard from "./BlogsCard"

async function Blog() {
    const blogs = await getBlogs()
  return (
    <div>
        <BlogsCard blogs={blogs} />
    </div>
  )
}

export default Blog