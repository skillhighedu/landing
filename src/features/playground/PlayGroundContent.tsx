import Player from "@/features/dashboard/components/player/Player";
import Actions from "@/features/dashboard/components/actions/Actions";
import Description from "@/features/dashboard/components/Description";

export default function PlayGroundContent({
  lessons,
  currentLesson,
  setCurrentLesson,
  activeTab,
  setActiveTab,
}: any) {
  if (!currentLesson) return null;

 

  return (
    <div className="min-w-0 space-y-6">
      <div className="rounded-[1.5rem] border border-border bg-card p-3 shadow-sm sm:p-4">
        <Player currentLesson={currentLesson} />
      </div>

      <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:p-5">
        <Actions
          lessons={lessons}
          currentLesson={currentLesson}
          onChangeLesson={setCurrentLesson}
          onOpenDiscussion={() => setActiveTab("discussion")}
        />
      </div>

      {activeTab === "content" && (
        <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:p-6">
          <Description description={currentLesson.description}  />
        </div>
      )}
    </div>
  );
}
