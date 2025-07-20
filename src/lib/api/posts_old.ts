// src/lib/api/posts.ts
// Example API service for fetching and creating posts
import axiosInstance from "./axios";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

// Promise<Post> tells TypeScript that this function returns a Promise that will eventually resolve to a value of type Post.
// A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.
export const getPostById = async (id: number): Promise<Post> => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await axiosInstance.post("/posts", post);
  return response.data;
};