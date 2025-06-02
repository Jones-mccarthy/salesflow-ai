import React, { useState } from 'react';
import type { ReactNode } from 'react';
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
}: AppLayoutProps): React.ReactElement {
  const { user, role, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
    <div className="min-h-screen w-full bg-gray-900 text-white flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col w-full">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 pt-2 overflow-y-auto w-full">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}