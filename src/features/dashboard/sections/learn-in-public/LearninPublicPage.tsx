;

import StepsGrid from "./components/StepsGrid";

import ShareComposer from "./components/ShareComposer";

import HeaderSection from "@/components/common/HeaderSection";
import HeaderCard from "./components/HeaderCard";
import Container from "@/layouts/Container";


export default function LearnInPublicPage() {
  return (
    <Container size="full">
        <div className="min-h-screen bg-white dark:bg-neutral-900 mt-12">
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-10 text-white">

       <HeaderSection/>

        <HeaderCard />

        <StepsGrid />

  

        <ShareComposer />

      </div>
  
    </div>
      </Container>
  );
}
