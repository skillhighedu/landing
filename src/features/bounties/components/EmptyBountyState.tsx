import { Briefcase } from "lucide-react";

export default function EmptyBountyState({
  title = "No bounties available right now",
  subtitle = "Check back later — new opportunities will appear here.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-full bg-muted mb-4">
        <Briefcase className="w-8 h-8 opacity-70" />
      </div>

      <h3 className="text-lg ">{title}</h3>
      <p className="text-sm font-sans text-muted-foreground mt-1 max-w-md">
        {subtitle}
      </p>
    </div>
  );
}
