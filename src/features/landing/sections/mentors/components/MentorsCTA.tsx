import { Link } from "react-router-dom";
import BlockQuote from "@/components/common/BlockQuote";
import CustomButton from "@/components/common/Button";

export default function MentorsCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 px-2">
      <BlockQuote quote="Behind every skilled person is someone who showed them the way." />

      <Link to="/contact-us" aria-label="Message Us">
        <CustomButton title="Message Us" icon="" />
      </Link>
    </div>
  );
}
