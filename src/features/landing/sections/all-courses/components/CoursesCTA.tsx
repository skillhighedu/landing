import BookingModal from "@/components/common/BookingModal";
import { Calendar } from "lucide-react";

export default function CoursesCTA() {
  return (
    <div className="mt-20 max-w-4xl mx-auto bg-neutral-800/60 rounded-2xl py-16 px-6 text-center">
      <h3 className="text-2xl text-white font-semibold">
        Not sure which skill is right for you?
      </h3>
      <p className="text-gray-300 mt-3 mb-6">
        Book a quick 15-minute call and get clarity.
      </p>
      <BookingModal title="Get Clarity" icon={<Calendar />} />
    </div>
  );
}
