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
          const storedSession = localStorage.getItem(key);
          return storedSession;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, value);
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        }
      }
    },
    // Log database queries in development
    db: {
      schema: 'public',
    },
  }
);

// Log successful initialization
logger.info('Supabase client initialized');

// Type definitions for database tables
export type User = Database['public']['Tables']['users']['Row'];
export type InventoryItem = Database['public']['Tables']['inventory']['Row'];
export type Sale = Database['public']['Tables']['sales']['Row'];
export type Debt = Database['public']['Tables']['debts']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];