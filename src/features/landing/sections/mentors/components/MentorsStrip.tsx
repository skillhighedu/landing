import type { Mentor } from "../types";

interface Props {
  mentors: Mentor[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function MentorsStrip({
  mentors,
  activeIndex,
  onSelect,
}: Props) {
  return (
    <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
      {mentors.map((mentor, index) => (
        <button
          key={mentor.id}
          onClick={() => onSelect(index)}
          className={`min-w-[180px] rounded-xl p-3 text-left transition
            ${
              activeIndex === index
                ? "bg-white text-black"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
        >
          <p className="font-medium">{mentor.name}</p>
          <p className="text-xs opacity-70">{mentor.qualification}</p>
        </button>
      ))}
    </div>
  );
}
