import { Check } from "lucide-react";
import Header from "./Header";
import {motion} from "framer-motion"
const pricingOptions = [
  {
    title: "Self-Paced",
    price: "₹4,999",
    subtitle: "For independent learners who prefer full autonomy without mentorship.",
    features: [
      "Flexible, on-demand modules for self-paced learning",
      "3+ real-world projects with certifications",
      "Guaranteed internships based on performance",
      "Resume building & career planning support",
      "Unlimited mock interviews & toolkit access",
      "Peer networking & collaboration",
      "No live classes or mentorship",
    ],
  },
  {
    title: "Mentor-Guided",
    price: "₹14,999",
    subtitle: "For learners who want expert guidance, live sessions, and structured support.",
    isFeatured: true,
    features: [
      "1:1 mentorship with structured guidance",
      "3+ real-world industry projects",
      "Guaranteed paid internship with stipends",
      "Microsoft & industry-recognized certifications",
      "Resume support, career planning & recommendation letters",
      "Unlimited mock interviews & expert feedback",
      "Live classes & active peer community",
      "Aptitude & personality development training",
    ],
  },
  {
    title: "Expert",
    price: "₹29,999",
    subtitle: "For those aiming to go all-in with mentorship, elite training, and deep skill development.",
    features: [
      "1:1 mentorship with structured guidance",
      "3+ real-world industry projects",
      "Guaranteed paid internship with stipends",
      "Microsoft & industry-recognized certifications",
      "Resume support, career planning & recommendation letters",
      "Unlimited mock interviews & expert feedback",
      "Live classes & active peer community",
      "Aptitude & personality development training",
    ],
  },
];

export default function Pricing() {
  return (
 <section className="w-full bg-neutral-950 py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Header title="Choose Your Path" />
          <p className="text-neutral-400 max-w-xl mx-auto">
            Whether you're an independent learner or prefer expert guidance — we’ve got a plan tailored for your journey.
          </p>
        </div>

        {/* Animated Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingOptions.map((option, idx) => {
            const isFeatured = option.isFeatured;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={isFeatured ? { scale: 1.03 } : {}}
                viewport={{once:true ,amount:0.3}}
                className={`flex flex-col justify-between h-full rounded-2xl p-8 shadow-md transition duration-300 ${
                  isFeatured
                    ? "bg-gradient-to-br from-green-800/60 to-neutral-900 shadow-lg"
                    : "bg-neutral-900 border border-neutral-800"
                }`}
              >
                {/* Top Content */}
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-neutral-400 mb-4">{option.subtitle}</p>

                  <div className="text-3xl font-bold text-white mb-6">{option.price}</div>

                  <ul className="space-y-4 mb-6">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="text-green-500 w-5 h-5 mt-1 shrink-0" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-xl pixel-border cursor-pointer shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all ${
                    isFeatured
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  aria-label={`Select the ${option.title} plan`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
