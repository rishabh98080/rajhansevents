import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ||'https://uvoapeploerjdonrrbtp.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY||'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2b2FwZXBsb2VyamRvbnJyYnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MTU5MjksImV4cCI6MjA5OTQ5MTkyOX0.pr_PJK997NwLgv6m2O3zvQhXcFOpt8bfFZh1_vNTu9A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);