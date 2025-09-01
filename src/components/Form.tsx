import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import CustomButton from "./Button";
import MessageIcon from "./icons/Message";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { ContactUsDetails } from "@/types";
import { sendContactDetails } from "@/services/contactus-service";
import { toast } from "sonner";

type FormProps = {
  backgroundImage: string;
};

export default function Form({ backgroundImage }: FormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [category, setcategory] =
    useState<ContactUsDetails["category"]>("NEWSTUDENT");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !phone || !category) {
      toast.error("All fields are required")
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
  
      toast.success(response)
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setcategory("NEWSTUDENT");
    } catch (err) {
      console.error("Error submitting form", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="relative bg-cover bg-center h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-x-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.h1
          className="text-white text-4xl sm:text-7xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join Now
        </motion.h1>

        <form
          className="w-full max-w-md space-y-4"
          onSubmit={handleFormSubmit}
        >
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/90 text-black placeholder:text-gray-700 py-4"
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/90 text-black placeholder:text-gray-700 py-4"
          />
          <Input
            placeholder="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-white/90 text-black placeholder:text-gray-700 py-4"
          />

          <Select
            value={category}
            onValueChange={(value) =>
              setcategory(value as ContactUsDetails["category"])
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
            placeholder="Message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white/90 text-black placeholder:text-gray-700 py-4"
          />

          <CustomButton
            title={isSubmitting ? "Sending..." : "Send Message"}
            icon={<MessageIcon />}
            className="w-full"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
