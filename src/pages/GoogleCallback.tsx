
import { googleCallBack } from '@/services/auth-service';
import { useEffect } from 'react';
import { useNavigate, useSearchParams,useLocation } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [searchParams] = useSearchParams();
 const from = location.state?.from || "/profile";
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        
        if (!code) {
          navigate('/signup');
          return;
        }

         await googleCallBack(code)
 
 navigate(from, {
          replace: true,
          state: {
            scrollTo: "pricing",
            openPayment: location.state?.openPayment,
          },
        });
        

      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/signup');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

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