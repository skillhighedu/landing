import { useEffect } from "react";

import StepsGrid from "./components/StepsGrid";
import ShareComposer from "./components/ShareComposer";
import HeaderSection from "@/components/common/HeaderSection";
import HeaderCard from "./components/HeaderCard";
import Container from "@/layouts/Container";
import DashboardLayout from "../../layout/DashboardLayout";

export default function LearnInPublicPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <DashboardLayout title="Learn in Public">
      <Container size="full">
      <div className="min-h-screen bg-white dark:bg-neutral-950 p-3 rounded-2xl ">
        <div className="max-w-7xl mx-auto  px-4 space-y-10 text-white">
          <HeaderCard />
          <StepsGrid />
          <ShareComposer />
        </div>
      </div>
    </Container>
    </DashboardLayout>
    
  );
}
