"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLivePosts } from "@/lib/api/realtime_websocket";
import { useInfinitePosts } from "@/lib/api/posts";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorFallback from "@/components/ErrorFallback";
import { useTranslations } from "next-intl";

function PostsList() {
  useLivePosts(); // Enable real-time updates
  // "Posts" is the namespace (or key) that identifies a specific group of translations within the messages object(in message.ts).
  const t = useTranslations("Posts"); // Access translations for "Posts" namespace
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfinitePosts();
  if (isLoading) return null;
  return (
    <div>
      {data?.pages?.map((page, idx) =>
        Array.isArray((page as any).posts)
          ? (page as any).posts.map((post: any) => <div key={post.id}>{post.title}</div>)
          : null
      )}
      {hasNextPage && <button onClick={() => fetchNextPage()}>{t("loadMore")}</button>}
    </div>
  );
}

export default function PostsPage() {
  return (
    // ErrorFallback is a component that renders when an error is caught. It receives props like { error, resetErrorBoundary } (from react-error-boundary).
    // The Suspense component is a built-in React feature that handles asynchronous operations (such as data fetching) in its child components.
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <PostsList />
      </Suspense>
    </ErrorBoundary>
  );
}

// Server-Side Setup
// Ensure the WebSocket server emits post:created events with a Post object.

// // Example server (Node.js with Socket.IO)
// io.on("connection", (socket) => {
//   // Verify token in socket.auth
//   socket.on("post:created", (newPost) => {
//     io.emit("post:created", newPost); // Broadcast to all clients
//   });
// });