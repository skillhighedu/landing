import { useState } from "react";
import { Input } from "@/components/ui/input";
import BlockQuote from "@/components/common/BlockQuote";

export default function CoursesSearch() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <BlockQuote quote="One skill. A thousand doors." />
      <Input
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:w-[400px] bg-neutral-800 text-white border-0"
      />
    </div>
  );
}
