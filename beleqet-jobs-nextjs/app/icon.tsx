import Image from "next/image";

export default function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <rect width="100" height="100" fill="#2563eb" rx="20" />
      <text
        x="50"
        y="65"
        fontSize="50"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
      >
        B
      </text>
    </svg>
  );
}
