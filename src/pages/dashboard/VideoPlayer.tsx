import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayerComponent from "@/components/course-dashboard/video/VideoPlayer";
import TopicsSidebar from "@/components/course-dashboard/video/TopicsSidebar";
import { courseTopicsData, type Topic } from "@/data/courseTopics";
import { toast } from "sonner";
import HeaderSection from "@/components/common/HeaderSection";

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
  <div className="min-h-screen bg-neutral-950 text-white mt-12 py-8 px-4">
    
    {/* Page Header */}
    <div className="max-w-6xl mx-auto mb-6">
      <HeaderSection />
    </div>

    {/* Main Grid */}
    <div className="max-w-7xl mx-auto flex gap-6 relative">

      {/* Video Area */}
      <div className="flex-1 min-w-0">
        <div className="w-full max-w-4xl">
          <VideoPlayerComponent
            currentTopic={currentTopic}
            onPrevious={handlePrevTopic}
            onNext={handleNextTopic}
            isFirstTopic={isFirstTopic}
            isLastTopic={isLastTopic}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 shrink-0">
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-72 max-w-[90vw] bg-neutral-900 shadow-xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
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

    {/* Mobile Sidebar Toggle */}
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="fixed bottom-6 right-6 lg:hidden p-4 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition z-50"
    >
      ☰
    </button>

  </div>
);

}
