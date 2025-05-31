import AppLayout from '../components/layout/AppLayout';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { role } = useAuth();
  
  // Redirect to the appropriate dashboard based on role
  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (role === 'staff') {
    return <Navigate to="/staff/dashboard" replace />;
  }
  
  // If role is not determined yet, show loading in AppLayout
  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Loading dashboard...</p>
      </div>
    </AppLayout>
  );
}