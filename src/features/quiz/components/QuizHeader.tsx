interface Props {
  current: number;
  total: number;
}

export default function QuizHeader({ current, total }: Props) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-zinc-400">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded mt-2 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
