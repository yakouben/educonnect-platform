// components/YouTubeConnect.tsx
import { useState, useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../lib/supabaseClient';

export default function YouTubeConnect(): JSX.Element {
  const user = useUser();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkYouTubeConnection();
  }, [user]);

  const checkYouTubeConnection = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_youtube_tokens')
        .select('id')
        .eq('user_id', user.id)
        .single();

      setIsConnected(!!data);
    } catch (error) {
      console.error('Error checking connection:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectYouTube = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/auth/google/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error connecting to YouTube:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">YouTube Integration</h3>
      
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-green-600">Connected to YouTube</span>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-3">
            Connect your YouTube account to upload and manage course videos.
          </p>
          <button
            onClick={connectYouTube}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Connect YouTube
          </button>
        </div>
      )}
    </div>
  );
}