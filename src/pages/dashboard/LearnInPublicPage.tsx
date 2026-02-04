import React, {
  useMemo,
  useState,
} from "react";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";
import BackButton from "@/components/common/BackButton";;

// -------- Custom UI Components -------- //

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonProps>) {
  const variantClasses =
    variant === "primary"
      ? "bg-green-600 hover:bg-green-700 text-white"
      : "bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-600";

  return (
    <button
      className={`px-4 py-2 rounded-xl font-normal tracking-tight transition duration-200 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full p-4 border border-neutral-700 rounded-2xl bg-neutral-900 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-base resize-none transition font-normal ${className}`}
      {...props}
    />
  );
}

type CardProps = PropsWithChildren<
  ComponentPropsWithoutRef<"div"> & {
    tone?: "default" | "muted";
  }
>;

export function Card({
  children,
  className = "",
  tone = "default",
}: CardProps) {
  const toneClasses =
    tone === "muted"
      ? "bg-neutral-800/50 border-neutral-700"
      : "bg-neutral-800 border-neutral-700";

  return (
    <div className={`rounded-3xl border ${toneClasses} ${className}`}>
      {children}
    </div>
  );
}

const bulletClass =
  "relative pl-5 text-left text-sm text-gray-300 font-normal leading-relaxed before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-green-500";

function LearnInPublicInsights() {
  const sections = [
    {
      title: "About this feature",
      description: "A quick way to log what you worked on or learned each day.",
      bullets: [
        "Write your update in minutes, not hours.",
        "Shows steady proof of your progress over time.",
        "Keeps your profile active and visible without extra effort.",
        "Opens doors by showing you're consistent and serious about your skills.",
      ],
    },
    {
      title: "What to share",
      description:
        "Keep it short and honest. Just share what actually happened today.",
      bullets: [
        "Bugs you fixed or problems you solved.",
        "New concepts, tools, or ideas you explored.",
        "Projects you started or made progress on.",
        "Issues you're stuck on right now.",
        "Any small win, metric, or question you're thinking about.",
      ],
    },
    {
      title: "How it helps",
      description:
        "Small daily updates build trust faster than big polished posts.",
      bullets: [
        "Shows consistency to hiring managers and teammates.",
        "Brings in feedback from people who can help.",
        "Creates a searchable record of everything you've learned.",
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-7 space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-gray-500 font-normal">
          Why it matters
        </p>
        <h2 className="text-2xl font-normal text-white">
          About the Learn In Public{" "}
        </h2>
        <p className="text-sm text-gray-300 max-w-3xl font-normal">
          Keep momentum visible by logging micro-updates. These entries act like
          shipping receipts for your curiosity and work ethic.
        </p>
        <ul className="space-y-3">
          {sections[0] &&
            sections[0].bullets.map((point) => (
              <li key={point} className={bulletClass}>
                {point}
              </li>
            ))}
        </ul>
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        {sections.slice(1).map((section) => (
          <Card key={section.title} className="p-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-normal">
              {section.title}
            </p>
            <p className="text-sm text-gray-300 font-normal">
              {section.description}
            </p>
            <ul className="space-y-3">
              {section.bullets.map((point) => (
                <li key={point} className={bulletClass}>
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ------------- Main Learn In Public Feature ------------- //

type SharePlatform = "x" | "linkedin";

export default function LearnInPublicPage() {
  const [text, setText] = useState("");
  const [isSharing, setIsSharing] = useState<SharePlatform | null>(null);

  const platformConfigs: Record<
    SharePlatform,
    {
      label: string;
      badge: string | React.ReactNode;
      signature: string;
      variant: "primary" | "secondary";
      builder: (encodedPayload: string) => string;
    }
  > = {
    x: {
      label: "Share on X",
      badge: <ArrowUpRight size={16} />,
      signature: "#LearnInPublic #SkillHigh @SkillHighedu",
      variant: "primary",
      builder: (encoded) => `https://twitter.com/intent/tweet?text=${encoded}`,
    },
    linkedin: {
      label: "Post on LinkedIn",
      badge: <Linkedin size={16} />,
      signature: "#LearnInPublic #SkillHigh ",
      variant: "secondary",
      builder: (encoded) =>
        `https://www.linkedin.com/feed/?shareActive=true&text=${encoded}`,
    },
  };

  const signatureSuffix = `\n\n${platformConfigs.x.signature}`;
  const charLimit = Math.max(280 - signatureSuffix.length, 0);
  const characters = text.trim().length;
  const remaining = Math.max(charLimit - characters, 0);

  const quickPrompts = useMemo(
    () => [
      "Today I learned that...",
      "A challenge I overcame:",
      "One insight from building:",
      "A question I'm now exploring:",
    ],
    [],
  );

  const handleShare = (platform: SharePlatform) => {
    if (!text.trim()) return;

    const signature = platformConfigs[platform].signature;
    const payload = `${text.trim()}\n\n${signature}`;
    const encoded = encodeURIComponent(payload);

    setIsSharing(platform);
    window.open(
      platformConfigs[platform].builder(encoded),
      "_blank",
      "noopener,noreferrer",
    );
    setText("");
    setTimeout(() => setIsSharing(null), 600);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 to-neutral-900 font-sans">
      <div className="w-full max-w-6xl mx-auto py-12 px-4 space-y-10 text-white">
        {/* Back Button */}
        <BackButton />
        
        {/* Header */}
        <Card className="p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none" />
          <div className="relative space-y-5 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-600 text-white text-xs tracking-[0.2em] uppercase font-normal">
              Learn In Public
            </span>
            <h1 className="text-4xl font-normal tracking-tight text-white">
              Show your work. Show your progress.
            </h1>
            <p className="text-base text-gray-300 mx-auto max-w-2xl font-normal">
              Log what you build, fix, or learn. These small updates compound into
              proof of skill, discipline, and direction. The journey matters more
              than polished results.
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Write",
              body: "Share what you learned or built today. Keep it short and honest.",
            },
            {
              title: "Share",
              body: "Post it publicly so others can see your progress.",
            },
            {
              title: "Interact",
              body: "Reply, discuss, and learn from others in the community.",
            },
          ].map((step, idx) => (
            <Card
              key={step.title}
              className="p-6 space-y-2 bg-blue-600 hover:bg-blue-700 transition-colors border-blue-500"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/80 font-normal">
                Step {idx + 1}
              </p>
              <h3 className="text-xl font-normal text-white">
                {step.title}
              </h3>
              <p className="text-sm text-white/90 font-normal">
                {step.body}
              </p>
            </Card>
          ))}
        </div>

        <LearnInPublicInsights />

        {/* Input Section */}
        <Card className="p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 font-normal">
                Daily log
              </p>
              <h2 className="text-2xl font-normal text-white">
                What did you learn today?
              </h2>
            </div>
            <span
              className={`text-sm font-normal ${
                remaining < 40
                  ? "text-amber-500"
                  : "text-gray-400"
              }`}
            >
              {remaining} characters left
            </span>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write what you learned today…"
            maxLength={charLimit}
            className="min-h-40"
          />
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() =>
                  setText((prev) => (prev ? `${prev}\n${prompt} ` : `${prompt} `))
                }
                className="text-xs font-normal px-3 py-1.5 rounded-full border border-neutral-700 bg-neutral-800 hover:border-neutral-600 text-gray-300 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(platformConfigs) as SharePlatform[]).map((platform) => {
              const config = platformConfigs[platform];
              return (
                <Button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  disabled={!text.trim() || !!isSharing}
                  className="w-full py-4 text-lg flex items-center justify-center gap-2 cursor-pointer"
                  variant={config.variant}
                >
                  <span>
                    {isSharing === platform ? "Opening…" : config.label}
                  </span>
                  <span className="text-sm opacity-70">{config.badge}</span>
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
