import { useState } from "react";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/common/Button";
import { updateProfile } from "@/services/student-service";
import { toast } from "sonner";
import { User, Phone, Mail } from "lucide-react";

export default function ProfileForm({ student }: any) {
  const [name, setName] = useState(student.name);
  const [phoneNumber, setPhoneNumber] = useState(student.phoneNumber || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(name, phoneNumber);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="
        rounded-xl p-6
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-white">
          Personal information
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Update how your profile appears across the platform
        </p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="text-xs uppercase tracking-wide text-neutral-500">
            Name
          </label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                pl-10
                bg-white dark:bg-neutral-800
                border-neutral-300 dark:border-neutral-700
                text-neutral-900 dark:text-white
              "
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs uppercase tracking-wide text-neutral-500">
            Phone
          </label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="
                pl-10
                bg-white dark:bg-neutral-800
                border-neutral-300 dark:border-neutral-700
                text-neutral-900 dark:text-white
              "
            />
          </div>
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wide text-neutral-500">
            Email
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              value={student.email}
              readOnly
              className="
                pl-10 cursor-not-allowed
                bg-neutral-100 dark:bg-neutral-800
                border-neutral-300 dark:border-neutral-700
                text-neutral-500 dark:text-neutral-400
              "
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end">
        <CustomButton
          title={saving ? "Saving..." : "Save changes"}
          onClick={handleSave}
          disabled={saving}
          className="px-6"
        />
      </div>
    </div>
  );
}
