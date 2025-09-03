import Header from "./Header";
import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import CustomButton from "./Button";
import { usePricingsStore } from "@/store/usePricingStore";
import { fetchSelectedCourse } from "@/services/course-service";
import { toast } from "sonner";
import { Verified } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import type { SelectedCourse } from "@/types/course";
import { useNavigate } from "react-router-dom";
import { initiateRazorpayPayment } from "@/lib/razorpay";

interface PricingProps {
  courseSlug: string;
}

// Custom modal component
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
 useEffect(() => {
  if (isOpen) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
  } else {
    const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY); // Restore scroll position
  }

  return () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
  };
}, [open])

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 rounded-3xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const Pricing = forwardRef<HTMLDivElement, PricingProps>(({ courseSlug }, ref) => {
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; title: string; price: number; per: string } | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<{ id: string; title: string; price: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pricings } = usePricingsStore();
  const [loading,setLoading] = useState(false)
  const [registrationAmount, setRegistrationAmount] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse | null>(null);
  const [isFullPayment, setIsFullPayment] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleOpenModal = (plan: { id: string; title: string; price: number; per: string }) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    setSelectedAmount(null);
    setIsFullPayment(false);
    setRegistrationAmount(null);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetchSelectedCourse(courseSlug ?? "");
      setSelectedCourse(res);
    };
    fetchCourse();
  }, [courseSlug]);

  useEffect(() => {
    async function calculate() {
      if (selectedPlan?.price !== undefined && selectedPlan.per !== undefined) {
        const result = await calRegAmount(selectedPlan.price, selectedPlan.per);
        setRegistrationAmount(result);
      }
    }
    calculate();
  }, [selectedPlan]);

  console.log(selectedPlan)

async function calRegAmount(planAmount: number, percentage: number | string): Promise<number> {
  try {
    let numericPercentage: number;
    console.log(percentage)
    if (typeof percentage === "string") {
      numericPercentage = parseFloat(percentage.replace("%", ""));
    } else {
      numericPercentage = percentage;
    }
    console.log(numericPercentage)


    if (isNaN(numericPercentage)) throw new Error("Invalid percentage");
    return (planAmount * numericPercentage) / 100;
  } catch (error) {
    console.error("Error calculating registration amount:", error);
    return 0;
  }
}

  async function handlePayment() {

    setLoading(true)
    if (!isAuthenticated) {
      navigate("/signup", { replace: true });
      return;
    }

    try {
      await initiateRazorpayPayment({
        courseId: selectedCourse?.id!,
        priceId: selectedAmount?.id!,
        isFullPayment,
      });
      handleCloseModal();
      toast.success("Payment Successful!");
    
      
    } catch (err) {
      console.error(err);
      toast.error("Payment failed or cancelled.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={ref} className="w-full py-20 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Header
            title="Choose Your Path"
            subline="Whether you're an independent learner or prefer expert guidance, we have a plan tailored for your journey."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricings.map((option, idx) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`flex flex-col justify-between rounded-3xl p-8 transition-all duration-300
                ${idx === 1
                  ? "bg-gradient-to-br from-green-900 via-primary to-green-950 border-green-500"
                  : "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 border-neutral-800 shadow-xl hover:shadow-2xl"
                }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                <p className="text-4xl font-extrabold text-white mb-4">₹{option.price.toLocaleString()}</p>

                <ul className="space-y-4">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Verified className=" w-5 h-5 mt-1 flex-shrink-0" />
                      <div className="text-sm font-bricolage leading-snug">
                        <h2 className="text-md">{feature.name}</h2>
                        <p className="text-neutral-300 mt-1">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <CustomButton
                title="Get Started"
                icon=""
                onClick={() =>
                  handleOpenModal({
                    id: option.id,
                    title: option.name,
                    price: option.price,
                    per: option.slotBookingPercentage
                      ? `${option.slotBookingPercentage}%`
                      : `${option.slotBookingPercentage}`,
                  })
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Custom Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-2xl  mb-2">Confirm Your Registration</h2>
          <p className="text-neutral-400 mb-6">
            Secure your spot in the <strong>{selectedPlan?.title}</strong> plan.
          </p>

          <div className="flex gap-4 justify-between text-sm mb-4">
            <div
              className={`flex-1 cursor-pointer rounded-xl p-4 text-center border transition-all duration-200
                ${selectedAmount?.title === "Pre-Registration Fee" ? "border-primary bg-neutral-800" : "border-neutral-700 hover:border-primary"}`}
              onClick={() => {
                setSelectedAmount({
                  id: selectedPlan?.id ?? "",
                  title: "Pre-Registration Fee",
                  price: registrationAmount ?? 0,
                });
                setIsFullPayment(false);
              }}
            >
              <p className="text-neutral-400 mb-1">Pre-Registration Fee</p>
              <p className="text-primary text-xl">₹{registrationAmount?.toLocaleString() ?? "—"}</p>
            </div>

            <div
              className={`flex-1 cursor-pointer rounded-xl p-4 text-center border transition-all duration-200
                ${selectedAmount?.title === "Total Plan Cost" ? "border-primary bg-neutral-800" : "border-neutral-700 hover:border-primary"}`}
              onClick={() => {
                setSelectedAmount({
                  id: selectedPlan?.id ?? "",
                  title: "Total Plan Cost",
                  price: selectedPlan?.price ?? 0,
                });
                setIsFullPayment(true);
              }}
            >
              <p className="text-neutral-400 mb-1">Total Plan Cost</p>
              <p className="text-primary text-xl">₹{selectedPlan?.price.toLocaleString()}</p>
            </div>
          </div>

          <p className="text-sm text-neutral-400 text-center mb-4">
            Remaining balance will be payable after registration.
          </p>

          {selectedAmount?.price && (
            <CustomButton title={loading ? "Please wait..":"Finish Payment"} icon="" className="w-full font-normal" onClick={handlePayment} />
          )}
        </Modal>
      </div>
    </section>
  );
});

export default Pricing;
