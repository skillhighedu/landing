import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

import PlayGroundContent from "./PlayGroundContent";
import PlayGroundSidebar from "./PlayGroundSidebar";
import PlayGroundMobileSidebar from "./PlayGroundMobileSidebar";
import PlayGroundSkeleton from "./PlayGroundSkeleton";

import { usePlayGroundData } from "./PlayGround.logic";

import type { PlayGroundProps } from "@/types/dashboard/demo";
import DemoNotice from "../dashboard/components/common/DemoNotice";
import Container from "@/layouts/Container";
import type { CourseLesson } from "../dashboard/types";

export default function PlayGround({ mode }: PlayGroundProps) {
  const { slug = "" } = useParams();

  const [currentLesson, setCurrentLesson] =
    useState<CourseLesson | null>(null);

  const [activeTab, setActiveTab] =
    useState<"content" | "discussion">("content");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingLessonIds, setPendingLessonIds] = useState<string[]>([]);

  const {
    lessonQuery,
    completedLessonIds,
    toggleMutation,
  } = usePlayGroundData(slug, mode);



 const lessons = lessonQuery.data?.courseLessons ?? [];


  useEffect(() => {
    if (!currentLesson) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons]);

  return (
    <DashboardLayout title={currentLesson?.title}>
      <Container size="full">

        {lessonQuery.isLoading ? (
          <PlayGroundSkeleton />
        ) : (
          <>
            {mode === "demo" && <DemoNotice />}

            {/* Mobile Lessons Button */}
            <div className="lg:hidden mb-4 flex justify-end">
              <button
                onClick={() => setMobileOpen(true)}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm"
              >
                Lessons
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <main className="flex-1 min-w-0">
                <PlayGroundContent
                  lessons={lessons}
                  currentLesson={currentLesson}
                  setCurrentLesson={setCurrentLesson}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </main>

              <PlayGroundSidebar
                lessons={lessons}
                currentLesson={currentLesson}
                completedLessonIds={completedLessonIds}
                pendingLessonIds={pendingLessonIds}
                onSelectLesson={setCurrentLesson}
                onLockedLessonClick={(lesson) => {
                  setCurrentLesson(lesson);
                }}
                onToggleComplete={(lessonId: string, completed: boolean) => {
                  if (!toggleMutation || !slug || pendingLessonIds.includes(lessonId)) return;

                  setPendingLessonIds((prev) => [...prev, lessonId]);
                  toggleMutation.mutate({
                    slug,
                    lessonId,
                    completed,
                  }, {
                    onSettled: () => {
                      setPendingLessonIds((prev) => prev.filter((id) => id !== lessonId));
                    },
                  });
                }}
              />
            </div>

            <PlayGroundMobileSidebar
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              lessons={lessons}
              activeLessonId={currentLesson?.id}
              completedLessonIds={completedLessonIds}
              pendingLessonIds={pendingLessonIds}
              onToggleComplete={(lessonId: string, completed: boolean) => {
                if (!toggleMutation || !slug || pendingLessonIds.includes(lessonId)) return;

                setPendingLessonIds((prev) => [...prev, lessonId]);
                toggleMutation.mutate({
                  slug,
                  lessonId,
                  completed,
                }, {
                  onSettled: () => {
                    setPendingLessonIds((prev) => prev.filter((id) => id !== lessonId));
                  },
                });
              }}
              onSelect={(lesson: CourseLesson) => {
                setCurrentLesson(lesson);
                setMobileOpen(false);
              }}
            />
          </>
        )}
      </Container>
    </DashboardLayout>
  );
}
