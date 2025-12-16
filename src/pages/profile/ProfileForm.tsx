import { useState } from "react";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/common/Button";
import { motion } from "framer-motion";
import { updateProfile } from "@/services/student-service";
import { toast } from "sonner";

interface ProfileFormProps {
  student: {
    name: string;
    email: string;
    phoneNumber?: string;
  };
  onUpdate?: (updated: { name: string; phoneNumber?: string }) => void;
}

export default function ProfileForm({ student, onUpdate }: ProfileFormProps) {
  const [name, setName] = useState(student?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(student?.phoneNumber || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      // call API
      const res = await updateProfile( name, phoneNumber );

      // optimistic update to parent if provided
      onUpdate?.({ name, phoneNumber });

      toast.success(res || "Profile updated successfully");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update profile. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-neutral-900 via-zinc-800 to-neutral-900 p-6 rounded-2xl shadow-xl border border-neutral-700"
    >
      <h2 className="text-2xl text-white mb-6">Your Profile</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Name */}
        <div className="flex-1">
          <label className="block text-gray-300 mb-1">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-neutral-800 text-white border-neutral-700"
          />
        </div>

        {/* Phone */}
        <div className="flex-1">
          <label className="block text-gray-300 mb-1">Phone</label>
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-neutral-800 text-white border-neutral-700"
          />
        </div>
      </div>

      {/* Email (read-only) */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="flex-1">
          <label className="block text-gray-300 mb-1">Email</label>
          <Input
            type="email"
            value={student?.email}
            readOnly
            className="bg-neutral-800 text-white border-neutral-700 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <CustomButton
          title={loading ? "Saving..." : "Save Changes"}
          onClick={handleSave}
          disabled={loading}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
    </motion.div>
  );
}

