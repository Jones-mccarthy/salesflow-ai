import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'staff';
}

// Simplified ProtectedRoute that always allows access
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Always render children without any checks
  return <>{children}</>;
};

export default ProtectedRoute;