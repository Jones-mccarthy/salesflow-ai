import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../utils/logger";

// Mock User type to replace the Supabase User type
interface User {
  id: string;
  email: string;
}

type Role = "admin" | "staff";

interface UserProfile {
  role: Role;
  business_name: string | null;
  businessName?: string | null; // For backward compatibility
}

interface AuthContextType {
  user: User | null;
  role: Role | null;
  business_name: string | null;
  businessName: string | null; // Keep for backward compatibility
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: Role, business_name: string) => Promise<{ emailConfirmationRequired: boolean; user: User } | void>;
  logout: () => Promise<void>;
  loading: boolean;
  staffMembers: Array<Record<string, unknown>>;
  addStaffMember: (staff: Record<string, unknown>) => void;
  updateStaffStatus: (id: string, status: 'active' | 'inactive') => void;
  resetStaffPassword: (id: string, newPassword: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded mock user for testing
const mockUser: User = {
  id: "mock-admin-user-id",
  email: "admin@example.com"
};

// Hardcoded mock user profile for testing
const mockUserProfile: UserProfile = {
  role: "admin",
  business_name: "Test Business",
  businessName: "Test Business"
};

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(mockUserProfile);
  const [loading, setLoading] = useState(false);
  const [staffMembers, setStaffMembers] = useState<Array<Record<string, unknown>>>([]);
  const navigate = useNavigate();

  // Auto-navigate to dashboard on app load
  useEffect(() => {
    navigate('/admin/dashboard');
  }, [navigate]);

  const login = async (_email: string, _password: string) => {
    // Skip actual login, just use the mock user
    setUser(mockUser);
    setUserProfile(mockUserProfile);
    navigate('/admin/dashboard');
  };

  const signup = async (_email: string, _password: string, role: Role, business_name: string) => {
    // Skip actual signup, just use the mock user with provided business name
    const profile = {
      ...mockUserProfile,
      role,
      business_name,
      businessName: business_name
    };
    
    setUser(mockUser);
    setUserProfile(profile);
    navigate('/admin/dashboard');
    
    return {
      emailConfirmationRequired: false,
      user: mockUser
    };
  };

  const logout = async () => {
    // For testing, we'll still allow logout
    setUser(null);
    setUserProfile(null);
    navigate("/");
  };

  // Staff management functions
  const addStaffMember = (staff: Record<string, unknown>) => {
    const newStaff = {
      id: Date.now().toString(),
      ...staff
    };
    setStaffMembers(prev => [...prev, newStaff]);
  };

  const updateStaffStatus = (id: string, status: 'active' | 'inactive') => {
    setStaffMembers(prev => 
      prev.map(staff => staff.id === id ? { ...staff, status } : staff)
    );
  };

  const resetStaffPassword = (id: string, newPassword: string) => {
    console.log(`Password for staff ${id} reset to: ${newPassword}`);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role: userProfile?.role || null, 
      business_name: userProfile?.business_name || null,
      businessName: userProfile?.business_name || null,
      login, 
      signup, 
      logout, 
      loading,
      staffMembers,
      addStaffMember,
      updateStaffStatus,
      resetStaffPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};