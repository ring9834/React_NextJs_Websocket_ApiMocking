// src/app/posts/page.tsx
// ☆☆☆axiosInstance is a utility for making HTTP requests and can be used in both client-side and server-side contexts. 
// It’s not tied to React’s rendering lifecycle or hooks system.☆☆☆
import axiosInstance from "@/lib/api/axios";
import { PostSchema } from "@/lib/api/schemas";

// This file is a server-side rendered page that fetches posts from the API using axiosInstance.
// Since getPosts is called within an async page component, it runs on the server during rendering (SSR or SSG).
async function getPosts() {
  const res = await axiosInstance.get("/posts");
  // Uses the Zod schema PostSchema.array() to validate that res.data is an array of objects conforming to the Post structure.
  return PostSchema.array().parse(res.data);
}

// A Next.js page component that fetches posts server-side and renders them as a list of <article> elements.
// The async keyword indicates that this is a Server Component in Next.js App Router, allowing it to perform server-side data fetching directly within the component.
export default async function PostsPage() {
  const posts = await getPosts(); // Server-side fetch

  // Renders a <div> containing a list of <article> elements, one for each post.
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
  // ☆☆☆Unlike the Home component (from your previous question), which used React Query (useQuery and useMutation) for client-side 
  // data fetching and mutations, PostsPage is a Server Component that fetches data directly on the server without React Query.☆☆☆
}