import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/auth/SignupPage';
import AdminLogin from './pages/auth/AdminLogin';
import StaffLogin from './pages/auth/StaffLogin';
import EmailConfirmedPage from './pages/auth/EmailConfirmedPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import DebtsPage from './pages/DebtsPage';
import InsightsPage from './pages/InsightsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/staff" element={<StaffLogin />} />
          <Route path="/confirmed" element={<EmailConfirmedPage />} />
          
          {/* Protected routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/inventory" element={
            <ProtectedRoute>
              <AppLayout>
                <InventoryPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/sales" element={
            <ProtectedRoute>
              <AppLayout>
                <SalesPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/debts" element={
            <ProtectedRoute>
              <AppLayout>
                <DebtsPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/insights" element={
            <ProtectedRoute>
              <AppLayout>
                <InsightsPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/subscription" element={
            <ProtectedRoute>
              <AppLayout>
                <SubscriptionPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;