import AboutCourse from "../components/AboutCourse";

interface CoursePageProps {
  courseSlug: string;
  scrollToPricing: () => void;
  scrollToDemo: () => void;
}

export default function CoursePage({
  courseSlug,
  scrollToPricing,
  scrollToDemo
}: CoursePageProps) {
  return (
    <AboutCourse
      courseSlug={courseSlug}
      scrollToPricing={scrollToPricing}
      scrollToDemo={scrollToDemo}
    />
  );
}
