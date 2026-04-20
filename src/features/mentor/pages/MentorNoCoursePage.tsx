import Container from "@/layouts/Container";
import HeaderSection from "@/components/common/HeaderSection";

export default function MentorNoCoursePage() {
  return (
    <Container size="full">
      <div className="mt-20 py-10 font-mono">
        <HeaderSection title="No Assigned Course" />

        <div className="mt-8 rounded-[28px] border border-dashed border-border bg-card/70 px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-lg font-semibold text-muted-foreground">
            MC
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            No assigned courses yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            This mentor account does not have any assigned courses right now. Please contact an admin to continue.
          </p>
        </div>
      </div>
    </Container>
  );
}
