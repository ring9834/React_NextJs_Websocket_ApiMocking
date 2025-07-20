// src/lib/api/realtime.ts
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Post } from "@/lib/api/posts";

// The code establishes a WebSocket connection to receive real-time updates about new posts and updates the cached data 
// in React Query when a new post is created.

// Initializes a Socket.IO client instance to connect to a WebSocket server.
// io is the Socket.IO client function from the socket.io-client library, used to create a WebSocket connection.
// process.env.NEXT_PUBLIC_WS_URL!: The WebSocket server URL, stored in an environment variable
// The ! (non-null assertion) assumes the variable is defined, which should be verified in production to avoid runtime errors.
const socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
  // Prevents the socket from connecting immediately upon initialization. The connection is manually triggered later using socket.connect().
  autoConnect: false,
});

// Connects the Socket.IO client to the server with an authentication token.
// token (string), is likely a JWT or similar for authenticating the WebSocket connection
export const connectSocket = (token: string) => {
  // Sets the authentication token in the socket's auth object, which is sent to the server during the connection handshake.
  socket.auth = { token };
  // Manually initiates the WebSocket connection to the server.
  socket.connect();
};

// A React hook that listens for real-time post:created events from the WebSocket server and updates the React Query cache with new posts.
export const useLivePosts = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Listens for the post:created event emitted by the Socket.IO server.
    // When a new post is created, the callback function receives the newPost data.
    // It updates the cached posts in React Query by appending the new post to the existing posts array.
    socket.on("post:created", (newPost: Post) => {
      // Updates the React Query cache for the ["posts"] query key.
      // The callback receives the current cached data (old, typed as Post[] or undefined).
      // It returns a new array appending newPost to the existing posts: [...(old || []), newPost].
      queryClient.setQueryData<Post[]>(["posts"], (old) => 
        [...(old || []), newPost]
      );
    });
    // ☆☆☆This updates the UI in real-time without refetching data, as components using useInfinitePosts (which uses the ["posts"] key) 
    // will re-render with the new post.☆☆☆

    // When the component unmounts, the post:created event listener is removed to prevent memory leaks or duplicate listeners if the component remounts.
    return () => {
      socket.off("post:created");
    };
  }, [queryClient]);
};