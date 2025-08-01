import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  sectionTitle: string;
  topics: string[];
}

export default function CurriculumSection({ sectionTitle, topics }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-4 rounded-md overflow-hidden border-none   shadow bg-neutral-900">
      <button
        className="w-full flex items-center justify-between  text-white px-6 py-4  text-left"
        onClick={() => setOpen(!open)}
      >
        {sectionTitle}
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="bg-neutral-900 divide-y font-sans divide-gray-900">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="px-6 py-3 text-sm text-gray-300 transition"
            >
              {topic}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
