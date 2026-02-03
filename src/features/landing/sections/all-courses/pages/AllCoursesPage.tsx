import CoursesHeader from "../components/CoursesHeader";
import CoursesSearch from "../components/CoursesSearch";
import CoursesGrid from "../components/CoursesGrid";
import CoursesCTA from "../components/CoursesCTA";
import Container from "@/layouts/Container";

export default function AllCoursesPage() {
  return (
   <Container size="full">

     <section className="bg-white dark:bg-neutral-900 py-10 px-4 sm:px-6 lg:px-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <CoursesHeader />
        <CoursesSearch />
        <CoursesGrid />
      </div>

      <CoursesCTA />
    </section>
   </Container>
  );
}
