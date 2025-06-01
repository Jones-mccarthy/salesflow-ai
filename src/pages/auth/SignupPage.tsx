import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Check if user is already confirmed
  useEffect(() => {
    const checkUserConfirmation = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.email_confirmed_at) {
        setIsConfirmed(true);
        
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
    };
    
    checkUserConfirmation();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const result = await signup(email, password, 'admin', businessName);
      
      // Check if email confirmation is required
      if (result?.emailConfirmationRequired) {
        setSuccess('Please confirm your email to activate your account. Check your inbox.');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err: unknown) {
      console.error('Signup error:', err);
      if (err instanceof Error && err.message?.includes('duplicate key')) {
        setError('A user with this email already exists. Please try logging in instead.');
      } else if (err instanceof Error) {
        setError(err.message || 'Failed to sign up');
      } else {
        setError('Failed to sign up');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfirmed) {
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
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Create Admin Account</h1>
          <p className="mt-2 text-slate-400">Sign up to start your free trial</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-400 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-900/30 border border-green-500/50 text-green-400 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            placeholder="Your Business Name"
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !!success}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up as Admin'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login/admin" className="text-cyan-400 hover:text-cyan-300">
              Sign In
            </Link>
          </p>
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