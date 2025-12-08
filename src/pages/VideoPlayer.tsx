import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "@/components/course-dashboard/video/VideoPlayer";
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

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      {/* Header with sidebar toggle button */}
      <header className="bg-neutral-800 border-b border-neutral-700 p-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Course Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-lime-400 text-neutral-900 hover:bg-lime-500 transition-colors"
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-row overflow-hidden gap-1 p-4 lg:pl-6 lg:pr-24 lg:py-6">
        {/* Player Section */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto">
            <VideoPlayer
              currentTopic={currentTopic}
              onPrevious={handlePrevTopic}
              onNext={handleNextTopic}
              isFirstTopic={isFirstTopic}
              isLastTopic={isLastTopic}
            />
          </div>
        </main>

        {/* Sidebar Wrapper with padding */}
        <aside className="hidden lg:block py-4 pr-10">
          <TopicsSidebar
            topics={topics}
            currentTopic={currentTopic}
            onTopicSelect={handleTopicSelect}
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </aside>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <TopicsSidebar
            topics={topics}
            currentTopic={currentTopic}
            onTopicSelect={handleTopicSelect}
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30
            transition-opacity duration-300 lg:hidden
            ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
}
