// src/app/page.tsx
"use client";
import { usePosts, useCreatePost } from "@/lib/api/posts";

export default function Home() {
  // data: posts - Renames the data property to posts, which is an array of Post
  // isLoading: A boolean indicating whether the query is fetching data
  // error: An error object (or null) if the query fails
  const { data: posts, isLoading, error } = usePosts();
  // mutate: createPost - Renames the mutate function to createPost. This function triggers the POST request to create a new post
  // isPending: A boolean indicating whether the mutation is in progress
  const { mutate: createPost, isPending } = useCreatePost();

  const handleCreate = () => {
    createPost(
      { title: "New Post", body: "Hello, world!", userId: 1 },
      // Second Argument: An options object with callbacks
      // onSuccess: A callback that runs when the mutation succeeds
      // The useCreatePost hook already invalidates the ["posts"] query cache on success (per its definition), so the posts list will automatically refetch to include the new post
      {
        onSuccess: (data) => {
          console.log("Post created:", data);
          alert("Post created!");
        },
        onError: (err) => {
          console.error("Creation failed:", err);
        },
      }
      // The mutate function from useMutation is designed to accept an optional second argument: a configuration object that can override or extend 
      // the mutation’s behavior for that specific call. This object can include callbacks like onSuccess, onError, onMutate, and onSettled, which allow you to handle the mutation’s lifecycle on a per-call basis.
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <button
        onClick={handleCreate}
        disabled={isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
      
      <ul className="mt-4 space-y-2">
        {posts?.map((post) => (
          <li key={post.id} className="border p-2 rounded">
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}