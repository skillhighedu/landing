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
        <div className="relative w-full md:w-[420px]">
          <div
            className="
              flex items-center gap-3
              rounded-full px-4 py-2.5
              transition-colors

              bg-neutral-100 text-neutral-800
              focus-within:bg-neutral-200

              dark:bg-neutral-800/60 dark:text-white
              dark:focus-within:bg-neutral-800
            "
          >
            <Search className="h-4 w-4 text-neutral-400 dark:text-neutral-400 shrink-0" />

            <Input
              ref={inputRef}
              placeholder="Search skills or courses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                font-serif
                border-0 bg-transparent p-0
                focus-visible:ring-0 focus-visible:ring-offset-0
                placeholder:text-neutral-400
                dark:placeholder:text-neutral-500
              "
            />

            {/* Shortcut hint */}
            <div className="hidden sm:flex items-center gap-1 ml-auto text-xs">
              <kbd
                className="
                  rounded px-1.5 py-0.5
                  bg-neutral-200 text-neutral-600
                  dark:bg-neutral-700 dark:text-neutral-300
                "
              >
                ⌘
              </kbd>
              <kbd
                className="
                  rounded px-1.5 py-0.5
                  bg-neutral-200 text-neutral-600
                  dark:bg-neutral-700 dark:text-neutral-300
                "
              >
                K
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
