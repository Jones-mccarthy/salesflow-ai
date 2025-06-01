import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

export default function EmailConfirmedPage(): React.ReactElement {
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the email confirmation callback
    const handleEmailConfirmation = async () => {
      try {
        // Get the current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError('Failed to verify your session. Please try signing in.');
          setIsProcessing(false);
          return;
        }
        
        if (sessionData.session) {
          console.log('User is authenticated, redirecting to dashboard');
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
          
          setIsProcessing(false);
          return () => clearInterval(timer);
        } else {
          // Try to extract token from URL if no session
          const fragment = window.location.hash;
          if (fragment && fragment.includes('access_token')) {
            try {
              // Parse the hash fragment
              const params = new URLSearchParams(fragment.substring(1));
              const accessToken = params.get('access_token');
              
              if (accessToken) {
                // Set the session with the token
                const { error: setSessionError } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: params.get('refresh_token') || '',
                });
                
                if (setSessionError) {
                  console.error('Error setting session:', setSessionError);
                  setError('Failed to authenticate. Please try signing in.');
                } else {
                  // Successfully set session, start redirect
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
            } catch (err) {
              console.error('Error processing token:', err);
              setError('Failed to process authentication. Please try signing in.');
            }
          } else {
            setError('No authentication token found. Please try signing in.');
          }
        }
      } catch (err) {
        console.error('Error in email confirmation:', err);
        setError('An unexpected error occurred. Please try signing in.');
      } finally {
        setIsProcessing(false);
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

        {error ? (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 text-red-400 rounded text-center">
            {error}
          </div>
        ) : (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 text-green-400 rounded text-center">
            Your email is confirmed. {!isProcessing && `You will be redirected to the dashboard in ${redirectCountdown} seconds.`}
          </div>
        )}

        <div className="mt-6">
          <Button 
            className="w-full"
            onClick={() => navigate('/admin/dashboard')}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Go to Dashboard Now'}
          </Button>
        </div>

        {error && (
          <div className="mt-4 text-center">
            <Link to="/login/admin" className="text-sm text-cyan-400 hover:text-cyan-300">
              Sign In Instead
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}