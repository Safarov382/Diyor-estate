import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ylzefbqoxvqwxjougyyd.supabase.co';
const supabaseAnonKey = 'Sb_publishable_VLVWZaHKpOtg9DvSkOdI0w_Npih5_eb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
