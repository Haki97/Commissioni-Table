-- Add isClosed column to commissions table
ALTER TABLE commissions
ADD COLUMN isClosed BOOLEAN DEFAULT false; 