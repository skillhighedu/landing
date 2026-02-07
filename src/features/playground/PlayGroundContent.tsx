
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
    <>


      <Player currentLesson={currentLesson} />
      <Actions
        lessons={lessons}
        currentLesson={currentLesson}
        onChangeLesson={setCurrentLesson}
        onOpenDiscussion={() => setActiveTab("discussion")}
      />

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
  );
}
