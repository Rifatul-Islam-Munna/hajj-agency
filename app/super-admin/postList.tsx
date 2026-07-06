import Link from "next/link";
import type { BlogPost } from "../lib/cms-db";
export default function PostList({ posts }: { posts: BlogPost[] }) {
  return <div><div className="admin-page-head"><h1 className="admin-title">Blog</h1><Link className="admin-button" href="/super-admin/blog/new">Create Post</Link></div><div className="admin-table-card"><table className="admin-table"><thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Action</th></tr></thead><tbody>{posts.map((post) => <tr key={post.id}><td>{post.title}</td><td>{post.category}</td><td>{post.enabled ? "Published" : "Draft"}</td><td><Link href={`/super-admin/blog/${post.id}/edit`}>Edit</Link></td></tr>)}</tbody></table></div></div>;
}
