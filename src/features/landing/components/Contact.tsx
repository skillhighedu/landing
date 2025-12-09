import Trees from "@/assets/images/warrior.jpg";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/common/Button";;
import { Swords } from "lucide-react";
import HeaderSection from "@/components/common/HeaderSection";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { sendContactDetails } from "@/services/contactus-service";
import type { ContactUsDetails } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ContactUs() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [category, setCategory] =
    useState<ContactUsDetails["category"]>("NEWSTUDENT");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !phone || !category) {
      toast.error("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload: ContactUsDetails = {
        name,
        email,
        phone,
        category,
        message,
      };

      const response = await sendContactDetails(payload);

      toast.success(response);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCategory("NEWSTUDENT");
    } catch (err) {
      console.error("Error submitting form", err);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${Trees})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <HeaderSection title="Contact Us" />
        
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Hero Text + Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-white space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl  leading-tight drop-shadow-lg">
              Ready to Take Your Skills to the Next Level?
            </h1>
            <p className="text-lg sm:text-xl font-bricolage font-light max-w-lg">
              To fight in the modern world, a sword isn’t enough. Reach out and let us equip you with knowledge, mentorship, and real-world projects.
            </p>

            {/* Optional Info Panel */}
            <div className="bg-neutral-900/70 p-6 rounded-xl shadow-lg space-y-3 border border-neutral-700 font-bricolage">
              <p className="text-neutral-400">📧 <strong>Email:</strong> admin@skillhigh.in</p>
              <p className="text-neutral-400">📞 <strong>Phone:</strong> +919182661204</p> 
              
            </div>
          </motion.div>

          {/* Right: Form Card */}
          <motion.form
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-neutral-900/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-neutral-700 space-y-5"
          >
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 py-4 text-white placeholder:text-neutral-400"
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 py-4 text-white"
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 py-4 text-white "
            />
          
          <Select
            value={category}
            onValueChange={(value) =>
              setCategory(value as ContactUsDetails["category"])
            }
          >
            <SelectTrigger className="bg-white/90 text-black placeholder:text-gray-700 py-4 w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EXISTING">Existing</SelectItem>
              <SelectItem value="NEWSTUDENT">New Student</SelectItem>
            </SelectContent>
          </Select>
            <Textarea
              placeholder="Your Message"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 py-4 text-white placeholder:text-neutral-400"
            />
            <CustomButton
              title={isSubmitting ? "Submitting..." : "Begin My Training"}
              icon={<Swords className="w-5 h-5" />}
              className="w-full hover:scale-105 transition-transform duration-200"
              type="submit"
              disabled={isSubmitting}
            />
          </motion.form>
        </div>
      </div>
    </div>
  );
}
