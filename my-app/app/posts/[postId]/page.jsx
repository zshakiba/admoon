import React from "react";

async function fetchPost({ postId }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await res.json();
  return post;
}

async function PostDetail({ params }) {
  const post = await fetchPost(params.postId);
  return (
    <div>
      <h2>PostDetail - {params.postId}</h2>
      <h3>post title - {post.id}</h3>
      <p>{post.body}</p>
    </div>
  );
}

export default PostDetail;
