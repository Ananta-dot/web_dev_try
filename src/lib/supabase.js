import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Debug environment variables
console.log('Supabase Environment Check:', {
  NODE_ENV: process.env.NODE_ENV,
  SITE_URL: process.env.REACT_APP_SITE_URL,
  SUPABASE_URL: supabaseUrl ? 'Set' : 'Missing',
  SUPABASE_ANON_KEY: supabaseAnonKey ? 'Set' : 'Missing',
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
