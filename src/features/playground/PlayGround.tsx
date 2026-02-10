import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

import PlayGroundContent from "./PlayGroundContent";
import PlayGroundSidebar from "./PlayGroundSidebar";
import PlayGroundMobileSidebar from "./PlayGroundMobileSidebar";
import { usePlayGroundData } from "./PlayGround.logic";
import type { LessonTopic } from "@/types/course";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import DemoNotice from "../dashboard/components/common/DemoNotice";
import Container from "@/layouts/Container";

export default function PlayGround({ mode }: PlayGroundProps) {
  const { slug = "" } = useParams();

  const [currentLesson, setCurrentLesson] =
    useState<LessonTopic | null>(null);

  const [activeTab, setActiveTab] =
    useState<"content" | "discussion">("content");

  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    lessonQuery,
    completedLessonIds,
    toggleMutation,
  } = usePlayGroundData(slug, mode);

  const lessons = lessonQuery.data?.courseLessons ?? [];

  useEffect(() => {
    if (!currentLesson && lessons.length) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons]);

  return (
    <DashboardLayout title={currentLesson?.title}>
     <Container size="full">
         {mode === "demo" && <DemoNotice />}
       
        <div className="flex gap-6">
          <main className="flex-1 space-y-6">
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
            onSelectLesson={setCurrentLesson}

            /* IMPORTANT — locked click */
            onLockedLessonClick={(lesson) => {
              setCurrentLesson(lesson);
            }}

            onToggleComplete={(lessonId: string) => {
              if (!toggleMutation || !slug) return;
              toggleMutation.mutate({
                slug,
                lessonId,
                completed: !completedLessonIds.includes(lessonId),
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
          onSelect={(lesson: LessonTopic) => {
            setCurrentLesson(lesson);
            setMobileOpen(false);
          }}
        />
     </Container>
    </DashboardLayout>
  );
}
