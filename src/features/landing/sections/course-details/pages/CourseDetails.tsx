import AboutCourse from "../components/AboutCourse";

interface CoursePageProps {
  courseSlug: string;
  scrollToPricing: () => void;
}

export default function CoursePage({
  courseSlug,
  scrollToPricing,
}: CoursePageProps) {
  return (
    <AboutCourse
      courseSlug={courseSlug}
      scrollToPricing={scrollToPricing}
    />
  );
}
