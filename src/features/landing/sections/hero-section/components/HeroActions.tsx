import { Calendar, Sword } from "lucide-react";
import { Link } from "react-router-dom";
import BookingModal from "@/components/common/BookingModal";
import CustomButton from "@/components/common/Button";

export default function HeroActions() {
  return (
    <div
      className="
        mt-8
        flex flex-col sm:flex-row sm:items-center sm:justify-center
        gap-4
        w-full max-w-xl mx-auto
      "
    >
      {/* Primary CTA */}
      <Link to="/all-courses" className="w-full sm:w-auto">
        <CustomButton
          title="Get Started"
          icon={<Sword />}
          className="w-full sm:w-auto"
        />
      </Link>

      {/* Secondary CTA */}
      <BookingModal
        title="Schedule Your Call"
        icon={<Calendar />}
        className="w-full sm:w-auto bg-neutral-900"
      />
    </div>
  );
}
