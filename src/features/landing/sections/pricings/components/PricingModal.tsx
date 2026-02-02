import CustomButton from '@/components/common/Button';

export default function PricingModal({
  open,
  onClose,
  registrationAmount,
  fullAmount,
  onPay,
}: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-3xl p-6 w-full max-w-md">
        <h2 className="text-2xl mb-4">Confirm Registration</h2>

        <div className="space-y-4">
          <CustomButton
            title={`Pay ₹${registrationAmount}`}
            onClick={() => onPay(false)}
          />
          <CustomButton
            title={`Pay ₹${fullAmount}`}
            onClick={() => onPay(true)}
          />
        </div>

        <button onClick={onClose} className="mt-4 text-neutral-400">
          Cancel
        </button>
      </div>
    </div>
  );
}
