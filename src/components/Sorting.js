import React from "react";
import Button from "./Button";

export default function Sorting({ label, active, onClick }) {
  return (
    <div>
      <Button
        label={label}
        className={`px-2 py-1 text-sm font-medium ${
          active ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={onClick}
      />
    </div>
  );
}
