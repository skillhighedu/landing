import { useRef } from "react";
import { Input } from "@/components/ui/input";
import BlockQuote from "@/components/common/BlockQuote";
import { Search, X } from "lucide-react";
import { useSearchShortcut } from "@/hooks/useSearchShortcut";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  totalCourses: number;
}

export default function CoursesSearch({ search, setSearch, totalCourses }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSearch = search.trim().length > 0;

  useSearchShortcut(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
        <div className="space-y-2">
          <BlockQuote quote="One skill. A thousand doors." />
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white/90 p-2.5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] dark:border-neutral-800 dark:bg-neutral-950/70">
          <div className="mb-2 flex items-center justify-between gap-3 px-2">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-primary">
                Course Search
              </p>
              <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                {hasSearch
                  ? `${totalCourses} result${totalCourses === 1 ? "" : "s"} found`
                  : `Browse ${totalCourses} available course${totalCourses === 1 ? "" : "s"}`}
              </p>
            </div>

            {hasSearch ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-mono text-neutral-700 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            ) : null}
          </div>

          <div className="rounded-[18px] border border-neutral-200/80 bg-neutral-50/80 p-2 dark:border-neutral-800 dark:bg-neutral-900/70">
            <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 transition dark:bg-neutral-950">
              <Search className="h-4 w-4 shrink-0 text-neutral-400" />

              <Input
                ref={inputRef}
                placeholder="Search skills, tools, or course names"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-auto border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-400"
              />

              <div className="ml-auto hidden items-center gap-1 text-neutral-900 dark:text-neutral-50 text-xs sm:flex">
                <kbd className="rounded-md border border-neutral-200 dark:bg-neutral-100 px-1.5 py-0.5 font-mono dark:border-neutral-700 dark:bg-neutral-800">
                  Ctrl
                </kbd>
                <kbd className="rounded-md border border-neutral-200 dark:bg-neutral-100 px-1.5 py-0.5 font-mono dark:border-neutral-700 dark:bg-neutral-800">
                  K
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
