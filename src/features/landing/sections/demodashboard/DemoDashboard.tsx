import { forwardRef } from "react";
import Container from "@/layouts/Container";
import DemoHeader from "./components/DemoHeader";
import DemoValueList from "./components/DemoValueList";
import DemoPreviewCard from "./components/DemoPreviewCard";

const DemoDashboardSection = forwardRef<
  HTMLDivElement,
  { courseSlug: string }
>(({ courseSlug }, ref) => {
  return (
    <section ref={ref} className="relative my-10">
      <Container>
        <div
          className="
            relative overflow-hidden
            rounded-[28px]
            border border-neutral-200/60 dark:border-neutral-800
            bg-white dark:bg-neutral-950
          "
        >
          {/* Pattern background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="
                absolute inset-0
                opacity-[0.35] dark:opacity-[0.15]
                [background-image:radial-gradient(#000_1px,transparent_1px)]
                dark:[background-image:radial-gradient(#fff_1px,transparent_1px)]
                [background-size:24px_24px]
                mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)
              "
            />
          </div>

          {/* Content */}
          <div
            className="
              relative z-10
              grid grid-cols-1 lg:grid-cols-2
              items-center gap-10
              p-8 sm:p-12 lg:p-14
            "
          >
            <div className="max-w-xl">
              <DemoHeader />
              <DemoValueList courseSlug={courseSlug} />
            </div>

            <DemoPreviewCard />
          </div>
        </div>
      </Container>
    </section>
  );
});

export default DemoDashboardSection;
