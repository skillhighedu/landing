'use client';


import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Swords, Check, X, Eye, EyeOff } from "lucide-react";
import BgImage from "@/assets/images/warrior.jpg";
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
  if (strength === 0) return "bg-neutral-600";
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
  const [isSignup, setIsSignup] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [form, setForm] = useState<SignupForm>({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetForm, setResetForm] = useState({ email: "" });
  const [resetLoading, setResetLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = useMemo(() => calculatePasswordStrength(form.password), [form.password]);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/profile";
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setForm({ name: "", email: "", password: "" });
    setIsResetting(false);
    setResetEmailSent(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async () => {
    if (!resetForm.email) return toast.error("Email is required");
    setResetLoading(true);
    try {
      const response = await ForgetPassword(resetForm.email);
      toast.success(response);
      setIsOtpSent(true); // show OTP for password reset
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setResetLoading(false);
    }
  };

  // ====================== Animated variants ======================
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const otpVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  // ====================== OTP screen ======================
  if (isOtpSent) {
    return (
      <motion.div
        key="otp"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={otpVariants}
        className="min-h-screen flex items-center justify-center"
      >
        <OtpInput
          email={form.email}
          name={form.name}
          password={form.password}
          isForgetPassword={false} // true if resetting
          resetEmail={resetForm.email}

          onClose={() => {
            setIsOtpSent(false);   // close OTP form
            setIsResetting(false); // back to login form
            setResetEmailSent(false);
          }}
        />
      </motion.div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
   
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/95 z-0 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={isResetting ? "reset" : "form"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="w-full max-w-md pixel-form-border rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-900 backdrop-blur-xl p-8 md:p-10"
          >
            {isResetting ? (
              // ====================== Reset Password Flow ======================
              <>
                {!resetEmailSent ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-3xl font-black text-white mb-2 text-center">Recover Access</h2>
                      <p className="text-sm text-center text-neutral-400">
                        Enter your email to receive password reset instructions
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 block">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="warrior@example.com"
                          value={resetForm.email}
                          onChange={(e) =>
                            setResetForm({ ...resetForm, email: e.target.value })
                          }
                          className="bg-neutral-800/60 text-white border-2 border-neutral-700 focus:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all px-4 py-3"
                        />
                      </div>

                      <CustomButton
                        type="button"
                        title={resetLoading ? "Sending..." : "Send Reset Link"}
                        className="w-full text-white rounded-md font-bold py-3 hover:scale-105 transition-transform"
                        disabled={resetLoading}
                        onClick={handleForgetPassword}
                      />

                      <button
                        type="button"
                        onClick={() => setIsResetting(false)}
                        className="w-full text-sm text-neutral-300 hover:text-primary transition-colors py-2"
                      >
                        Back to Login
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-3">Check Your Email</h2>
                    <p className="text-sm text-neutral-300 mb-8">
                      We've sent a password reset link to{" "}
                      <span className="font-semibold text-primary">{resetForm.email}</span>
                    </p>
                    <CustomButton
                      type="button"
                      title="Back to Login"
                      className="w-full text-white rounded-md font-bold py-3"
                      onClick={() => {
                        setIsResetting(false);
                        setResetEmailSent(false);
                        setResetForm({ email: "" });
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              // ====================== Signup/Login Flow ======================
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-white mb-2 text-center">
                    {isSignup ? "Enter the Arena" : "Welcome Back"}
                  </h2>
                  <p className="text-sm text-center text-neutral-400">
                    {isSignup ? "Create your warrior profile" : "Continue your quest"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {isSignup && (
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 block">
                        Full Name
                      </label>
                      <Input
                        name="name"
                        placeholder="Warrior Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-neutral-800/60 text-white border-2 border-neutral-700 focus:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all px-4 py-3"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 block">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-800/60 text-white border-2 border-neutral-700 focus:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all px-4 py-3"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center justify-between">
                      <span>Password</span>
                      {form.password && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          passwordStrength <= 1 ? 'text-red-400 bg-red-500/10' :
                          passwordStrength === 2 ? 'text-yellow-400 bg-yellow-500/10' :
                          passwordStrength === 3 ? 'text-blue-400 bg-blue-500/10' :
                          'text-green-400 bg-green-500/10'
                        }`}>
                          {getStrengthLabel(passwordStrength)}
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter secure password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full bg-neutral-800/60 text-white border-2 border-neutral-700 focus:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all px-4 py-3 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex gap-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-1.5 rounded-full transition-all ${
                                i < passwordStrength ? getStrengthColor(passwordStrength) : 'bg-neutral-700'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-neutral-400 space-y-1">
                          <div className="flex items-center gap-2">
                            {form.password.length >= 8 ? (
                              <Check size={14} className="text-green-400" />
                            ) : (
                              <X size={14} className="text-neutral-500" />
                            )}
                            <span>At least 8 characters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {form.password.match(/[a-z]/) && form.password.match(/[A-Z]/) ? (
                              <Check size={14} className="text-green-400" />
                            ) : (
                              <X size={14} className="text-neutral-500" />
                            )}
                            <span>Uppercase & lowercase letters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {form.password.match(/[0-9]/) ? (
                              <Check size={14} className="text-green-400" />
                            ) : (
                              <X size={14} className="text-neutral-500" />
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
                        className="text-sm text-neutral-300 hover:text-primary transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <CustomButton
                    type="submit"
                    title={loading ? (isSignup ? "Creating Account..." : "Entering Arena...") : (isSignup ? "Create Account" : "Enter")}
                    icon={<Swords size={20} />}
                    className="w-full text-white rounded-md font-bold py-3 hover:scale-105 transition-transform"
                    disabled={loading || (isSignup && passwordStrength < 3)}
                  />
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gradient-to-br from-neutral-950 to-neutral-900 text-neutral-500">or continue with</span>
                  </div>
                </div>

                <div className="mb-6">
                  <GoogleLoginButton redirectUrl={from || "/"} />
                </div>

                <p className="text-sm text-center text-neutral-400">
                  {isSignup ? "Already have an account?" : "New warrior?"}{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {isSignup ? "Sign In" : "Create Account"}
                  </button>
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
