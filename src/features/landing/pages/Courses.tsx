
import { useEffect } from 'react';
import AllCoursesPage from '../sections/all-courses/pages/AllCoursesPage'

export default function Courses() {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
   <>
   <AllCoursesPage/>
   </>
  )
}
