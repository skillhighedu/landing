import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Player from "@/features/dashboard/components/Player";
import Sidebar from "@/features/dashboard/components/LessonsList";
import Description from "@/features/dashboard/components/Description";
import HeaderSection from "@/components/common/HeaderSection";
import Actions from "@/features/dashboard/components/Actions";
import { useLessons, useLessonsCheckboxStatus, useToggleLessonCompletion } from "@/hooks/tanstack/useCourses";
import type { LessonTopic } from "@/types/course";
import LessonHeader from "./LessonHeader";
import LearnInPublic from "@/features/dashboard/components/LearnInPublic";

import DashboardLayout from "@/layouts/DashboardLayout";

/* ===================================================== */

export default function PlayGround() {
  const { slug } = useParams<{ slug: string }>();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<LessonTopic | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] =
    useState<"content" | "discussion">("content");

 const { data: completedLessons } = useLessonsCheckboxStatus(slug ?? "");

  const { data, isLoading, isError } = useLessons(slug ?? "");
const toggleCompletion = useToggleLessonCompletion();

 const completedLessonId = completedLessons?.completedLessonIds ?? [];
const completedSet = Array.from(new Set(completedLessonId));



  const lessons = data?.courseLessons ?? [];

  useEffect(() => {
    if (!currentLesson && lessons.length > 0) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons, currentLesson]);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId],
    );
  };

  return (
    <DashboardLayout>
 <div className="min-h-screen flex text-white space-x-0 ">



      {/* ===== MAIN CONTENT (ADJUSTS ON HOVER) ===== */}
      <div
        className="
          flex-1
          pl-4  lg:peer-hover:pl-56
          transition-all duration-300 ease-in-out
          px-4 sm:px-6 py-6 
        "
      >
        {/* ================= Header ================= */}
        <header className=" mb-4">
          <HeaderSection title={data?.courseDetails?.name || "Course"} />

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10"
          >
            ☰
          </button>
        </header>

        {/* ================= Layout ================= */}
        <div className="flex gap-6 items-start">
          <main className="flex-1 space-y-6 min-w-0">
            <section className="rounded-2xl border border-white/10 bg-neutral-900/80 p-4 sm:p-6 lg:p-8">
              {isLoading && <Skeleton />}
              {isError && <ErrorBox />}

              {!isLoading && !isError && currentLesson && (
                <div className="max-w-5xl mx-auto space-y-6">
                  <LessonHeader title={currentLesson.title} />
                  <Player currentLesson={currentLesson} />
                  <Actions
                    lessons={lessons}
                    currentLesson={currentLesson}
                    onChangeLesson={setCurrentLesson}
                    onOpenDiscussion={() => setActiveTab("discussion")}
                  />
                </div>
              )}
            </section>

            {!isLoading && !isError && (
              <>
                {activeTab === "content" && <Description />}
                {activeTab === "discussion" && (
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Discussion
                    </h3>
                    <p className="text-white/60 text-sm">
                      Discussion UI goes here.
                    </p>
                  </div>
                )}
              </>
            )}
          </main>

          <aside className="hidden lg:flex w-80 shrink-0 flex-col gap-6">
            <div className="sticky top-20 max-h-[calc(100vh-2rem)] rounded-2xl border border-white/10 bg-neutral-900/70 p-3 overflow-hidden">
              <Sidebar
                lessonsList={lessons}
                activeLessonId={currentLesson?.id}
                completedLessonIds={completedSet}
                onLessonSelect={setCurrentLesson}
                onToggleComplete={(lessonId) => {
  const isCompleted = completedLessonIds.includes(lessonId) ?? false;

if(slug)
{
    toggleCompletion.mutate({
    slug,
    lessonId,
    completed: !isCompleted,
  });
}
}}

    
              />
            </div>

            <LearnInPublic />
          </aside>
        </div>

        <MobileSidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          lessons={lessons}
          activeLessonId={currentLesson?.id}
          completedLessonIds={completedLessonIds}
          isLoading={isLoading}
          onSelect={(lesson) => {
            setCurrentLesson(lesson);
            setIsSidebarOpen(false);
          }}
          onToggleComplete={toggleLessonComplete}
        />
      </div>
    </div>

    </DashboardLayout>
   
  );
}

/* ===================================================== */

function MobileSidebar({
  open,
  onClose,
  lessons,
  activeLessonId,
  completedLessonIds,
  isLoading,
  onSelect,
  onToggleComplete,
}: {
  open: boolean;
  onClose: () => void;
  lessons: LessonTopic[];
  activeLessonId?: string;
  completedLessonIds: string[];
  isLoading: boolean;
  onSelect: (l: LessonTopic) => void;
  onToggleComplete: (id: string) => void;
}) {
  return (
    <>
      <div
        className={`
          fixed inset-y-0 right-0 z-50 w-80
          bg-neutral-900/95 backdrop-blur
          border-l border-white/10
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-sm font-semibold">Lessons</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-3 h-full overflow-hidden">
          {isLoading ? (
            <Skeleton count={8} />
          ) : (
            <Sidebar
              lessonsList={lessons}
              activeLessonId={activeLessonId}
              completedLessonIds={completedLessonIds}
              onLessonSelect={onSelect}
              onToggleComplete={onToggleComplete}
            />
          )}
        </div>
      </div>

      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
    </>
  );
}

/* ===================================================== */

function Skeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="h-12 bg-neutral-800 rounded animate-pulse"
        />
      ))}
    </div>
  );
}

function ErrorBox() {
  return (
    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-200">
      Failed to load lessons.
    </div>
  );
}
