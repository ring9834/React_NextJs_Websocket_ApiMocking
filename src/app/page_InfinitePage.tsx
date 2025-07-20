
"use client";

import { useInfinitePosts } from "@/lib/api/posts";


export default async function PostsPage() {
    const { data, fetchNextPage, hasNextPage, isLoading } = useInfinitePosts();

    if (isLoading) return <div>Loading...</div>;

    return (
    <div>
        {
        // data: Contains the fetched data, structured as { pages: [page1, page2, ...], pageParams: [1, 2, ...] }, 
        // where each page is an object like { posts: [{ id: 1, title: "Post 1" }, ...], hasNext: boolean }.
        /* {data.pages.map((page) =>
        page.posts.map((post) => <div key={post.id}>{post.title}</div>)
        )} */}
        {hasNextPage && <button onClick={() => fetchNextPage()}>load More</button>}
    </div>
    );
}