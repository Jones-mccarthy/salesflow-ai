# SalesFlow AI

A SaaS web application for managing sales, inventory, staff roles, and business insights.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Supabase (Auth + Database)
- **Payment**: Stripe (future implementation)
- **Hosting**: Vercel
- **UI**: Custom dark theme with glassmorphism

## Features

- Role-based authentication (admin & staff)
- Admin invites staff via email (staff can't self-register)
- Email confirmation is disabled (users are auto-confirmed)
- Business management
- Inventory tracking
- Sales recording
- Voice input feature

## Database Schema

The application uses the following tables:

- `auth.users` - Managed by Supabase Auth
- `public.users` - Synced from auth.users via trigger
- `inventory` - For tracking products and stock
- `sales` - For recording sales transactions
- `debts` - For tracking debts
- `subscriptions` - For managing subscription status

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a Supabase project and set up the database schema
4. Apply the SQL migrations in the `supabase/migrations` folder
5. Apply the SQL functions in the `supabase/functions` folder
6. Set up environment variables in `.env` file
7. Run the development server: `npm run dev`

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

The database setup includes:

1. Tables for users, inventory, sales, debts, and subscriptions
2. Triggers to sync auth.users to public.users
3. Triggers to auto-confirm new users
4. Row-level security policies

## Authentication Flow

1. Admin signup: Creates an account with business name
2. Admin is auto-confirmed (no email verification required)
3. Admin can invite staff members
4. Staff cannot self-register, they must be invited

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`