import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, KeyRound, MailCheck, ShieldCheck } from "lucide-react";
import BgImage from "@/assets/images/warrior.jpg";
import CustomButton from "@/components/common/Button";
import { toast } from "sonner";
import {
  verifyOtp,
  verifyForgetOtp,
  setNewPassword,
} from "@/services/student-service";

interface OtpInputProps {
  email: string;
  name: string;
  password: string;
  isForgetPassword?: boolean;
  resetEmail?: string;
  onClose?: () => void;
}

export default function OtpInput({
  email,
  name,
  password,
  isForgetPassword = false,
  resetEmail,
  onClose,
}: OtpInputProps) {
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const [newPassword, setNewPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================= OTP VERIFY ================= */
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otpValue.length !== 6)
      return toast.error("Enter valid 6-digit OTP");

    try {
      setLoading(true);

      if (isForgetPassword) {
        /* Forgot password OTP */
        await verifyForgetOtp(resetEmail!, otpValue);
        setVerified(true);
        toast.success("OTP verified. Set your new password.");
      } else {
        /* Signup OTP */
        await verifyOtp(name, email, password, otpValue);
        toast.success("Account created successfully!");

        if (onClose) onClose(); // close modal
        return;
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong, try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SET NEW PASSWORD ================= */
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword)
      return toast.error("All fields are required");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      setPasswordLoading(true);

      const res = await setNewPassword(newPassword, confirmPassword);
      toast.success(res);

      setVerified(false);
      setOtpValue("");
      setNewPasswordValue("");
      setConfirmPassword("");

      if (onClose) onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b dark:from-black/70 dark:via-black/60 dark:to-black/90 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-[28px] border border-neutral-200 bg-white p-8 shadow-xl backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-900/80"
      >
        {!verified ? (
          <>
            <div className="mb-6">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="mb-5 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-primary dark:text-neutral-300"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                {isForgetPassword ? <MailCheck size={24} /> : <ShieldCheck size={24} />}
              </div>

              <h2 className="mb-2 text-center text-2xl text-black dark:text-white">
              {isForgetPassword
                ? "Verify to Reset Password"
                : "Verify Your Account"}
              </h2>

              <p className="text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400 font-mono">
                Enter the 6-digit verification code sent to{" "}
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {isForgetPassword ? resetEmail : email}
                </span>
              </p>
            </div>

            <div className="mb-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950/70">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                Security check
              </p>
              <p className="mt-2 font-mono text-sm text-neutral-700 dark:text-neutral-300">
                This code expires soon. Enter it carefully to continue.
              </p>
            </div>

            <form
              onSubmit={handleOtpSubmit}
              className="space-y-6 flex flex-col items-center"
            >
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                className="w-full flex justify-center text-white"
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} className="h-12 w-12 rounded-xl border-neutral-300 dark:border-neutral-700" />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <CustomButton
                type="submit"
                title={loading ? "Verifying..." : "Verify OTP"}
                className="mt-2 w-full "
                disabled={loading}
              />
            </form>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <KeyRound size={24} />
              </div>
              <h2 className="mb-2 text-center text-2xl text-black dark:text-white">
                Set New Password
              </h2>
              <p className="text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Choose a strong password you haven&apos;t used before.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white p-3 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white p-3 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <CustomButton
                type="submit"
                title={passwordLoading ? "Updating..." : "Set Password"}
                className="w-full rounded-xl text-white"
                disabled={passwordLoading}
              />
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
