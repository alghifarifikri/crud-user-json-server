import React, { useEffect, useState } from "react";
import { validatePassword } from "../utils/regex";

export default function InputPassword({
  label,
  type,
  value,
  pass,
  keyJson,
  onChange = () => {},
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setIsValid(validatePassword(value, pass));
  }, [value]);

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
      <div className="relative sm:w-3/4">
        <input
          id="text-input"
          type={showPassword ? "text" : type}
          value={value}
          className={`border ${
            isValid ? "border-gray-300" : "border-red-500"
          } rounded-lg py-2 px-4 w-full sm:text-sm`}
          onChange={(text) => {
            onChange({ [keyJson]: text.target.value });
          }}
        />
        <button
          type="button"
          className={`absolute right-3 ${
            isValid ? "top-2/4" : "top-1/4"
          } transform -translate-y-2/4 text-gray-500 hover:text-gray-700 focus:outline-none`}
          onClick={handleTogglePasswordVisibility}
        >
          {showPassword ? "Hide" : "See"}
        </button>
        {!isValid && (
          <p className="text-red-500 text-sm mt-1">
            Min. 6 Char, 1 Capital & 1 Special Char.
          </p>
        )}
      </div>
    </div>
  );
}
