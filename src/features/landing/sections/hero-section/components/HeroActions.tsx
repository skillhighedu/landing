import { Calendar, Sword } from "lucide-react";
import { Link } from "react-router-dom";
import BookingModal from "@/components/common/BookingModal";
import CustomButton from "@/components/common/Button";

export default function HeroActions() {
  return (
    <div className="mt-8 flex flex-col sm:flex-row-reverse gap-4 justify-center">
      <BookingModal
        title="Schedule Your Call"
        icon={<Calendar />}
        className="bg-neutral-900"
      />

      <Link to="/all-courses">
        <CustomButton
          title="Get Started"
          icon={<Sword />}
        />
      </Link>
    </div>
  );
}
