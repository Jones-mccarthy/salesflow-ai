import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'admin' | 'staff' | null;
}

export default function AppLayout({ 
  children, 
  requireAuth = true,
  requiredRole = null 
}: AppLayoutProps) {
  const { user, role, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="glass-card p-8 text-center">
          <div className="animate-pulse-slow">Loading...</div>
        </div>
      </div>
    );
  }

  // Redirect if authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/" replace />;
  }

  // Redirect if specific role is required but user doesn't have it
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If no auth required or user is authenticated with correct role
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 pt-2 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}