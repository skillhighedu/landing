
import { googleCallBack } from '@/services/auth-service';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        
        if (!code) {
          console.error('No authorization code received');
          navigate('/login');
          return;
        }

         await googleCallBack(code)
 
          navigate("/profile", { replace: true });
        

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