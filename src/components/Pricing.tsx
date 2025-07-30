import { Check } from "lucide-react";

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
      "No live classes or mentorship"
    ],
  },
  {
    title: "Mentor-Guided",
    price: "₹14,999",
    subtitle: "For learners who want expert guidance, live sessions, and structured support.",
    features: [
      "1:1 mentorship with structured guidance",
      "3+ real-world industry projects",
      "Guaranteed paid internship with stipends",
      "Microsoft & industry-recognized certifications",
      "Resume support, career planning & recommendation letters",
      "Unlimited mock interviews & expert feedback",
      "Live classes & active peer community",
      "Aptitude & personality development training"
    ],
  },
   {
    title: "Expert",
    price: "₹29,999",
    subtitle: "For learners who want expert guidance, live sessions, and structured support.",
    features: [
      "1:1 mentorship with structured guidance",
      "3+ real-world industry projects",
      "Guaranteed paid internship with stipends",
      "Microsoft & industry-recognized certifications",
      "Resume support, career planning & recommendation letters",
      "Unlimited mock interviews & expert feedback",
      "Live classes & active peer community",
      "Aptitude & personality development training"
    ],
  },
];

export default function Pricing() {
  return (
    <section className="w-full bg-neutral-950 py-16 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Choose Your Path</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto mb-12">
          Whether you're an independent learner or prefer expert guidance — we’ve got a plan tailored for your journey.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingOptions.map((option, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-left shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold mb-2">{option.title}</h3>
              <p className="text-neutral-400 mb-4">{option.subtitle}</p>

              <div className="text-3xl font-bold text-white mb-6">{option.price}</div>

              <ul className="space-y-3 mb-6">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="text-green-500 w-5 h-5 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-neutral-200 transition">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
