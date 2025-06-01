import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import your context and pages below
// Contexts
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
// Pages
import LandingPage from './pages/LandingPage';
import AdminDashboardPage from './pages/admin/DashboardPage';
import StaffManagementPage from './pages/admin/StaffManagementPage';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import DebtsPage from './pages/DebtsPage';
import InsightsPage from './pages/InsightsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import DashboardPage from './pages/DashboardPage';
// Auth Pages
import AdminLogin from './pages/auth/AdminLogin';
import StaffLogin from './pages/auth/StaffLogin';
import SignupPage from './pages/auth/SignupPage';
import EmailConfirmedPage from './pages/auth/EmailConfirmedPage';
import { useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';

// Protected route component
import React from 'react';
import type { ReactNode } from 'react';

const ProtectedRoute = ({ children, requiredRole = null }: { children: ReactNode; requiredRole?: "admin" | "staff" | null }) => {
  const { user, role, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="glass-card p-8 text-center">
          <div className="animate-pulse-slow">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <AppLayout>{children}</AppLayout>;
};

export default function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <div className="tech-background min-h-screen text-white">
        <div className="tech-glow"></div>
        <Router>
          <ErrorBoundary>
            <AuthProvider>
              <DataProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login/admin" element={<AdminLogin />} />
                  <Route path="/login/staff" element={<StaffLogin />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/confirmed" element={<EmailConfirmedPage />} />
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute requiredRole={"admin"}>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/staff" element={
                    <ProtectedRoute requiredRole={"admin"}>
                      <StaffManagementPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/inventory" element={
                    <ProtectedRoute>
                      <InventoryPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/sales" element={
                    <ProtectedRoute>
                      <SalesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/debts" element={
                    <ProtectedRoute>
                      <DebtsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/insights" element={
                    <ProtectedRoute>
                      <InsightsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/subscription" element={
                    <ProtectedRoute>
                      <SubscriptionPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </DataProvider>
            </AuthProvider>
          </ErrorBoundary>
        </Router>
      </div>
    </ErrorBoundary>
  );
}