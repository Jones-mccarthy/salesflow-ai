import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'staff';
}

// This component is now simplified to always allow access
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Authentication is disabled, so we always render the children
  return <>{children}</>;
};

export default ProtectedRoute;