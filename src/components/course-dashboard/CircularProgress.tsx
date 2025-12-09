import {type  CircularProgressProps } from "@/types/dashboard/Progress";

export default function CircularProgress({ value, color }: CircularProgressProps) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  const colorMap: { [key: string]: string } = {
    lime: "text-lime-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };

  const strokeColor = colorMap[color] || "text-lime-400";

  return (
    <div className="relative w-32 h-32 mx-auto mb-3">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-neutral-700"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={strokeColor}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white">{value}%</span>
      </div>
    </div>
  );
}
