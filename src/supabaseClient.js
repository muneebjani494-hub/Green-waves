import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nzjedjbrvjtrtprmsinc.supabase.co';
const supabaseAnonKey = 'sb_publishable_esT3vNH3a4ogJZNYCVC-kA_C96apivg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
