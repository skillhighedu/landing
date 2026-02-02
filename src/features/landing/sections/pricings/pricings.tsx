import { useParams } from "react-router-dom";
import Pricing from "./components/Pricing.container";


export default function pricings() {

     const { courseSlug } = useParams<{ courseSlug: string }>();
  return (
    <Pricing courseSlug={courseSlug!}/>
  )
}
