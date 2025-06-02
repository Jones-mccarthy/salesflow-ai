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
          
          {/* Protected routes - authentication is disabled, so these are accessible to everyone */}
          <Route path="/admin/dashboard" element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          } />
          
          <Route path="/inventory" element={
            <AppLayout>
              <InventoryPage />
            </AppLayout>
          } />
          
          <Route path="/sales" element={
            <AppLayout>
              <SalesPage />
            </AppLayout>
          } />
          
          <Route path="/debts" element={
            <AppLayout>
              <DebtsPage />
            </AppLayout>
          } />
          
          <Route path="/insights" element={
            <AppLayout>
              <InsightsPage />
            </AppLayout>
          } />
          
          <Route path="/subscription" element={
            <AppLayout>
              <SubscriptionPage />
            </AppLayout>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;