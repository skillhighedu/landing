import AboutCourse from '../components/AboutCourse';
import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function CoursePage() {
    const { courseSlug } = useParams<{ courseSlug: string }>();
  const location = useLocation();
  const pricingRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state?.scrollTo === "pricing") {
      pricingRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);


  return (
   <AboutCourse
           scrollToPricing={() =>
             pricingRef.current?.scrollIntoView({ behavior: "smooth" })
           }
           courseSlug={courseSlug ?? ""}
         />
  );
}
