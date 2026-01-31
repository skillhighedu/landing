import Header from "@/components/common/Header";
import Container from "@/layouts/Container";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import CoursesCarousel from "./components/CoursesCarousel";
import BlockQuote from "@/components/common/BlockQuote";
import { Link } from "react-router-dom";
import CustomButton from "@/components/common/Button";
import { Search } from "lucide-react";
import { sortCoursesByRibbon } from "@/utils/sortCoursesByRibbon";

export default function CoursesSection() {
  const { formatedCourses = [] } = usePublicCoursesStore();

 const sortedCourses = sortCoursesByRibbon(formatedCourses);


  return (
    <section className="bg-neutral-950 py-20 overflow-hidden">
      <Container size="xl">
        <div className="mb-14 text-center">
          <Header
            title="Master In-Demand Skills"
            subline="Programs designed for real-world outcomes."
          />
        </div>

        {sortedCourses.length > 0 ? (
          <CoursesCarousel courses={sortedCourses} />
        ) : (
          <p className="text-center text-neutral-400">
            No courses available at the moment.
          </p>
        )}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <BlockQuote quote="Skills compound faster than experience." />
          <Link to="/all-courses">
            <CustomButton title="Browse all programs" icon={<Search />} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
