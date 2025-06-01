import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

export default function EmailConfirmedPage(): React.ReactElement {
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the email confirmation callback
    const handleEmailConfirmation = async () => {
      const { hash } = window.location;
      if (hash && hash.includes('access_token')) {
        // Process the callback from Supabase
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error processing confirmation:', error);
        } else if (data.session) {
          // Start countdown for auto-redirect
          const timer = setInterval(() => {
            setRedirectCountdown(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate('/admin/dashboard');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          return () => clearInterval(timer);
        }
      }
    };

    handleEmailConfirmation();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-900/30 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Email Confirmed!</h1>
          <p className="mt-2 text-slate-400">Your email has been successfully verified.</p>
        </div>

        <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 text-green-400 rounded text-center">
          Your email is confirmed. You will be redirected to the dashboard in {redirectCountdown} seconds.
        </div>

        <div className="mt-6">
          <Button 
            className="w-full"
            onClick={() => navigate('/admin/dashboard')}
          >
            Go to Dashboard Now
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}