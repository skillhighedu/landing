import { useState } from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/common/Button";

export default function ShareComposer() {
  const [text, setText] = useState("");

  const charLimit = 280;
  const remaining = charLimit - text.length;

  const handleShare = (url: string) => {
    if (!text.trim()) return;
    window.open(url, "_blank");
    setText("");
  };

  return (
    <Card className="p-8 space-y-6 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-neutral-900 dark:text-white">
          What did you learn today?
        </h2>

        <span
          className={`text-sm ${
            remaining < 40
              ? "text-amber-500"
              : "text-neutral-500"
          }`}
        >
          {remaining} left
        </span>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={charLimit}
        className="min-h-40"
        placeholder="Write your daily learning update..."
      />

      <div className="grid sm:grid-cols-2 gap-3">
        <CustomButton
          title="Share on X"
          icon={<ArrowUpRight size={16} />}
          disabled={!text.trim()}
          onClick={() =>
            handleShare(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
            )
          }
        />

        <CustomButton
          title="Post on LinkedIn"
          icon={<Linkedin size={16} />}
          disabled={!text.trim()}
          onClick={() =>
            handleShare(
              `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`
            )
          }
        />
      </div>
    </Card>
  );
}
