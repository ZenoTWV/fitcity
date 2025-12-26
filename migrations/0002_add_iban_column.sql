-- Add encrypted IBAN column for storing bank account details
-- IBAN is encrypted at rest using AES-256-GCM for security
ALTER TABLE signups ADD COLUMN iban_encrypted TEXT;
