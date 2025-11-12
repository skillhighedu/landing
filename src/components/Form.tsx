"use client";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import CustomButton from "./Button";
import MessageIcon from "./icons/Message";
import { useState } from "react";
import type { ContactUsDetails } from "@/types";
import { sendContactDetails } from "@/services/contactus-service";
import { toast } from "sonner";

type FormProps = {
  backgroundImage: string;
};

export default function Form({ backgroundImage }: FormProps) {
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
    } catch (err) {
      console.error("Error submitting form", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="relative bg-cover bg-center h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.h2
          className="text-white text-4xl sm:text-7xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join Now
        </motion.h2>

        <form className="w-full max-w-md space-y-4" onSubmit={handleFormSubmit}>
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

          {/* Simplified Select */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as ContactUsDetails["category"])
            }
            className="w-full font-bricolage bg-white/90 text-black placeholder:text-gray-700 py-2 px-3 rounded-md border border-gray-300  focus:outline-none"
          >
            <option value="NEWSTUDENT">New Student</option>
            <option value="EXISTING">Existing</option>
          </select>

          <Textarea
            placeholder="Message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white/90 text-black font-bricolage placeholder:text-gray-700 py-4"
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
