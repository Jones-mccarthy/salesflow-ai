import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { supabase, confirmUserEmail } from '../../lib/supabase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

    try {
      // First check if user already exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const userExists = existingUsers?.users?.some(user => user.email === email);
      
      if (userExists) {
        setError('A user with this email already exists. Please try a different email.');
        setIsLoading(false);
        return;
      }

      // Step 1: Create auth user
      const { data, error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            contact_number: contactNumber
          }
        }
      });
      
      if (signUpError) throw signUpError;
      if (!data.user) throw new Error('Failed to create user account');
      
      // Step 2: Try to confirm the user's email
      await confirmUserEmail(email);
      
      // Step 3: Insert user record into public.users table
      try {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: email,
            contact_number: contactNumber,
            role: 'admin',
            business_name: 'My Business' // Default business name
          });
        
        if (insertError) throw insertError;
      } catch (insertErr) {
        console.error('Error inserting user record:', insertErr);
        // Continue anyway, as the auth user is created
      }
      
      // Step 4: Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) throw signInError;
      
      // Success - redirect to dashboard
      navigate('/admin/dashboard');
      
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
            label="Contact Number"
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            placeholder="+233 XX XXX XXXX"
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