import { googleCallBack } from "@/services/auth-service";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // get redirect query param (default to "/")
  const from = searchParams.get("redirect") || "/";

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");

        if (!code) {
          navigate("/signup", { replace: true });
          return;
        }

        // Call backend to exchange code for token
        await googleCallBack(code);

        // Navigate to redirect destination
        navigate(from, {
          replace: true,
        state: { scrollTo: "pricing"},
        });
      } catch (error) {
        console.error("OAuth callback error:", error);
        navigate("/signup", { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate, from]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
