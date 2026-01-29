import Header from "@/components/common/Header";
import Container from "@/layouts/Container";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import CoursesCarousel from "./components/CoursesCarousel";
import BlockQuote from "@/components/common/BlockQuote";
import { Link } from "react-router-dom";
import CustomButton from "@/components/common/Button";
import { Search } from "lucide-react";

export default function CoursesSection() {
  const { formatedCourses = [] } = usePublicCoursesStore();

  return (
    <section className="bg-background text-foreground py-20 overflow-hidden">
      <Container size="xl">
        <div className="text-center mb-14">
          <Header
            title="Master In-Demand Skills"
            subline="Programs designed for real-world outcomes."
          />
        </div>

        {formatedCourses.length > 0 ? (
          <CoursesCarousel courses={formatedCourses} />
        ) : (
          <p className="text-center text-foreground/70">
            No courses available at the moment.
          </p>
        )}

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <BlockQuote quote="Skills compound faster than experience." />
          <Link to="/all-courses">
            <CustomButton title="Browse all programs" icon={<Search />} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
