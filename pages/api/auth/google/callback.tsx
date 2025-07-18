// pages/api/auth/google/callback.js
import { getTokens } from '../../../../lib/googleAuth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    // Get tokens from Google
    const tokens = await getTokens(code);
    
    // Get user ID from state or session
    const userId = state; // You'll need to pass user ID in state
    
    // Store tokens in Supabase
    const { error } = await supabase
      .from('user_youtube_tokens')
      .upsert({
        user_id: userId,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(tokens.expiry_date).toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error storing tokens:', error);
      return res.status(500).json({ error: 'Failed to store tokens' });
    }

    // Redirect back to your app
    res.redirect('/dashboard?youtube_connected=true');
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}