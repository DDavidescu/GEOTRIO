import { createClient } from '@supabase/supabase-js'

// Directly hard-code your URL and anon key here:
const supabaseUrl = 'https://kekluxmzniujyrddhro.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtla2xrdXhtem5pdWp5cmRkaHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTA1NDgsImV4cCI6MjA2NDEyNjU0OH0.N5Y4J8RkKQzX0v4QW7dXaoO4N0_lhatYBIXGiV98XP4'

export const supabase = createClient(supabaseUrl, supabaseKey)
