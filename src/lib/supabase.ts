import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import logger from '../utils/logger';

// These environment variables need to be set in your project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log configuration info (without exposing keys)
logger.info(`Initializing Supabase client with URL: ${supabaseUrl ? 'Set' : 'Not set'}`);
logger.info(`Supabase anon key: ${supabaseAnonKey ? 'Set' : 'Not set'}`);

// Create client with debug mode in development
export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey,
  { 
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'salesflow-auth-storage',
      storage: {
        getItem: (key) => {
          try {
            const storedSession = localStorage.getItem(key);
            return storedSession;
          } catch (error) {
            console.error('Error getting auth session from storage:', error);
            return null;
          }
        },
        setItem: (key, value) => {
          try {
            localStorage.setItem(key, value);
          } catch (error) {
            console.error('Error setting auth session to storage:', error);
          }
        },
        removeItem: (key) => {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.error('Error removing auth session from storage:', error);
          }
        }
      }
    },
    // Log database queries in development
    db: {
      schema: 'public',
    },
  }
);

// Helper function to manually confirm a user's email
export const confirmUserEmail = async (email: string): Promise<boolean> => {
  try {
    // First try with the RPC function
    const { error: rpcError } = await supabase.rpc('confirm_user', {
      email_address: email
    });
    
    if (!rpcError) {
      return true;
    }
    
    // If RPC fails, try direct SQL query (less secure but may work)
    const { error: queryError } = await supabase.from('manual_operations')
      .insert({ operation: 'confirm_email', email: email });
      
    return !queryError;
  } catch (error) {
    console.error('Error confirming user email:', error);
    return false;
  }
};

// Log successful initialization
logger.info('Supabase client initialized');

// Type definitions for database tables
export type User = Database['public']['Tables']['users']['Row'];
export type InventoryItem = Database['public']['Tables']['inventory']['Row'];
export type Sale = Database['public']['Tables']['sales']['Row'];
export type Debt = Database['public']['Tables']['debts']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];