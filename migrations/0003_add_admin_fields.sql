-- Add admin fields for managing signups
ALTER TABLE signups ADD COLUMN paid_in_person INTEGER DEFAULT 0; -- 0 = not paid, 1 = paid
ALTER TABLE signups ADD COLUMN admin_notes TEXT;
