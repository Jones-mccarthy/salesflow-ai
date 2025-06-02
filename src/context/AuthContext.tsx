import React, { createContext, useContext, useState } from "react";
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

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false); // Set to false initially
  const [staffMembers, setStaffMembers] = useState<Array<Record<string, unknown>>>([]);
  const navigate = useNavigate();

  // No session fetching or auth state change listeners needed

  // No need for fetchUserProfile anymore

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      logger.info(`Mock login for user: ${email}`);
      
      // Create a mock user
      const mockUser = {
        id: `mock-${Date.now()}`,
        email: email
      };
      
      // Set user state
      setUser(mockUser as any);
      setUserProfile({
        role: 'admin',
        business_name: 'Mock Business'
      });
      
      logger.info(`Mock user logged in successfully`);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Login error: ${err.message}`);
      } else {
        logger.error('Unknown login error');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: Role, business_name: string) => {
    setLoading(true);
    try {
      // Skip actual authentication for now
      logger.info(`Creating mock user with email ${email}`);
      
      // Create a mock user
      const mockUser = {
        id: `mock-${Date.now()}`,
        email: email,
        role: role,
        business_name: business_name
      };
      
      // Set user state
      setUser(mockUser as any);
      setUserProfile({
        role: role,
        business_name: business_name
      });
      
      logger.info(`Mock user created successfully`);
      
      // Return success
      return { 
        emailConfirmationRequired: false,
        user: mockUser as any
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(`Signup error: ${err.message}`);
      } else {
        logger.error(`Signup error: Unknown error`);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Simply clear the user state
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
    // In a real app, this would call an API to reset the password
    console.log(`Password for staff ${id} reset to: ${newPassword}`);
    // No need to update state as password isn't stored in our mock data
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role: userProfile?.role || null, 
      business_name: userProfile?.business_name || null,
      businessName: userProfile?.business_name || null, // For backward compatibility
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