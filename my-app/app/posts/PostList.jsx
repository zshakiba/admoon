import React from "react";
import Link from "next/link";

async function fetchPosts() {
  const res = await fetch("https://jsonPlaceholder.typicode.com/posts");
  const posts = await res.json();
  return posts;
}

async function PostList() {
  const posts = await fetchPosts();
  console.log(posts);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">PostList</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border-b-2 pb-4">
            <article>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
              <p className="mt-2">
                <Link className="text-blue-600" href={`/posts/${post.id}`}>
                  View Details
                </Link>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
