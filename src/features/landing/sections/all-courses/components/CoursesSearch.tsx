import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import BlockQuote from "@/components/common/BlockQuote";
import { Search } from "lucide-react";
import { useSearchShortcut } from "@/hooks/useSearchShortcut";

export default function CoursesSearch() {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useSearchShortcut(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Quote */}
        <BlockQuote quote="One skill. A thousand doors." />

        {/* Search */}
        <div className="relative w-full md:w-[420px] ">
          <div
            className="
              flex items-center gap-3
              rounded-full
              bg-neutral-800/60
              px-4 py-2.5
              transition
              focus-within:bg-neutral-800
            "
          >
            <Search className="h-4 w-4 text-gray-400 shrink-0 " />

            <Input
              ref={inputRef}
              
              placeholder="Search skills or courses "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-serif
           
          
              "
            />

            {/* Shortcut hint */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 ml-auto">
              <kbd className="rounded bg-neutral-700 px-1.5 py-0.5">⌘</kbd>
              <kbd className="rounded bg-neutral-700 px-1.5 py-0.5">K</kbd>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
