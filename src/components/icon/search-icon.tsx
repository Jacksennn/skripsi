import React from "react";

export default function SearchIcon({
  size = 32,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size + 1}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5625 15.625C13.1869 15.625 16.125 12.6869 16.125 9.0625C16.125 5.43813 13.1869 2.5 9.5625 2.5C5.93813 2.5 3 5.43813 3 9.0625C3 12.6869 5.93813 15.625 9.5625 15.625Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.2031 13.7031L18 17.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
