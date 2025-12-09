import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "@/components/common/BackButton";;
import VideoPlayerComponent from "@/components/course-dashboard/video/VideoPlayer";
import TopicsSidebar from "@/components/course-dashboard/video/TopicsSidebar";
import { courseTopicsData, type Topic } from "@/data/courseTopics";
import { toast } from "sonner";

export default function VideoPlayerPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  // Load topics for the course
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadedTopics = courseTopicsData[courseId || "67691eb73f409fe0a9890a04"] || [];
    setTopics(loadedTopics);
    
    if (loadedTopics.length > 0 && !currentTopic) {
      setCurrentTopic(loadedTopics[0]);
    }
  }, [courseId]);

  // Navigation handlers
  const handlePrevTopic = () => {
    if (!currentTopic || !topics) return;

    const currentIndex = topics.findIndex((t) => t.id === currentTopic.id);
    if (currentIndex > 0) {
      setCurrentTopic(topics[currentIndex - 1]);
      window.scrollTo(0, 0);
    } else {
      toast("You're already at the first lesson.");
    }
  };

  const handleNextTopic = () => {
    if (!currentTopic || !topics) return;

    const currentIndex = topics.findIndex((t) => t.id === currentTopic.id);
    if (currentIndex < topics.length - 1) {
      setCurrentTopic(topics[currentIndex + 1]);
      window.scrollTo(0, 0);
    } else {
      toast("You've completed all lessons!");
    }
  };

  const handleTopicSelect = (topic: Topic) => {
    setCurrentTopic(topic);
    window.scrollTo(0, 0);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const currentIndex = topics.findIndex((t) => t.id === currentTopic?.id);
  const isFirstTopic = currentIndex === 0;
  const isLastTopic = currentIndex === topics.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 py-8 px-4">
      <BackButton className="mb-6" />
      <div className="flex gap-1 relative lg:pr-24">
        {/* Video Player Section */}
        <div className="flex-1">
          <div className="w-full max-w-4xl mx-auto">
            <VideoPlayerComponent
              currentTopic={currentTopic}
              onPrevious={handlePrevTopic}
              onNext={handleNextTopic}
              isFirstTopic={isFirstTopic}
              isLastTopic={isLastTopic}
            />
          </div>
        </div>

        {/* Sidebar - Desktop (Scrollable) */}
        <aside className="hidden lg:block pr-10">
          <TopicsSidebar
            topics={topics}
            currentTopic={currentTopic}
            onTopicSelect={handleTopicSelect}
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="fixed right-0 top-0 bottom-0 w-80 max-w-[90vw] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <TopicsSidebar
              topics={topics}
              currentTopic={currentTopic}
              onTopicSelect={handleTopicSelect}
              isSidebarOpen={true}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden p-4 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors z-20"
      >
        ☰
      </button>
    </div>
  );
}
