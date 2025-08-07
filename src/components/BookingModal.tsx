
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import CustomButton from "./Button";
export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  return   <CustomButton title="Get Clarity in 15 Minutes" icon="" data-cal-namespace="15min"  data-cal-link="skillhigh/15min" data-cal-config='{"layout":"month_view"}'   />
  
  
};
  