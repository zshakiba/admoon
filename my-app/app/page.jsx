import React from "react";
import Link from "next/link";
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-lg text-gray-700">
          Explore and discover amazing content on our platform. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          <Link href={`/grid`}>Get Started</Link>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
