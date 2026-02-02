
import CoursePage from "../sections/course-details/pages/CourseDetails";
import Certificates from "../sections/certificates/certifcates";
import Curriculum from "../sections/curriculum";
import Tools from "../sections/tools/tools"
import MentorCall from "../sections/mentors-call/MentorCall";
import Footer from "@/components/common/Footer";
import Pricings from "../sections/pricings"
export default function AboutCourse() {
  return (
   <>
    <CoursePage/>
    <Curriculum/>
    <Tools/>
    <Pricings/>
    <Certificates/>
    <MentorCall/>
    <Footer/>
   </>

  )
}
