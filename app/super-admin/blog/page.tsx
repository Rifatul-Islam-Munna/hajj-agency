import { getBlogPosts } from "../../lib/blog-store";
import PostList from "../postList";

export default async function AdminBlogPage() {
  return <PostList posts={await getBlogPosts({ enabledOnly: false })} />;
}
