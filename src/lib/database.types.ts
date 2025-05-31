export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password: string | null
          role: 'admin' | 'staff'
          business_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password?: string | null
          role: 'admin' | 'staff'
          business_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string | null
          role?: 'admin' | 'staff'
          business_name?: string | null
          created_at?: string
        }
      }
      inventory: {
        Row: {
          id: string
          user_id: string
          name: string
          quantity: number
          unit_price: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          quantity: number
          unit_price: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          quantity?: number
          unit_price?: number
          created_at?: string
        }
      }
      sales: {
        Row: {
          id: string
          inventory_id: string
          quantity_sold: number
          total_price: number
          sold_at: string
        }
        Insert: {
          id?: string
          inventory_id: string
          quantity_sold: number
          total_price: number
          sold_at?: string
        }
        Update: {
          id?: string
          inventory_id?: string
          quantity_sold?: number
          total_price?: number
          sold_at?: string
        }
      }
      debts: {
        Row: {
          id: string
          user_id: string
          type: 'owed_to_user' | 'owed_by_user'
          name: string
          amount: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'owed_to_user' | 'owed_by_user'
          name: string
          amount: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'owed_to_user' | 'owed_by_user'
          name?: string
          amount?: number
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: 'trial' | 'active' | 'expired'
          start_date: string
          end_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status: 'trial' | 'active' | 'expired'
          start_date: string
          end_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'trial' | 'active' | 'expired'
          start_date?: string
          end_date?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'staff'
      debt_type: 'owed_to_user' | 'owed_by_user'
      subscription_status: 'trial' | 'active' | 'expired'
    }
  }
}