-- This file contains all the SQL needed to set up the SalesFlow AI database
-- It includes schema, triggers, and functions

-- Load the schema first
\i 'schema.sql'

-- Load the user sync function and trigger
\i 'functions/sync_users.sql'

-- Load the auto-confirm users function and trigger
\i 'migrations/20240601000000_auto_confirm_users.sql'

-- Additional setup commands can be added here