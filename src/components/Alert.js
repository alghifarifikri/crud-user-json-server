import React from "react";

export default function Alert({ message, type }) {
  return (
    <div
      className={`${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white text-center py-2 px-4 rounded-md`}
    >
      {message}
    </div>
  );
}
