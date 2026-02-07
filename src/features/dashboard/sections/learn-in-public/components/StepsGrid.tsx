import { Card } from "@/components/ui/card";

const steps = [
  { title: "Write", body: "Share what you learned or built today." },
  { title: "Share", body: "Post it publicly so others can see progress." },
  { title: "Interact", body: "Discuss and learn from others." },
];

export default function StepsGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {steps.map((step, idx) => (
        <Card
          key={step.title}
          className="p-6 space-y-3 border border-neutral-200 dark:border-neutral-800
                     bg-white dark:bg-neutral-900
                     hover:-translate-y-1 hover:shadow-lg
                     transition-all duration-300"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
            Step {idx + 1}
          </p>

          <h3 className="text-xl text-neutral-900 dark:text-white">
            {step.title}
          </h3>

          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {step.body}
          </p>
        </Card>
      ))}
    </div>
  );
}
