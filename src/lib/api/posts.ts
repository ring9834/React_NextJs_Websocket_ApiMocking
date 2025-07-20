// src/lib/api/posts.ts
// useQuery: A React Query hook for fetching and caching data.
// useMutation: A React Query hook for performing mutations (creating, updating, or deleting data).
// useQueryClient: A hook to access the QueryClient instance, used for managing the query cache (for example, invalidating or updating cached data).
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// GET Posts
// A custom hook to fetch a list of all posts from the /posts API endpoint.
export const usePosts = () => {
  // useQuery<Post[]>: Uses the useQuery hook, specifying that the query returns an array of Post objects.
  // The useQuery hook returns an object with several properties, including:
  // isLoading: A boolean indicating whether the query is currently fetching data and has no data yet
  // error: An error object (or null) if the query fails
  return useQuery<Post[]>({
    // A unique key to identify the query in the cache. React Query uses this to cache and manage the data.
    queryKey: ["posts"],
    // Defines the function to fetch data. The response data is automatically extracted (Axios returns response.data).
    queryFn: () => axiosInstance.get("/posts"),
  });
};

// GET Single Post
export const usePost = (id: number) => {
  return useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => axiosInstance.get(`/posts/${id}`),
  });
};

// POST Create Post
// A custom hook to create a new post by sending a POST request to the /posts endpoint.
export const useCreatePost = () => {
  // Retrieves the QueryClient instance to interact with the query cache.
  const queryClient = useQueryClient();
  
  // Defines a mutation for creating a post
  // The useMutation hook returns an object with properties, including:
  // mutate: A function to trigger the mutation
  // isPending: A boolean indicating whether the mutation is in progress
  return useMutation({
    // Takes a newPost object, typed as Omit<Post, "id">, meaning it includes title, body, and userId but excludes id (since the server typically generates the id).
    mutationFn: (newPost: Omit<Post, "id">) => 
      axiosInstance.post("/posts", newPost),
    onSuccess: () => { // A callback that runs when the mutation succeeds.
      // Invalidates the cache for the ["posts"] query, triggering a refetch of the posts list to ensure the UI reflects the newly created post.
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Infinite Queries
// This hook is designed to fetch a paginated list of posts and support infinite scrolling or load more functionality, where additional 
// pages of data are fetched as the user scrolls or requests more content.
export const useInfinitePosts = () => {
  // useInfiniteQuery: This is a React Query hook for handling paginated or infinite data fetching. It allows the application to fetch data 
  // in chunks (pages) and provides utilities to manage pagination state.
  return useInfiniteQuery({
    queryKey: ["posts"],
    // initialPageParam specifies the starting page number for pagination (page 1). This is the initial value of pageParam passed to the queryFn.
    // pageParam: The parameter used to track the current page in the pagination. It defaults to 1.
    initialPageParam: 1,
    // The queryFn defines how to fetch data for each page.
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(`/posts?page=${pageParam}`);
      return response.data;
    },
    // This function determines the next page number to fetch (or stops pagination if there are no more pages).
    // lastPage: The data returned from the most recent page fetched.
    // allPages: An array of all previously fetched pages.
    // If lastPage exists and lastPage.hasNext is true, it returns allPages.length + 1 as the next page number.
    getNextPageParam: (lastPage: { hasNext: boolean }, allPages) =>
      lastPage && lastPage.hasNext ? allPages.length + 1 : undefined,
  });
};

// Dependent Queries
// The query is dependent, meaning it only runs when a valid userId is provided.
export const useUserPosts = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => 
      axiosInstance.get(`/posts?userId=${userId}`),
    // enabled: This option controls whether the query should automatically run.
    // The enabled option controls whether the query executes. 
    // If userId is a number, !!userId evaluates to true, and the query runs.
    // If userId is undefined, !!userId evaluates to false, and the query is disabled (no HTTP request is made).
    enabled: !!userId, // Only runs when userId exists
  });
};