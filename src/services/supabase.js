import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jfyctkgwzapudocvktmy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeWN0a2d3emFwdWRvY3ZrdG15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI1ODIsImV4cCI6MjAzNzQwODU4Mn0.QliS176_gkklfZOaKSndB9EB1fxMCfDXxY3PuJqLqoc";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
