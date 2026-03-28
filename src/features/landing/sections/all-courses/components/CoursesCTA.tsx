import BookingModal from "@/components/common/BookingModal";
import { Calendar, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SkillHighFavicon from "@/assets/favicon.jpg";

export default function CoursesCTA() {
  return (
    <section className=" py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(10,10,10,0.98),rgba(24,24,27,0.92))] px-6 py-10 text-center shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.14),transparent_30%)]" />
          <div className="absolute left-6 top-6 h-16 w-16 rounded-full border border-primary/20 bg-primary/10 blur-2xl" />
          <div className="absolute bottom-6 right-6 h-20 w-20 rounded-full border border-cyan-400/10 bg-cyan-400/10 blur-2xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Course Guidance
            </div>

            <h3 className="text-3xl leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
              Confused about what to learn next?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl font-mono text-sm leading-7 text-neutral-300 sm:text-base">
              Talk to an expert for 15 minutes and leave with a clearer path, better course fit, and fewer wasted weeks guessing what to do next.
            </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-neutral-400 sm:text-sm">
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
    1:1 expert guidance
  </span>
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
    zero spam
  </span>
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
    clear roadmap in 15 mins
  </span>
</div>

            <div className="mt-10 flex justify-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                <BookingModal title="Book a Free Clarity Call" icon={<Calendar />} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-neutral-400">
             

              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5"
              >
                <img
                  src={SkillHighFavicon}
                  alt="SkillHigh"
                  className="h-4 w-4 rounded-sm object-cover"
                />
                <span className="text-[11px] tracking-[0.18em] text-neutral-300">
                  Guided by SkillHigh
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
