'use client';

import { motion } from 'framer-motion';
import Balancer from 'react-wrap-balancer';
import { UserPlus } from 'lucide-react';

import CustomButton from '@/components/common/Button';
import { containerVariants, childVariants } from '../animations';
import Container from '@/layouts/Container';

interface Props {
  onJoin: () => void;
}

export default function MentorsCallView({ onJoin }: Props) {
  return (
  <Container >
      <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        relative mx-4 my-16 rounded-3xl overflow-hidden
        bg-gradient-to-br from-primary/30 via-primary/40 to-primary/30
      "
    >
      {/* Soft background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-120px] right-[-120px] w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-120px] w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-12 py-20 text-center max-w-4xl mx-auto flex flex-col gap-6">
        <motion.h2
          variants={childVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight"
        >
          <Balancer>Become a Mentor</Balancer>
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="text-neutral-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          <Balancer>
            Share what you know. Help learners grow through real-world guidance.
          </Balancer>
        </motion.p>

        <motion.div
          variants={childVariants}
          className="pt-6 flex justify-center"
        >
          <CustomButton
            title="Join as Mentor"
            icon={<UserPlus aria-hidden="true" />}
            onClick={onJoin}
            className="
              text-base
              bg-white text-neutral-900
              hover:bg-neutral-100
              transition
            "
          />
        </motion.div>
      </div>
    </motion.section>
  </Container>
  );
}
