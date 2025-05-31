# SalesFlow AI

A SaaS application for shop owners to manage sales, inventory, debts, and insights.

## Supabase Setup

This project uses Supabase for the backend database and authentication. Follow these steps to set up your Supabase project:

1. Create a new project on [Supabase](https://supabase.com)

2. Run the SQL script in `supabase/schema.sql` in the Supabase SQL editor to create the database schema

3. Copy your Supabase URL and anon key from the project settings

4. Create a `.env` file in the root directory based on `.env.example` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Restart your development server

## Database Schema

The application uses the following tables:

### users
- id (UUID, PK)
- email (text, unique)
- password (hashed, optional if using Supabase Auth)
- role (enum: 'admin' | 'staff')
- created_at (timestamp)

### inventory
- id (UUID, PK)
- user_id (FK to users)
- name (text)
- quantity (integer)
- unit_price (float)
- created_at (timestamp)

### sales
- id (UUID, PK)
- inventory_id (FK to inventory)
- quantity_sold (integer)
- total_price (float)
- sold_at (timestamp)

### debts
- id (UUID, PK)
- user_id (FK to users)
- type (enum: 'owed_to_user' | 'owed_by_user')
- name (text)
- amount (float)
- created_at (timestamp)

### subscriptions
- id (UUID, PK)
- user_id (FK to users)
- status (enum: 'trial' | 'active' | 'expired')
- start_date (timestamp)
- end_date (timestamp)
- created_at (timestamp)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```