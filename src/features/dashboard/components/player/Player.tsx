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
          overflow-hidden rounded-[1.5rem]
          border border-border
          bg-neutral-950
          shadow-xl
        "
      >
        {currentLesson && isVideoLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-neutral-900/90 backdrop-blur-sm transition-opacity">
            <Loader2 className="h-6 w-6 animate-spin text-white/70" />
            <p className="font-mono text-sm text-white/50">Loading video...</p>
          </div>
        )}

        {currentLesson && hasError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-900 px-6 text-center">
            <p className="text-lg font-semibold text-red-400">
              Failed to load video
            </p>
            <p className="mt-2 text-sm text-white/50">
              Please try again later.
            </p>
          </div>
        )}

        {currentLesson ? (
          <iframe
            key={currentLesson.id}
            src={currentLesson.video!}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-xl font-semibold text-white/70">
              Select a lesson
            </p>
            <p className="mt-2 text-sm text-white/50">
              Choose a lesson from the sidebar
            </p>
          </div>
        )}

        {currentLesson?.locked && <BuyOverlay />}
      </div>

      {currentLesson && (
        <div className="rounded-2xl border border-border bg-background px-4 py-3 sm:px-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/70">
            Current lesson
          </p>
          <h2 className="mt-2 text-sm font-semibold text-foreground sm:text-base">
            {currentLesson.title}
          </h2>
        </div>
      )}
    </div>
  );
}
