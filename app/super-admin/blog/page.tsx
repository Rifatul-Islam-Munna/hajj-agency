import { getBlogPostById, getBlogPosts } from "../../lib/blog-store";
import BlogManager from "../blogManager";
import PostList from "../postList";

export default async function AdminBlogPage({ searchParams }: { searchParams: Promise<{ mode?: string; id?: string }> }) {
  const params = await searchParams;
  if (params.mode === "create") return <BlogManager initialPosts={[]} />;
  if (params.mode === "edit" && Number(params.id)) {
    const post = await getBlogPostById(Number(params.id));
    return <BlogManager initialPosts={post ? [post] : []} />;
  }
  return <PostList posts={await getBlogPosts({ enabledOnly: false })} />;
}
