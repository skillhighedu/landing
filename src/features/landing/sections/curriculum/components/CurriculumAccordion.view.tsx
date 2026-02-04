import Header from '@/components/common/Header';
import CurriculumSection from './CurriculumSection';
import type { CurriculumModule } from '../types';

interface Props {
  modules: CurriculumModule[];
}

export default function CurriculumAccordionView({ modules }: Props) {
  return (
    <section className="mx-auto flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-950 w-full">
      <Header
        title="Learn by Doing: The Hands-On Curriculum"
        subline="Learn faster by doing — every concept is taught through practical application."
      />

      {modules.map((section, idx) => (
        <CurriculumSection
          key={idx}
          sectionTitle={section.moduleName}
          topics={section.contents}
          defaultOpen={idx === 0}
        />
      ))}
    </section>
  );
}
