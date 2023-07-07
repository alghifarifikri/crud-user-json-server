import React from "react";
import Button from "./Button";

export default function Searchbar({ handleSubmit, searchValue, handleChange }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchValue}
        onChange={(param) => handleChange(param)}
        placeholder="Search (First / Last Name, Username, Email)"
        className="border border-gray-300 rounded-lg py-2 px-4 sm:w-64"
        onKeyDown={handleKeyDown}
      />
      <Button
        label={"Search"}
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-lg"
        }
        onClick={handleSubmit}
      />
    </div>
  );
}
