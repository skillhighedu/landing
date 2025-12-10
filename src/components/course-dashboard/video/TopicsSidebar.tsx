import { useState, useEffect, useMemo } from "react";
import { PlayIcon, Check } from "lucide-react";
import type { Topic, TopicsSidebarProps } from "@/types/dashboard/Video";



export default function TopicsSidebar({
  topics,
  currentTopic,
  onTopicSelect,
  isSidebarOpen = true,
  onClose,
}: TopicsSidebarProps) {
  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>({});

  // Initialize checkedTopics from topics
  useEffect(() => {
    if (!Array.isArray(topics) || topics.length === 0) return;

    const newChecked = topics.reduce<Record<string, boolean>>(
      (acc, topic) => {
        acc[topic.id] = topic.completed || false;
        return acc;
      },
      {},
    );

    setCheckedTopics((prev) =>
      JSON.stringify(prev) === JSON.stringify(newChecked) ? prev : newChecked,
    );
  }, [topics]);

  const handleCheckboxChange = async (topicId: string) => {
    try {
      const newCheckedState = !checkedTopics[topicId];
      setCheckedTopics((prev) => ({ ...prev, [topicId]: newCheckedState }));

      // TODO: Implement API call to update topic completion status
      console.log(`Topic ${topicId} marked as ${newCheckedState ? "completed" : "incomplete"}`);
    } catch (error) {
      console.error("Failed to update topic checkbox:", error);
    }
  };

  const topicItems = useMemo(
    () =>
      topics?.map((topic: Topic) => (
        <div
          key={topic.id}
          className={`group flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 border ${
            currentTopic?.id === topic.id
              ? "bg-green-600/15 border-green-600/40 shadow-lg shadow-green-600/10"
              : "bg-neutral-900/50 border-neutral-700/50 hover:bg-neutral-800/70 hover:border-green-600/30"
          }`}
        >
          <input
            type="checkbox"
            id={`topic-${topic.id}`}
            checked={checkedTopics[topic.id] || false}
            onChange={() => handleCheckboxChange(topic.id)}
            className="hidden"
          />
          <label
            htmlFor={`topic-${topic.id}`}
            className={`shrink-0 w-5 h-5 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all ${
              checkedTopics[topic.id]
                ? "bg-green-600 border-green-600 text-white shadow-sm"
                : "border-neutral-600 group-hover:border-green-600/50"
            }`}
          >
            {checkedTopics[topic.id] && <Check size={14} strokeWidth={3} />}
          </label>

          <button
            onClick={() => onTopicSelect(topic)}
            className="flex items-center gap-3 w-full text-left cursor-pointer"
          >
            <div className={`p-1.5 rounded-lg transition-colors ${
              currentTopic?.id === topic.id
                ? "bg-green-600/20"
                : "bg-neutral-800 group-hover:bg-green-600/20"
            }`}>
              <PlayIcon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  currentTopic?.id === topic.id
                    ? "text-green-500"
                    : "text-gray-400 group-hover:text-green-500"
                }`}
              />
            </div>
            <span
              className={`text-sm font-normal transition-colors leading-relaxed ${
                currentTopic?.id === topic.id
                  ? "text-green-500 font-medium"
                  : "text-gray-200 group-hover:text-green-400"
              }`}
            >
              {topic.title}
            </span>
          </button>
        </div>
      )),
    [topics, checkedTopics, currentTopic],
  );

  const filteredTrueTopics = Object.fromEntries(
    Object.entries(checkedTopics).filter(([_, value]) => value === true),
  );

  return (
    <div className={`fixed inset-y-0 right-0 w-72 md:w-80 bg-neutral-900 shadow-2xl border-l border-neutral-700
      transform transition-all duration-300 ease-in-out z-40 font-sans
      ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
      lg:static lg:translate-x-0 lg:w-80 lg:shadow-none rounded-2xl`}
    >
      {/* Sidebar Header for Mobile */}
      <div className="lg:hidden p-4 border-b border-neutral-700">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-neutral-700"
        >
          ✕
        </button>
      </div>

      {/* Progress Header */}
      <div className="p-5 bg-green-600/10 border-b border-neutral-700 rounded-t-2xl flex items-center justify-between">
        <h2 className="text-sm font-normal text-white leading-relaxed">
          Progress: <span className="text-green-500 font-medium">{Object.keys(filteredTrueTopics).length}</span> / {Object.keys(checkedTopics).length} Lessons
        </h2>
      </div>

      {/* Topics List */}
      <nav className="p-4 py-6 space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:bg-green-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-green-500">
        {topicItems}
      </nav>
    </div>
  );
}
