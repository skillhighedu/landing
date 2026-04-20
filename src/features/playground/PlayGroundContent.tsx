import LessonDiscussionSection from "@/features/discussion/components/LessonDiscussionSection";
import Player from "@/features/dashboard/components/player/Player";
import Actions from "@/features/dashboard/components/actions/Actions";
import Description from "@/features/dashboard/components/Description";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import type { CourseLesson } from "../dashboard/types";

export default function PlayGroundContent({
  slug,
  mode,
  lessons,
  currentLesson,
  setCurrentLesson,
  activeTab,
  setActiveTab,
  onPlayerHeightChange,
}: {
  slug: string;
  mode: "demo" | "real";
  lessons: CourseLesson[];
  currentLesson: CourseLesson | null;
  setCurrentLesson: (lesson: CourseLesson) => void;
  activeTab: "description" | "questions";
  setActiveTab: (tab: "description" | "questions") => void;
  onPlayerHeightChange?: (height: number) => void;
}) {
  const playerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const playerCard = playerCardRef.current;
    if (!playerCard || !onPlayerHeightChange) return;

    const updatePlayerHeight = () => {
      onPlayerHeightChange(playerCard.getBoundingClientRect().height);
    };

    updatePlayerHeight();

    const resizeObserver = new ResizeObserver(updatePlayerHeight);
    resizeObserver.observe(playerCard);
    window.addEventListener("resize", updatePlayerHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePlayerHeight);
    };
  }, [currentLesson?.id, onPlayerHeightChange]);

  if (!currentLesson) return null;

  return (
    <div className="min-w-0 space-y-6">
      <div
        ref={playerCardRef}
        className="rounded-[1.5rem] border border-border bg-card p-3 shadow-sm sm:p-4"
      >
        <Player currentLesson={currentLesson} />
      </div>

      <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:p-5">
        <Actions
          lessons={lessons}
          currentLesson={currentLesson}
          onChangeLesson={setCurrentLesson}
        />
      </div>

      <section className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
          {[
            { id: "description", label: "Description" },
            { id: "questions", label: "Questions" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "description" | "questions")}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition sm:text-sm",
                activeTab === tab.id
                  ? "border-primary bg-primary text-white"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activeTab === "description" ? (
            <Description description={currentLesson.description} />
          ) : (
            <LessonDiscussionSection
              slug={slug}
              topicId={currentLesson.id}
              topicTitle={currentLesson.title}
              mode={mode}
            />
          )}
        </div>
      </section>
    </div>
  );
}
