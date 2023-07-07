import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
