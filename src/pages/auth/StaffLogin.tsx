import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

export default function StaffLogin(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/sales');
    } catch (err) {
      setError('Invalid email or password, or your account may be inactive.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Staff Login</h1>
          <p className="mt-2 text-slate-400">Sign in to access your dashboard</p>
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
            placeholder="staff@example.com"
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
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Are you an admin?{' '}
            <Link to="/login/admin" className="text-cyan-400 hover:text-cyan-300">
              Login as Admin
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            Back to Home
          </Link>
        </div>
        
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
          <p className="text-sm text-slate-400 text-center">
            <span className="text-cyan-400">Note:</span> Staff accounts must be created by an admin. 
            Please contact your administrator if you don't have an account.
          </p>
        </div>
      </Card>
    </div>
  );
}