import { Briefcase } from "lucide-react";

export default function EmptyBountyState({
  title = "No bounties available right now",
  subtitle = "Check back later, new opportunities will appear here.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Briefcase className="h-8 w-8 opacity-70" />
      </div>

      <h3 className="font-mono text-lg">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}
