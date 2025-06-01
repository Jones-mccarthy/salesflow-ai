import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import logger from "../utils/logger";

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
  const [loading, setLoading] = useState(true);
  const [staffMembers, setStaffMembers] = useState<Array<Record<string, unknown>>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
          return;
        }
        
        if (data.session) {
          setUser(data.session.user);
          await fetchUserProfile(data.session.user.id);
        }
      } catch (err) {
        console.error("Failed to get session:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    try {
      const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event);
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      });

      return () => {
        listener?.subscription.unsubscribe();
      };
    } catch (err) {
      console.error("Error setting up auth listener:", err);
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      
      // First try with business_name column
      let { data, error } = await supabase
        .from("users")
        .select("role, business_name")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Failed to fetch user profile with business_name:", error.message);
        
        // Try with businessName column as fallback
        const result = await supabase
          .from("users")
          .select("role, businessName")
          .eq("id", userId)
          .single();
          
        if (result.data) {
          // Convert businessName to business_name for consistency
          data = { 
            role: result.data.role,
            business_name: (result.data as any).businessName 
          };
        } else {
          data = result.data;
        }
        error = result.error;
        
        if (error) {
          console.error("Failed to fetch user profile with businessName:", error.message);
          return;
        }
      }

      if (data) {
        console.log("User profile data:", data);
        // Handle both column name possibilities
        const businessNameValue = data.business_name || (data as any).businessName || null;
        setUserProfile({
          role: data.role as Role,
          business_name: businessNameValue
        });
      } else {
        console.warn("No user profile found for ID:", userId);
      }
    } catch (err) {
      console.error("Exception in fetchUserProfile:", err);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      logger.info(`Attempting login for user: ${email}`);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        logger.error(`Login error: ${error.message}`);
        throw error;
      }
      
      if (data.user) {
        logger.info(`User logged in successfully: ${data.user.id}`);
        setUser(data.user);
        await fetchUserProfile(data.user.id);
      } else {
        logger.warn('Login successful but no user data returned');
      }
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
      // Create auth user
      logger.info(`Creating new auth user with email ${email}`);
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            role: role,
            business_name: business_name
          }
        }
      });
      
      if (error) {
        logger.error(`Auth signup error: ${error.message}`);
        throw error;
      }
      
      if (data.user) {
        logger.info(`User created with ID: ${data.user.id}`);
        
        // Check if email confirmation is required
        const emailConfirmationRequired = !data.user.email_confirmed_at;
        
        try {
          // Check if profile already exists
          const { data: existingProfile } = await supabase
            .from("users")
            .select("id")
            .eq("id", data.user.id)
            .single();
            
          if (existingProfile) {
            logger.warn(`User profile already exists for ID: ${data.user.id}`);
          } else {
            // Create user profile
            logger.info(`Creating user profile with role: ${role}`);
            const { error: profileError } = await supabase
              .from("users")
              .insert({
                id: data.user.id,
                email: data.user.email,
                role: role,
                business_name: business_name
              });
            
            if (profileError) {
              // If insert fails due to duplicate key, try update instead
              if (profileError.message.includes('duplicate key')) {
                logger.warn(`Duplicate key detected, trying update instead`);
                const { error: updateError } = await supabase
                  .from("users")
                  .update({
                    email: data.user.email,
                    role: role,
                    business_name: business_name
                  })
                  .eq("id", data.user.id);
                  
                if (updateError) {
                  logger.error(`Update error: ${updateError.message}`);
                  throw updateError;
                }
              } else {
                logger.error(`Insert error: ${profileError.message}`);
                throw profileError;
              }
            }
          }
          
          logger.info(`User profile created/updated successfully`);
          setUser(data.user);
          setUserProfile({
            role: role,
            business_name: business_name
          });
          
          // Return result with email confirmation status
          return { 
            emailConfirmationRequired: emailConfirmationRequired,
            user: data.user
          };
        } catch (profileErr: unknown) {
          if (profileErr instanceof Error) {
            logger.error(`Profile creation error: ${profileErr.message}`);
          } else {
            logger.error(`Profile creation error: Unknown error`);
          }
          throw profileErr;
        }
      }
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
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during logout:", error);
        throw error;
      }
      setUser(null);
      setUserProfile(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
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