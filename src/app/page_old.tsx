// src/app/page.tsx

// The "use client" directive tells Next.js that the component or file should be executed on the client-side (in the browser) 
// rather than on the server. By default, Next.js assumes components are Server Components unless explicitly marked with "use client"
// Client Components are necessary when a component relies on browser-specific features or React hooks that only work in the client environment,
// such as useState, useEffect, useContext, onClick, onChange, window, document, or localStorage etc.
"use client"; // Required since we're using hooks

import { useEffect, useState } from "react";
import { getPosts, createPost, Post } from "@/lib/api/posts_old";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    const newPost = { title: "New Post", body: "Hello, world!", userId: 1 };
    try {
      const createdPost = await createPost(newPost);
      console.log("Created post:", createdPost);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleCreatePost}>Create Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}