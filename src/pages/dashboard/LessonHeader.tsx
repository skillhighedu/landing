interface LessonHeaderProps {
  title: string;
}

export default function LessonHeader({ title }: LessonHeaderProps) {
  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl font-semibold text-primary dark:text-white">
        {title}
      </h1>
    </div>
  );
}
