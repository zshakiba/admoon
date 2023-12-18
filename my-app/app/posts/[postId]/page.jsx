import React from "react";

async function fetchPost({ postId }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await res.json();
  return post;
}

async function PostDetail({ params }) {
  const { postId } = params;
  const post = await fetchPost({ postId }); // Pass an object with postId property

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md mt-8  ml-4">
      <h2 className="text-2xl font-bold mb-4">PostDetail - {postId}</h2>
      <h3 className="text-lg font-bold mb-2">Post Title - {post.title}</h3>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}

export default PostDetail;
