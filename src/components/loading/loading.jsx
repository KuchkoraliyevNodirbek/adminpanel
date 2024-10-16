import React from "react";

export const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 w-full">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          {/* Loading text */}
          <p className="text-white text-xl mt-4">Loading...</p>
        </div>
      </div>
    </>
  );
};
