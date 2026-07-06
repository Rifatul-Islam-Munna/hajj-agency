import { getBlogPosts } from "../../lib/blog-store";
import BlogManager from "../blogManager";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts({ enabledOnly: false });
  return <BlogManager initialPosts={posts} />;
}
