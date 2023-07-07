import React, { useEffect, useState } from "react";
import { validateEmail } from "../utils/regex";
import DatePicker from "react-datepicker";
import moment from "moment";

export default function Input({
  label,
  type,
  value,
  keyJson,
  onChange = () => {},
}) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (label === "Email") setIsValid(validateEmail(value));
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
        {type === "date" ? (
          <DatePicker
            minDate={new Date()}
            onChange={(text) => {
              onChange({ [keyJson]: moment(text).format("YYYY-MM-DD") });
            }}
            className={`border ${
              !isValid && label === "Email"
                ? "border-red-300"
                : "border-gray-300"
            } border-gray-300 rounded-lg py-2 px-4 w-full sm:text-sm`}
            value={value}
          />
        ) : (
          <input
            id="text-input"
            type={type}
            value={value}
            className={`border ${
              !isValid && label === "Email"
                ? "border-red-300"
                : "border-gray-300"
            } border-gray-300 rounded-lg py-2 px-4 w-full sm:text-sm`}
            onChange={(text) => {
              onChange({ [keyJson]: text.target.value });
            }}
          />
        )}
        {!isValid && label === "Email" && (
          <p className="text-red-500 text-sm mt-1">
            Input email harus sesuai format
          </p>
        )}
      </div>
    </div>
  );
}
