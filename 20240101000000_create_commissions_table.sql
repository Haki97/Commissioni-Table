-- Create the commissions table
CREATE TABLE IF NOT EXISTS commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client TEXT NOT NULL,
  direct BOOLEAN DEFAULT false,
  titre BOOLEAN DEFAULT false,
  compromesso BOOLEAN DEFAULT false,
  estimatedSaleDate DATE NOT NULL,
  commission NUMERIC NOT NULL,
  probability TEXT CHECK (probability IN ('alta', 'media', '100%', 'bassa')),
  documents JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create a function to create the table if it doesn't exist
CREATE OR REPLACE FUNCTION create_commissions_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- The table creation is handled by the migration above
  -- This function is just a placeholder for the RPC call
  RETURN;
END;
$$; 