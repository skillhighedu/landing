import { Link } from "react-router-dom";
import CustomButton from "@/components/common/Button";
import BlockQuote from "@/components/common/BlockQuote";
import Container from "@/layouts/Container";

export default function TestimonialsFooter() {
  return (
   
     <Container size="full">
         <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
         <BlockQuote quote="Right skills. Real results." />

      <Link to="/contact-us" aria-label="Talk to our team">
        <CustomButton title="Contact us" />
      </Link>
          </div>
     </Container>

  );
}
