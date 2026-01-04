
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Swords } from "lucide-react";
import BgImage from "@/assets/images/warrior.jpg";
import CustomButton from "@/components/common/Button";;
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import OtpInput from "@/components/OtpBox";
import { useNavigate, useLocation } from "react-router-dom";
import { login, createAccount } from "@/services/student-service";
import { ForgetPassword } from "@/services/auth-service";
import { toast } from "sonner";
import type { SignupForm } from "@/types";


export default function Signup() {
  const [isSignup, setIsSignup] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [form, setForm] = useState<SignupForm>({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  // const [isLastUsed,setIsLastUser] = useState(false) 
  const [isResetting, setIsResetting] = useState(false);
  const [resetForm, setResetForm] = useState({ email: "" });
  const [resetLoading, setResetLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

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
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={isResetting ? "reset" : "form"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="w-full max-w-md bg-neutral-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-neutral-700"
          >
            {isResetting ? (
              // ====================== Reset Password Flow ======================
              <>
                {!resetEmailSent ? (
                  <>
                    <h2 className="text-2xl text-center text-white mb-2">Forgot Password?</h2>
                    <p className="text-sm text-center text-neutral-400 mb-6">
                      Enter your email to reset password
                    </p>

                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={resetForm.email}
                      onChange={(e) =>
                        setResetForm({ ...resetForm, email: e.target.value })
                      }
                      className="bg-neutral-800 text-white border-neutral-700 focus:border-primary rounded-lg mb-3"
                    />

                    <CustomButton
                      type="button"
                      title={resetLoading ? "Processing..." : "Send OTP"}
                      className="w-full text-white rounded-lg"
                      disabled={resetLoading}
                      onClick={handleForgetPassword}
                    />

                    <p className="text-sm text-center text-neutral-300 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsResetting(false)}
                        className="text-primary hover:underline"
                      >
                        Back to Login
                      </button>
                    </p>
                  </>
                ) : (
                  <div className="text-center">
                    <h2 className="text-2xl text-white mb-4">Check your email!</h2>
                    <p className="text-sm text-neutral-300 mb-6">
                      We have sent a password reset link to {resetForm.email}.
                    </p>
                    <CustomButton
                      type="button"
                      title="Back to Login"
                      className="w-full text-white rounded-lg"
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
                <h2 className="text-2xl text-center text-white mb-2">
                  {isSignup ? "Join the Battle" : "Welcome Back, Warrior"}
                </h2>
                <p className="text-sm text-center text-neutral-400 mb-6">
                  {isSignup ? "Create your account to begin" : "Enter your credentials to continue"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignup && (
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      className="bg-neutral-800 text-white border-neutral-700 focus:border-primary rounded-lg"
                      required
                    />
                  )}

                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-neutral-800 text-white border-neutral-700 focus:border-primary rounded-lg"
                    required
                  />

                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-neutral-800 text-white border-neutral-700 focus:border-primary rounded-lg"
                    required
                  />

                  {!isSignup && (
                    <div className="text-right mt-1">
                      <button
                        type="button"
                        onClick={() => setIsResetting(true)}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <CustomButton
                    type="submit"
                    title={loading ? (isSignup ? "Signing Up..." : "Logging In...") : (isSignup ? "Sign Up" : "Log In")}
                    icon={<Swords />}
                    className="w-full text-white rounded-lg hover:scale-105 transition-transform"
                    disabled={loading}
                  />
                </form>

                <div className="my-4">
             <GoogleLoginButton redirectUrl={from || "/"} />

                </div>

                <p className="text-sm text-center text-neutral-300 mt-6">
                  {isSignup ? "Already have account?" : "New here?"}{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary hover:underline"
                  >
                    {isSignup ? "Log In" : "Sign Up"}
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
