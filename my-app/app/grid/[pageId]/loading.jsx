import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-solid"></div>
      <p className="ml-4 text-gray-700 text-lg">Loading...</p>
    </div>
  );
}

export default Loading;
