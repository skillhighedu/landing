import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import CustomButton from "./Button";

interface MyAppProps {
  title: string;
  icon: React.ReactNode;
  className?: string;
}

export default function MyApp({ title, icon, className }: MyAppProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <CustomButton
      title={title}
      icon={icon}
      data-cal-namespace="15min"
      data-cal-link="skillhigh/15min"
      data-cal-config='{"layout":"month_view"}'
      className={className}
    />
  );
}
