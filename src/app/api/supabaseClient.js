import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("NEXT_PUBLIC_SUPABASE_URL =", supabaseUrl);
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY exists =", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Environment variables are missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);