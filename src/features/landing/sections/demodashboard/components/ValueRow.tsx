import React from "react";

export default function ValueRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs font-sans text-neutral-600 dark:text-neutral-400">
          {desc}
        </p>
      </div>
    </div>
  );
}
