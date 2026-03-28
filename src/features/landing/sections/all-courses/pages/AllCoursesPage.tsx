import { useState } from "react";
import CoursesHeader from "../components/CoursesHeader";
import CoursesSearch from "../components/CoursesSearch";
import CoursesGrid from "../components/CoursesGrid";
import CoursesCTA from "../components/CoursesCTA";
import Container from "@/layouts/Container";
import { useFilteredCourses } from "../hooks/useFilteredCourses";

export default function AllCoursesPage() {
  const [search, setSearch] = useState("");
  const filteredCourses = useFilteredCourses(search);
  const totalCourses = filteredCourses?.length ?? 0;

  return (
    <Container size="full">
      <section className="bg-white dark:bg-neutral-900 py-10 px-4 sm:px-6 lg:px-12 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <CoursesHeader />

          {/* pass search state */}
          <CoursesSearch
            search={search}
            setSearch={setSearch}
            totalCourses={totalCourses}
          />

          {/* pass search to grid */}
          <CoursesGrid search={search}  />
        </div>

        <CoursesCTA />
      </section>
    </Container>
  );
}
