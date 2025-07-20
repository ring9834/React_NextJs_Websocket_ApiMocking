// src/app/providers.tsx
"use client";
// to manage data fetching, caching, and state management for asynchronous operations (like API calls)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient: A class from @tanstack/react-query that creates a client instance to manage queries, caching, and other data-fetching operations
const queryClient = new QueryClient({
  defaultOptions: {
    // defaultOptions.queries: Sets default options for all queries managed by this client
    queries: {
      // Specifies that query results are considered "fresh" for 1 minute (60,000 milliseconds). During this time, React Query won’t refetch data unless explicitly invalidated or triggered. This improves performance by reducing unnecessary API calls.
      staleTime: 60 * 1000, // 1 minute cache
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // QueryClientProvider is a React component that provides the QueryClient instance to the component tree via React Context, allowing any component in the tree to use React Query hooks (for example, useQuery, useMutation).
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}