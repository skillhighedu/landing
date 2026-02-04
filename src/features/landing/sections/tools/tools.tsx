import { useSelectedCourseStore } from "@/store/useSelectedCourse";
import Tools from "./components/Tools.container";

export default function tools() {

  const { selectedCourseTools } = useSelectedCourseStore();

    if (!selectedCourseTools || selectedCourseTools.length === 0) return null;
  return (
    <Tools courseTools={selectedCourseTools}/>
  )
}
