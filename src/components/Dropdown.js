import React, { useState } from "react";

export default function Dropdown({
  label,
  options,
  value,
  keyJson,
  onChange = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearch = (param) => {
    setSearchValue(param);
    const temp = options.filter((option) =>
      option.label?.toLowerCase().includes(param?.toLowerCase())
    );
    setFilteredOptions(temp);
  };

  return (
    <div className="mb-4 sm:flex sm:items-center">
      {label && (
        <label
          htmlFor="text-input"
          className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-1/4"
        >
          {label} :
        </label>
      )}
      <div className="relative sm:w-3/4 z-10">
        <div
          id="dropdown"
          className="w-full border border-gray-300 rounded-lg py-2 px-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? (
            <span>
              {
                options?.filter((option) => {
                  return option.value === value;
                })?.[0]?.label
              }
            </span>
          ) : (
            <span className="text-gray-500">Select an option</span>
          )}
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1">
            <input
              type="text"
              className="w-full border-b border-gray-300 rounded-none py-2 px-4"
              value={searchValue}
              placeholder="Search..."
              onChange={(text) => handleSearch(text.target.value)}
            />
            <ul className="max-h-40 overflow-y-auto py-1">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                  onClick={() => {
                    onChange({ [keyJson]: option.value });
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
