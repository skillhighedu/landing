import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowUpRight,
  MessageSquareText,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import HeaderSection from "@/components/common/HeaderSection";
import CustomButton from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/layouts/Container";
import { submitContactLead } from "@/services/contactus-service";
import type { ContactUsDetails } from "@/types";

type ContactField = keyof ContactUsDetails;

const categoryOptions: Array<{
  value: ContactUsDetails["category"];
  label: string;
  description: string;
}> = [
  {
    value: "NEWSTUDENT",
    label: "New Student",
    description: "I want to explore courses, mentorship, or admissions.",
  },
  {
    value: "EXISTING",
    label: "Existing Student",
    description: "I need help with my current learning journey or course access.",
  },
];

const contactCards = [
  {
    title: "Email us",
    value: "admin@skillhigh.in",
    description: "Best for course questions, support, and partnership enquiries.",
    icon: Mail,
    href: "mailto:admin@skillhigh.in",
  },
  {
    title: "Call us",
    value: "+91 9182661204",
    description: "Talk to our team directly if you want faster guidance.",
    icon: Phone,
    href: "tel:+919182661204",
  },
  {
    title: "Visit us",
    value: "Begumpet, Hyderabad",
    description: "Teachers Colony, Greenlands, Hyderabad, Telangana 500016.",
    icon: MapPin,
  },
  {
    title: "Response time",
    value: "Within 24 hours",
    description: "We usually reply the same day on working hours.",
    icon: Clock3,
  },
];

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<ContactUsDetails["category"]>("NEWSTUDENT");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Partial<Record<ContactField, boolean>>>({});

  const errors = useMemo(() => {
    const nextErrors: Partial<Record<keyof ContactUsDetails, string>> = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    const normalizedPhone = phone.replace(/\D/g, "");
    if (!normalizedPhone) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(normalizedPhone)) {
      nextErrors.phone = "Phone must be exactly 10 digits.";
    }

    if (!category) {
      nextErrors.category = "Choose a category.";
    }

    if (!message.trim()) {
      nextErrors.message = "Message is required.";
    }

    return nextErrors;
  }, [category, email, message, name, phone]);

  const shouldShowError = (field: ContactField) =>
    Boolean(errors[field] && (hasSubmitted || touchedFields[field]));

  const markTouched = (field: ContactField) => {
    setTouchedFields((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  };

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHasSubmitted(true);
    setSubmitError("");
    setSuccessMessage("");

    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the highlighted fields and try again.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload: ContactUsDetails = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.replace(/\D/g, ""),
        category,
        message: message.trim(),
      };

      const response = await submitContactLead(payload);

      toast.success(response.message);
      setSuccessMessage(response.message);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCategory("NEWSTUDENT");
      setHasSubmitted(false);
      setTouchedFields({});
    } catch {
      const fallback = "Failed to submit. Please try again.";
      setSubmitError(fallback);
      toast.error(fallback);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container size="xl">
      <section className="pb-16 pt-20 sm:pb-20">
        <div className="mb-12 text-center sm:mb-16">
          <HeaderSection title="Contact Us" />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="space-y-8"
          >
            <div className="overflow-hidden rounded-[32px] border border-neutral-200 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-8 font-mono text-white shadow-xl sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                Let&apos;s Build Your Next Step
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
                Talk to the team and get clear guidance for your learning journey.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-300 sm:text-base">
                Whether you&apos;re exploring SkillHigh for the first time or already learning with us, we&apos;ll help you find the right next move.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contactCards.map(({ title, value, description, icon: Icon, href }) => {
                  const content = (
                    <div className="h-full rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-primary/30 hover:bg-white/8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                          <Icon size={18} />
                        </div>
                        {href ? <ArrowUpRight size={16} className="text-neutral-400" /> : null}
                      </div>
                      <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-300">
                        {title}
                      </h3>
                      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-400">{description}</p>
                    </div>
                  );

                  if (!href) {
                    return <div key={title}>{content}</div>;
                  }

                  return (
                    <a key={title} href={href} className="block cursor-pointer">
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  What can we help with?
                </h3>
                <ul className="mt-4 space-y-3 font-mono text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  <li>Course guidance and admissions support</li>
                  <li>Learning roadmap and mentorship questions</li>
                  <li>Existing student help with access or payments</li>
                </ul>
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  What happens after you submit?
                </h3>
                <ul className="mt-4 space-y-3 font-mono text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  <li>Our team reviews your request</li>
                  <li>We reach out on email or phone</li>
                  <li>You get the right next action, clearly and quickly</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="self-start rounded-[32px] border border-neutral-200 bg-white p-6 shadow-xl sm:p-8 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                Send A Message
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-white">
                Tell us what you need
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                Share a few details and our team will get back to you with the right help.
              </p>
            </div>

            <div className="space-y-5">
              {successMessage ? (
                <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                  {successMessage}
                </div>
              ) : null}

              {submitError ? (
                <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
                  {submitError}
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => markTouched("name")}
                      className="h-12 pl-10 text-neutral-900 placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-500"
                    />
                  </div>
                  {shouldShowError("name") ? <p className="text-sm text-red-600 dark:text-red-300">{errors.name}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => markTouched("email")}
                      className="h-12 pl-10 text-neutral-900 placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-500"
                    />
                  </div>
                  {shouldShowError("email") ? <p className="text-sm text-red-600 dark:text-red-300">{errors.email}</p> : null}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => markTouched("phone")}
                      className="h-12 pl-10 text-neutral-900 placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-500"
                    />
                  </div>
                  {shouldShowError("phone") ? <p className="text-sm text-red-600 dark:text-red-300">{errors.phone}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-white">
                    I am contacting as
                  </label>
                  <Select
                    value={category}
                    onValueChange={(value) => {
                      setCategory(value as ContactUsDetails["category"]);
                      markTouched("category");
                    }}
                  >
                    <SelectTrigger className="h-12 text-neutral-900 dark:text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="text-neutral-900 dark:text-white">
                      {categoryOptions.map((option) => (
                        <SelectItem
                          key={option.label}
                          value={option.value}
                          className="text-neutral-900 dark:text-white"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {shouldShowError("category") ? <p className="text-sm text-red-600 dark:text-red-300">{errors.category}</p> : null}
                </div>
              </div>

              <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                  Selected Category
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">
                  {categoryOptions.find((option) => option.value === category)?.label ?? "New Student"}
                </p>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {categoryOptions.find((option) => option.value === category)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900 dark:text-white">
                  Message
                </label>
                <div className="relative">
                  <MessageSquareText className="absolute left-3 top-4 h-4 w-4 text-neutral-400" />
                  <Textarea
                    placeholder="Tell us what you need help with"
                    rows={7}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => markTouched("message")}
                    className="resize-none pl-10 pt-3 text-neutral-900 placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-500"
                  />
                </div>
                {shouldShowError("message") ? <p className="text-sm text-red-600 dark:text-red-300">{errors.message}</p> : null}
              </div>

              <CustomButton
                title={isSubmitting ? "Submitting..." : "Send Message"}
                type="submit"
                className="w-full justify-center"
                disabled={isSubmitting}
              />

              <p className="text-center text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                By submitting this form, you agree to let us contact you regarding your enquiry.
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </Container>
  );
}
