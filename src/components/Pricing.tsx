import { Check } from "lucide-react";
import Header from "./Header";
import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import CustomButton from "./Button";

const pricingOptions = [
  {
    title: "Self-Paced",
    price: 5500,
    per: "27.27%",
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
    price: 12000,
    per: "25%",
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
    price: 30000,
    per: "15%",
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

const Pricing = forwardRef<HTMLDivElement>((_, ref) => {
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: number; per: string } | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<{ title: string; price: number; } | null>(null);

  const [registrationAmount, setRegistrationAmount] = useState<number | null>(null);

  useEffect(() => {
    async function calculate() {
      if (selectedPlan?.price !== undefined && selectedPlan.per !== undefined) {
        const result = await calRegAmount(selectedPlan.price, selectedPlan.per);
        setRegistrationAmount(result);
      }
    }

    calculate();
  }, [selectedPlan]);

  async function calRegAmount(planAmount: number, percentage: string): Promise<number> {
    try {
      const numericPercentage = parseFloat(percentage.replace('%', ''));
      if (isNaN(numericPercentage)) throw new Error('Invalid percentage format');
      return (planAmount * numericPercentage) / 100;
    } catch (error) {
      console.error('Error calculating registration amount:', error);
      return 0;
    }
  }

  return (
    <section ref={ref} className="w-full bg-neutral-950 py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Header title="Choose Your Path" />
          <p className="text-neutral-400 max-w-xl mx-auto">
            Whether you're an independent learner or prefer expert guidance — we’ve got a plan tailored for your journey.
          </p>
        </div>

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
                viewport={{ once: true, amount: 0.3 }}
                className={`flex flex-col justify-between h-full rounded-2xl p-8  transition duration-300 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] ${isFeatured
                  ? "bg-gradient-to-br from-green-800/60 to-neutral-900 shadow-lg"
                  : "bg-neutral-900 border border-neutral-800"
                  }`}
              >
                <div>
                  <h3 className="text-2xl  mb-2">{option.title}</h3>
                  <p className="text-neutral-400 mb-4">{option.subtitle}</p>
                  <div className="text-3xl font-bold text-white mb-6">₹{option.price.toLocaleString()}</div>

                  <ul className="space-y-4 mb-6">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="text-green-500 w-5 h-5 mt-1 shrink-0" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA with Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedPlan(option)}
                      className={`w-full py-3 rounded-xl pixel-border cursor-pointer shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all ${isFeatured
                        ? "bg-white text-black hover:bg-neutral-200"
                        : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                    >
                      Get Started
                    </motion.button>
                  </DialogTrigger>

                  <DialogContent className="bg-neutral-900 border border-neutral-800 text-white max-w-md rounded-2xl p-6 space-y-4">
                    <DialogHeader className="space-y-1">
                      <DialogTitle className=" text-2xl">
                        Confirm Your Registration
                      </DialogTitle>
                      <DialogDescription className="text-neutral-400">
                        Secure your spot in the <strong>{selectedPlan?.title}</strong> plan.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-4 justify-between text-sm">
                      <div className={`flex-1 cursor-pointer bg-neutral-800 rounded-xl p-4 text-center border transition-all duration-200 ${selectedAmount?.title === "Pre-Registration Fee"
                          ? "border-green-500 bg-neutral-700"
                          : "border-neutral-700 hover:border-primary"
                        }`} onClick={() =>
                          setSelectedAmount({
                            title: "Pre-Registration Fee",
                            price: registrationAmount ?? 0,
                          })
                        } >
                        <p className="text-neutral-400 mb-1">Pre-Registration Fee</p>
                        <p className="text-green-400  text-xl">
                          ₹{registrationAmount !== null ? registrationAmount.toLocaleString() : "—"}
                        </p>
                      </div>
                      <div className={`flex-1 cursor-pointer bg-neutral-800 rounded-xl p-4 text-center border transition-all duration-200 ${selectedAmount?.title === "Total Plan Cost"
                          ? "border-green-500 bg-neutral-700"
                          : "border-neutral-700 hover:border-primary"
                        }`} onClick={() =>
                          setSelectedAmount({
                            title: "Total Plan Cost",
                            price: selectedAmount?.price ?? 0,
                          })
                        }>
                        <p className="text-neutral-400 mb-1">Total Plan Cost</p>
                        <p className=" text-green-400 text-xl">
                          ₹{selectedPlan?.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-400 text-center">
                      The remaining balance will be payable after registration.
                    </p>

                   {selectedAmount?.price && <DialogFooter>

                      <CustomButton title="Finish Payment" icon="" className="w-full font-normal" />
                    </DialogFooter>}
                  </DialogContent>
                </Dialog>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";
export default Pricing;
