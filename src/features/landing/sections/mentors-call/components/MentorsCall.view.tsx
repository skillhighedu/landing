'use client';

import { motion } from 'framer-motion';
import Balancer from 'react-wrap-balancer';
import { UserPlus } from 'lucide-react';

import CustomButton from '@/components/common/Button';
import { containerVariants, childVariants } from '../animations';
import Container from '@/layouts/Container';
import type { MentorsCallProps } from '../types';

type Props = {
  onJoin: NonNullable<MentorsCallProps['onJoin']>;
  courseName?: string;
};

export default function MentorsCallView({ onJoin, courseName }: Props) {
  const mentorHeading = courseName
    ? `Become a mentor for ${courseName}`
    : 'Become a mentor with SkillHigh';

  return (
    <Container size="xl">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          relative my-16 overflow-hidden rounded-3xl border border-primary/15
          bg-gradient-to-br from-primary/10 via-white to-primary/5
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.06),transparent_28%)]" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 py-14 text-center sm:px-10">
            <motion.div
              variants={childVariants}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              Mentor opportunity
            </motion.div>

            <motion.h2
              variants={childVariants}
              className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl"
            >
              <Balancer>{mentorHeading}</Balancer>
            </motion.h2>

            <motion.p
              variants={childVariants}
              className="max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg"
            >
              <Balancer>
                Share your expertise, guide learners through practical work, and help them grow with real-world mentorship.
              </Balancer>
            </motion.p>

            <motion.div
              variants={childVariants}
              className="flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <CustomButton
                title="Become a Mentor"
                icon={<UserPlus aria-hidden="true" />}
                onClick={onJoin}
                className="
                  justify-center sm:min-w-[220px]
                "
              />
            </motion.div>
        </div>
      </motion.section>
    </Container>
  );
}
