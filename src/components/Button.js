import React from "react";

export default function Button({
  label,
  className,
  disabled = false,
  onClick,
}) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
