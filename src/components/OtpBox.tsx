import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-neutral-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-neutral-700"
      >
        {!verified ? (
          <>
            <h2 className="text-2xl text-center text-white mb-2">
              {isForgetPassword
                ? "Verify to Reset Password"
                : "Verify Your Account"}
            </h2>

            <p className="text-sm text-center text-neutral-400 mb-6">
              Enter the 6-digit OTP sent to{" "}
              {isForgetPassword ? resetEmail : email}
            </p>

            <form
              onSubmit={handleOtpSubmit}
              className="space-y-6 flex flex-col items-center"
            >
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                className="w-full flex justify-center"
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} className="h-12 w-12" />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <CustomButton
                type="submit"
                title={loading ? "Verifying..." : "Verify OTP"}
                className="w-full text-white rounded-lg mt-6"
                disabled={loading}
              />
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl text-center text-white mb-2">
              Set New Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  className="w-full p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700"
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
                  className="w-full p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700"
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
                className="w-full text-white rounded-lg"
                disabled={passwordLoading}
              />
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
