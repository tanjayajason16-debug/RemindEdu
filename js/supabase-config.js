// --- supabase-config.js ---

// TODO: Replace these with your actual Supabase URL and Anon Key!
// Automatically extracted from the provided anon key
const SUPABASE_URL = "https://censkhvtkdjzviwmebgc.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlbnNraHZ0a2RqenZpd21lYmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzkzNzMsImV4cCI6MjA5MjYxNTM3M30.p4rr5T__1OXlbkcSWC6IVMRT1D_9vf6fo6cC94cQHfY";

// Initialize the Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabaseClient = supabase;

// We will overwrite localStorage.setItem to also sync to Supabase!
const originalSetItem = localStorage.setItem;
localStorage.setItem = async function(key, value) {
  // Save locally first for instant UI response
  originalSetItem.apply(this, arguments);

  // Sync to our Supabase app_storage table
  if (window.supabaseClient) {
    try {
      const jsonValue = JSON.parse(value); // Ensure it's valid JSON for jsonb
      await window.supabaseClient.from('app_storage').upsert({
        key: key,
        value: jsonValue,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
    } catch(err) {
      // If it's not JSON (like the theme setting), just store as a string inside a json object
      await window.supabaseClient.from('app_storage').upsert({
        key: key,
        value: { stringValue: value },
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
    }
  }
};

window.syncInitialData = async function() {
  const { data, error } = await window.supabaseClient.from('app_storage').select('*');
  if (data) {
    data.forEach(row => {
      // Only keep local if remote data is missing, otherwise use remote data 
      if (row.value.stringValue !== undefined) {
        originalSetItem.call(localStorage, row.key, row.value.stringValue);
      } else {
        originalSetItem.call(localStorage, row.key, JSON.stringify(row.value));
      }
    });
  }
};
