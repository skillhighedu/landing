import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { PlayerProps } from "./types";
import BuyOverlay from "../BuyOverlay";

export default function Player({ currentLesson }: PlayerProps) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (currentLesson) {
      setIsVideoLoading(true);
      setHasError(false);
    }
  }, [currentLesson?.id]);

  const handleLoad = () => setIsVideoLoading(false);
  const handleError = () => {
    setIsVideoLoading(false);
    setHasError(true);
  };

  return (
    <div className="w-full min-w-0 space-y-3">
      <div
        className="
          relative w-full aspect-video
          rounded-2xl overflow-hidden
          border border-white/10
          bg-neutral-900
          shadow-xl
        "
      >
        {/* Loading */}
        {currentLesson && isVideoLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-neutral-900/90 backdrop-blur-sm transition-opacity">
            <Loader2 className="h-6 w-6 animate-spin text-white/70" />
            <p className="text-sm text-white/50">Loading video…</p>
          </div>
        )}

        {/* Error */}
        {currentLesson && hasError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 bg-neutral-900">
            <p className="text-lg font-semibold text-red-400">
              Failed to load video
            </p>
            <p className="text-sm text-white/50 mt-2">
              Please try again later.
            </p>
          </div>
        )}

        {/* Video */}
        {currentLesson ? (
          <iframe
            key={currentLesson.id}
            src={currentLesson.video}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-xl font-semibold text-white/70">
              Select a lesson
            </p>
            <p className="text-sm text-white/50 mt-2">
              Choose a lesson from the sidebar
            </p>
          </div>
        )}

        {/* Locked overlay */}
        {currentLesson?.locked && <BuyOverlay />}
      </div>

      {/* Lesson title */}
      {currentLesson && (
        <h2 className="text-sm sm:text-base font-medium text-white/80 truncate">
          {currentLesson.title}
        </h2>
      )}
    </div>
  );
}
