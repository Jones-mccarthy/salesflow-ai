import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate email match
    if (email !== confirmEmail) {
      setError('Email addresses do not match');
      setIsLoading(false);
      return;
    }

    // Validate business name
    if (!businessName.trim()) {
      setError('Business name is required');
      setIsLoading(false);
      return;
    }

    try {
      // Use the signup function from AuthContext
      const result = await signup(email, password, 'admin', businessName);
      
      if (result) {
        // Success - redirect to dashboard
        navigate('/admin/dashboard');
      }
    } catch (err: unknown) {
      console.error('Signup error:', err);
      if (err instanceof Error) {
        setError(err.message || 'Failed to sign up');
      } else {
        setError('Failed to sign up');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Card className="max-w-md w-full glass-card">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Create Admin Account</h1>
          <p className="mt-2 text-cyan-400">Sign up to start your free trial</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-400 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />

          <Input
            label="Confirm Email Address"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />

          <Input
            label="Business Name"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            placeholder="Your Business Name"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            minLength={8}
          />

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
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