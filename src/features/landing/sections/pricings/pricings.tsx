import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import Pricing from "./components/Pricing.container";

const Pricings = forwardRef<HTMLDivElement>((_, ref) => {
  const { courseSlug } = useParams<{ courseSlug: string }>();

  return <Pricing ref={ref} courseSlug={courseSlug!} />;
});

export default Pricings;
