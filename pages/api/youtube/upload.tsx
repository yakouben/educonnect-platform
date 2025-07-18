// pages/api/youtube/upload.js
import { createYouTubeClient } from '../../../lib/googleAuth';
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: '/tmp',
      keepExtensions: true,
      maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB limit
    });

    const [fields, files] = await form.parse(req);
    const { userId, title, description } = fields;
    const videoFile = files.video?.[0];

    if (!videoFile) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    // Get user's YouTube tokens from Supabase
    const { data: tokenData, error: tokenError } = await supabase
      .from('user_youtube_tokens')
      .select('*')
      .eq('user_id', userId[0])
      .single();

    if (tokenError || !tokenData) {
      return res.status(401).json({ error: 'YouTube not connected' });
    }

    // Create YouTube client
    const youtube = createYouTubeClient({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
    });

    // Upload video to YouTube
    const response = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: title[0],
          description: description[0],
          tags: ['education', 'course'],
          categoryId: '27', // Education category
        },
        status: {
          privacyStatus: 'unlisted', // Start as unlisted
        },
      },
      media: {
        body: fs.createReadStream(videoFile.filepath),
      },
    });

    // Clean up temporary file
    fs.unlinkSync(videoFile.filepath);

    // Store video info in Supabase
    const { error: dbError } = await supabase
      .from('course_videos')
      .insert({
        user_id: userId[0],
        youtube_id: response.data.id,
        title: title[0],
        description: description[0],
        youtube_url: `https://www.youtube.com/watch?v=${response.data.id}`,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    res.status(200).json({
      success: true,
      videoId: response.data.id,
      videoUrl: `https://www.youtube.com/watch?v=${response.data.id}`,
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
}