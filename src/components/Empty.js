import React from "react";

export default function Empty() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-gray-500 mb-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.293 3.293a1 1 0 0 1 1.414 0L10 8.586l5.293-5.293a1 1 0 0 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 1 1-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L8.586 10 3.293 4.707a1 1 0 0 1 0-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-gray-500 text-sm">No data available</p>
    </div>
  );
}
