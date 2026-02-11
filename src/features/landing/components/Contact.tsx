import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/common/Button";
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
import Container from "@/layouts/Container";

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
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
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container size="xl">
      <section className="py-20">
        <div className="text-center mb-16">
          <HeaderSection title="Contact Us" />
       
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 font-sans"
          >
            <h2 className="text-3xl font-semibold">
              Let’s talk about your learning journey
            </h2>

            <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
              <p>📧 admin@skillhigh.in</p>
              <p>📞 +91 91826 61204</p>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-neutral-900 border border-border rounded-3xl p-8 space-y-5 shadow-lg"
          >
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Select
              value={category}
              onValueChange={(v) =>
                setCategory(v as ContactUsDetails["category"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXISTING">Existing Student</SelectItem>
                <SelectItem value="NEWSTUDENT">New Student</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Your Message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <CustomButton
              title={isSubmitting ? "Submitting..." : "Send Message"}
              icon={<Swords className="w-5 h-5" />}
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            />
          </motion.form>
        </div>
      </section>
    </Container>
  );
}
