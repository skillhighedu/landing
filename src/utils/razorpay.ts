// utils/razorpay.ts

/**
 * Dynamically loads the Razorpay Checkout script.
 * Returns a promise that resolves to true if loaded successfully, false otherwise.
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Prevent multiple script tags
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return resolve(true);
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
