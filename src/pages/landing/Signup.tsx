import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Check, X, Eye, EyeOff, ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import CustomButton from "@/components/common/Button";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import OtpInput from "@/components/OtpBox";
import { useNavigate, useLocation } from "react-router-dom";
import { login, createAccount } from "@/services/student-service";
import { ForgetPassword } from "@/services/auth-service";
import { toast } from "sonner";
import type { SignupForm } from "@/types";

const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;
  return strength;
};

const getStrengthColor = (strength: number) => {
  if (strength === 0) return "bg-neutral-300 dark:bg-neutral-700";
  if (strength === 1) return "bg-red-500";
  if (strength === 2) return "bg-yellow-500";
  if (strength === 3) return "bg-blue-500";
  return "bg-green-500";
};

const getStrengthLabel = (strength: number) => {
  if (strength === 0) return "No password";
  if (strength === 1) return "Weak";
  if (strength === 2) return "Fair";
  if (strength === 3) return "Good";
  return "Strong";
};

export default function Signup() {
  const [isSignup, setIsSignup] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetForm, setResetForm] = useState({ email: "" });
  const [resetLoading, setResetLoading] = useState(false);
  const [, setResetEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = useMemo(
    () => calculatePasswordStrength(form.password),
    [form.password],
  );

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/profile";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleMode = () => {
    setIsSignup((value) => !value);
    setForm({ name: "", email: "", password: "" });
    setIsResetting(false);
    setResetEmailSent(false);
    setShowPassword(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        await createAccount(form.name, form.email, form.password);
        setIsOtpSent(true);
      } else {
        await login(form.email, form.password);
        navigate(from, {
          replace: true,
          state: {
            scrollTo: "pricing",
            openPayment: location.state?.openPayment,
          },
        });
      }
    } catch {
      // Existing error handling/toasts are managed by services.
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async () => {
    if (!resetForm.email) {
      toast.error("Email is required");
      return;
    }

    setResetLoading(true);

    try {
      const response = await ForgetPassword(resetForm.email);
      toast.success(response);
      setResetEmailSent(true);
      setIsOtpSent(true);
    } catch {
      // Existing error handling/toasts are managed by services.
    } finally {
      setResetLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: easeOut },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const otpVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  if (isOtpSent) {
    return (
      <motion.div
        key="otp"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={otpVariants}
        className="min-h-screen flex items-center justify-center bg-background px-4 text-foreground"
      >
        <OtpInput
          email={form.email}
          name={form.name}
          password={form.password}
          isForgetPassword={isResetting}
          resetEmail={resetForm.email}
          onClose={() => {
            setIsOtpSent(false);
            setIsResetting(false);
            setResetEmailSent(false);
            setResetForm({ email: "" });
          }}
        />
      </motion.div>
    );
  }

  const showStrengthUI = isSignup && !!form.password;

  return (
    <div className="relative min-h-screen overflow-hidden  bg-neutral-100 dark:bg-neutral-950">
      <motion.div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(13,130,103,0.18),_transparent_38%),linear-gradient(to_bottom,_rgba(255,255,255,0.96),_rgba(244,244,245,0.98))] dark:bg-[radial-gradient(circle_at_top,_rgba(13,130,103,0.16),_transparent_34%),linear-gradient(to_bottom,_rgba(10,10,10,0.92),_rgba(3,7,18,0.98))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10 flex min-h-screen mt-10 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isResetting ? "reset" : "auth"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/78 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
          >
            {isResetting ? (
              <div className="w-full p-6 sm:p-8 md:p-10">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetting(false);
                    setResetEmailSent(false);
                    setResetForm({ email: "" });
                  }}
                  className="inline-flex cursor-pointer items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-primary dark:text-neutral-300"
                >
                  <ArrowLeft size={16} />
                  Back to login
                </button>

                <div className="mt-6 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <ShieldCheck size={24} />
                  </div>

                  <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
                    Forgot your password?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    Enter your email and we&apos;ll send a verification code to help you reset it.
                  </p>
                </div>

                <div className="mb-6 mt-6 rounded-2xl border border-neutral-200 bg-white/70 p-4 dark:border-neutral-800 dark:bg-neutral-900/40">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary">
                      <Mail size={16} />
                    </div>
                    <div className="space-y-1 text-sm font-mono">
                      <p className="font-semibold text-neutral-900 dark:text-white">
                        Reset steps
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400">1. Enter your email</p>
                      <p className="text-neutral-600 dark:text-neutral-400">2. Verify the OTP code</p>
                      <p className="text-neutral-600 dark:text-neutral-400">3. Set a new password</p>
                    </div>
                  </div>
                </div>

                <div className="mx-auto max-w-xl space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                      <Input
                        type="email"
                        placeholder="yourname@email.com"
                        value={resetForm.email}
                        onChange={(e) =>
                          setResetForm({ ...resetForm, email: e.target.value })
                        }
                        className="rounded-xl border-2 border-neutral-200 bg-white/85 py-3 pl-11 text-neutral-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-white"
                      />
                    </div>
                  </div>

                  <CustomButton
                    type="button"
                    title={resetLoading ? "Sending code..." : "Send Verification Code"}
                    className="w-full"
                    disabled={resetLoading}
                    onClick={handleForgetPassword}
                  />

                  <p className="text-center text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                    We&apos;ll send the verification code only to the email linked with your account.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="hidden border-r border-black/5 bg-[linear-gradient(180deg,rgba(13,130,103,0.08),rgba(13,130,103,0.02))] p-8 dark:border-white/5  lg:flex lg:flex-col lg:justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary/80">
                      SkillHigh Access
                    </p>
                    <h2 className="mt-4 max-w-sm text-3xl font-black leading-normal text-neutral-950 dark:text-white">
                      {isSignup ? "Start learning with a new account." : "Pick up where you left off."}
                    </h2>
                    <p className="mt-4 max-w-md font-mono text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                      {isSignup
                        ? "Create your account to access courses, quizzes, projects, certificates, and your dashboard."
                        : "Login to continue your learning progress, profile updates, and course activity without interruption."}
                    </p>
                  </div>

                  <div className="mt-10 space-y-4">
                    {[
                      "Track progress across lessons, quizzes, and projects.",
                      "Keep certificates, profile, and dashboard data in one place.",
                      "Switch between login and signup from the same screen.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border font-mono border-black/8 bg-white/72 px-4 py-4 text-sm leading-6 text-neutral-700 shadow-sm dark:border-white/8 dark:bg-white/5 dark:text-neutral-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-10">
                  <div className="mx-auto w-full max-w-xl">
                    <div className="mb-6 inline-grid w-full grid-cols-2 rounded-2xl border border-black/10 bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
                      <button
                        type="button"
                        onClick={() => {
                          if (isSignup) toggleMode();
                        }}
                        className={`rounded-[1rem] px-4 py-3 text-sm transition-all ${
                          !isSignup
                            ? "bg-primary text-white shadow-sm"
                            : "text-neutral-600 hover:bg-black/5  dark:text-neutral-400 dark:hover:bg-white/5"
                        }`}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isSignup) toggleMode();
                        }}
                        className={`rounded-[1rem] px-4 py-3 text-sm  transition-all ${
                          isSignup
                            ? "bg-primary text-white shadow-sm"
                            : "text-neutral-600 hover:bg-black/5 dark:text-neutral-400 dark:hover:bg-white/5"
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-center text-md sm:text-3xl font-black text-neutral-900 dark:text-white">
                        {isSignup ? "Create your account" : "Welcome back"}
                      </h2>
                      <p className="mt-2 text-center font-mono text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                        {isSignup
                          ? "Use your details below to get started."
                          : "Login with your email and password to continue."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {isSignup && (
                        <div>
                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                            Full Name
                          </label>
                          <Input
                            name="name"
                            placeholder="Full name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border-2 border-neutral-200 bg-white/85 px-4 py-3 text-neutral-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-white"
                            required
                          />
                        </div>
                      )}

                      <div>
                        <label className="mb-2 block text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border-2 border-neutral-200 bg-white/85 px-4 py-3 text-neutral-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                          <span>Password</span>
                          {isSignup && form.password && (
                            <span
                              className={`rounded px-2 py-1 text-xs font-semibold ${
                                passwordStrength <= 1
                                  ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                  : passwordStrength === 2
                                    ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                    : passwordStrength === 3
                                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                      : "bg-green-500/10 text-green-600 dark:text-green-400"
                              }`}
                            >
                              {getStrengthLabel(passwordStrength)}
                            </span>
                          )}
                        </label>

                        <div className="relative">
                          <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full rounded-xl border-2 border-neutral-200 bg-white/85 px-4 py-3 pr-12 text-neutral-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-white"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors hover:text-primary"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>

                        {showStrengthUI && (
                          <div className="mt-3 space-y-2">
                            <div className="flex gap-1">
                              {[...Array(4)].map((_, index) => (
                                <div
                                  key={index}
                                  className={`h-1.5 flex-1 rounded-full transition-all ${
                                    index < passwordStrength
                                      ? getStrengthColor(passwordStrength)
                                      : "bg-neutral-200 dark:bg-neutral-700"
                                  }`}
                                />
                              ))}
                            </div>

                            <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                              <div className="flex items-center gap-2">
                                {form.password.length >= 8 ? (
                                  <Check size={14} className="text-green-600 dark:text-green-400" />
                                ) : (
                                  <X size={14} className="text-neutral-400 dark:text-neutral-500" />
                                )}
                                <span>At least 8 characters</span>
                              </div>

                              <div className="flex items-center gap-2">
                                {form.password.match(/[a-z]/) && form.password.match(/[A-Z]/) ? (
                                  <Check size={14} className="text-green-600 dark:text-green-400" />
                                ) : (
                                  <X size={14} className="text-neutral-400 dark:text-neutral-500" />
                                )}
                                <span>Uppercase & lowercase letters</span>
                              </div>

                              <div className="flex items-center gap-2">
                                {form.password.match(/[0-9]/) ? (
                                  <Check size={14} className="text-green-600 dark:text-green-400" />
                                ) : (
                                  <X size={14} className="text-neutral-400 dark:text-neutral-500" />
                                )}
                                <span>Number included</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {!isSignup && (
                        <div className="text-right">
                          <button
                            type="button"
                            onClick={() => setIsResetting(true)}
                            className="text-sm text-neutral-700 transition-colors hover:text-primary dark:text-neutral-300"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}

                      <CustomButton
                        type="submit"
                        title={
                          loading
                            ? isSignup
                              ? "Creating Account..."
                              : "Logging in..."
                            : isSignup
                              ? "Sign Up"
                              : "Login"
                        }
                        className="w-full rounded-xl text-white"
                        disabled={loading || (isSignup && passwordStrength < 3)}
                      />
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-200 dark:border-neutral-700" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white/90 px-3 text-neutral-500 dark:bg-neutral-950/85">
                          or continue with
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <GoogleLoginButton redirectUrl={from || "/"} />
                    </div>

                    <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                      {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {isSignup ? "Login" : "Sign Up"}
                      </button>
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
