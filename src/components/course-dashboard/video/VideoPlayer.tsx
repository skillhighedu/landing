import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestionIcon, NotebookPen } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import type { VideoPlayerProps } from "@/types/dashboard/Video";


export default function VideoPlayer({
  currentTopic,
  onPrevious,
  onNext,
  isFirstTopic,
  isLastTopic,
}: VideoPlayerProps) {
  const [activeTab, setActiveTab] = useState<"content" | "discussions">("content");
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
  const [question, setQuestion] = useState("");
 const [markdownContent, setMarkdownContent] = useState("");
  
  const tabNames: { key: "content" | "discussions"; name: string }[] = [
    { key: "content", name: "Content" },
    { key: "discussions", name: "Discussions" },
  ];

   useEffect(() => {
   {
    fetch("https://raw.githubusercontent.com/skillhighedu/skillhigh-notes/main/fullstack/lesson1.md")
      .then(res => res.text())
      .then(setMarkdownContent)
      .catch(() => setMarkdownContent("❌ Failed to load lesson content"));
  }
}, []);

  const handleQuestionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question.trim()) {
      // TODO: Implement API call to submit question
      toast.success("Question submitted successfully!");
      setQuestion("");
      setIsQuestionFormOpen(false);
    }
  };

  const handleCancel = () => {
    setQuestion("");
    setIsQuestionFormOpen(false);
  };

  return (
    <div className="w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {!currentTopic ? (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-lg" />
        ) : (
          <iframe
            src={currentTopic.video}
            loading="lazy"
            className="absolute inset-0 w-full h-full rounded-t-lg"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Next / Previous Buttons */}
      <div className="flex justify-between p-4 bg-neutral-900 text-white border-t border-neutral-700">
        <div className="flex justify-between gap-5">
          <Button
            onClick={onPrevious}
            disabled={isFirstTopic}
            variant="secondary"
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={isLastTopic}
          >
            Next
          </Button>
        </div>
        <div>
          <Link to="/learn-in-public">
            <Button className="rounded-lg text-white flex items-center gap-2 cursor-pointer">
              <NotebookPen size={16} />
              Share Your Learning
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-4 items-center p-4 bg-neutral-900 text-white">
        {tabNames.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "secondary"}
            onClick={() => setActiveTab(tab.key)}
            className={`transition-all duration-200 cursor-pointer ${
              activeTab === tab.key
                ? "shadow-md"
                : "hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            aria-current={activeTab === tab.key ? "page" : undefined}
            aria-label={`Switch to ${tab.name} tab`}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="p-6 prose dark:prose-invert max-w-none">
    {markdownContent || "Loading content..."}
  </div>
      )}

      {/* Discussions Tab */}
      {activeTab === "discussions" && (
        <div className="p-6 sm:p-8 bg-neutral-900 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Lesson Discussions
            </h3>
            <Button
              onClick={() => setIsQuestionFormOpen(!isQuestionFormOpen)}
              className={`${isQuestionFormOpen ? "hidden" : "flex"} text-white cursor-pointer`}
            >
              Ask a Question <MessageCircleQuestionIcon />
            </Button>
          </div>

          {/* Question Form */}
          {isQuestionFormOpen && (
            <div className="mb-6 p-4 bg-neutral-800 rounded-xl shadow-sm border border-neutral-700">
              <form onSubmit={handleQuestionSubmit}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full p-3 border-0 rounded-lg focus:ring-0 bg-neutral-900 text-gray-100 text-sm sm:text-base resize-y min-h-[120px]"
                  aria-label="Question input"
                  required
                />
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-3">
                    Be respectful while posting questions
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-neutral-700 hover:bg-neutral-600 rounded-lg focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-2 cursor-pointer hover:opacity-90"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
            Engage with the course content, ask questions, and connect with your
            mentor and peers.
          </p>

          {/* Questions List */}
          <div className="space-y-6">
            {currentTopic && currentTopic?.questions && currentTopic.questions.length > 0 ? (
              currentTopic.questions.map((question, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-neutral-800 rounded-xl border border-neutral-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-lime-400 text-neutral-900 flex items-center justify-center font-semibold text-lg">
                      {question.studentName?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-100">
                        {question.studentName || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {question.createdAt
                          ? new Date(question.createdAt).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              },
                            )
                          : "Date not available"}
                      </p>
                    </div>
                  </div>

                  {/* Question */}
                  <p className="text-gray-100 text-sm sm:text-base font-medium mb-2">
                    {question?.question || "No question provided"}
                  </p>

                  {/* Answer */}
                  <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
                    {(question?.answer || "No answer provided yet")
                      .split("```")
                      .map((block, idx) =>
                        idx % 2 === 1 ? (
                          <pre
                            key={idx}
                            className="bg-neutral-900 text-sm font-mono p-3 rounded overflow-x-auto"
                          >
                            <code>{block.trim()}</code>
                          </pre>
                        ) : (
                          <p key={idx}>{block.trim()}</p>
                        ),
                      )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-neutral-800 rounded-lg">
                <p className="text-lg font-medium text-gray-400">
                  No discussions available yet. Be the first to ask a question!
                </p>
                <Button
                  onClick={() => setIsQuestionFormOpen(!isQuestionFormOpen)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white focus:ring-2"
                >
                  {isQuestionFormOpen ? "Close Form" : "Start a Discussion"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
