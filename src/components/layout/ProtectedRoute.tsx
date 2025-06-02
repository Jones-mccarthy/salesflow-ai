import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'staff';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
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

  // Redirect if user is not logged in
  if (!user) {
    return <Navigate to="/login/admin" replace />;
  }

  // Redirect if specific role is required but user doesn't have it
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated with correct role
  return <>{children}</>;
};

export default ProtectedRoute;