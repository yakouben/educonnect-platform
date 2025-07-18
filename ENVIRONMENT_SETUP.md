# Environment Setup Guide

This guide will help you set up all the necessary environment variables and APIs for your video upload, YouTube integration, and video player functionality.

## 📋 Prerequisites

1. **Supabase Account** - For database and storage
2. **Google Cloud Console Account** - For YouTube API and OAuth
3. **YouTube API Access** - For video uploads and management

## 🔧 Step-by-Step Setup

### 1. Create Environment File

Copy the `env-template.txt` file to `.env.local`:

```bash
cp env-template.txt .env.local
```

### 2. Supabase Configuration

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - YouTube Data API v3
   - YouTube Analytics API
   - Google Drive API (optional, for file storage)

### 4. YouTube API Configuration

1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the API key to `YOUTUBE_API_KEY`
4. Restrict the API key to YouTube Data API v3

### 5. Google OAuth Setup

1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
5. Copy the Client ID and Client Secret to your `.env.local`

### 6. YouTube API Quotas

YouTube API has daily quotas. For development:
- **Queries per day**: 10,000 (usually sufficient)
- **Uploads per day**: 100 (usually sufficient)

For production, you may need to request quota increases.

## 🔑 Required Environment Variables

### Essential (Must Have)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

### Optional (Recommended)
```env
# Video Upload Settings
NEXT_PUBLIC_MAX_VIDEO_SIZE=100
NEXT_PUBLIC_ALLOWED_VIDEO_TYPES=mp4,avi,mov,wmv,flv,webm
NEXT_PUBLIC_UPLOAD_CHUNK_SIZE=5242880

# Video Processing
NEXT_PUBLIC_VIDEO_PROCESSING_ENABLED=true
NEXT_PUBLIC_THUMBNAIL_GENERATION_ENABLED=true
NEXT_PUBLIC_VIDEO_COMPRESSION_ENABLED=true

# YouTube Upload Settings
NEXT_PUBLIC_YOUTUBE_UPLOAD_ENABLED=true
NEXT_PUBLIC_YOUTUBE_AUTO_PUBLISH=false
NEXT_PUBLIC_YOUTUBE_PRIVACY_STATUS=private
NEXT_PUBLIC_YOUTUBE_CATEGORY_ID=27

# Development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG_MODE=true
```

## 🚀 Usage in Components

### Using the Config Utility

```typescript
import { config, canUploadToYouTube, isValidFileSize } from '@/lib/config';

// Check if YouTube upload is enabled
if (canUploadToYouTube) {
  // Upload to YouTube
}

// Validate file size
if (isValidFileSize(file.size)) {
  // Process file
}

// Access YouTube API key
const apiKey = config.youtube.apiKey;
```

### Environment Variable Validation

Add this to your app initialization:

```typescript
import { validateConfig } from '@/lib/config';

// In your app startup
try {
  validateConfig();
  console.log('✅ Environment variables validated');
} catch (error) {
  console.error('❌ Environment validation failed:', error.message);
}
```

## 🔒 Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Use different API keys for development and production**
3. **Restrict API keys to specific domains/IPs**
4. **Rotate secrets regularly**
5. **Use environment-specific configurations**

## 🧪 Testing Your Setup

1. **Test Supabase Connection**:
   ```typescript
   import { supabase } from '@/lib/supabase';
   
   const { data, error } = await supabase.from('course_videos').select('*');
   console.log('Supabase connection:', error ? '❌' : '✅');
   ```

2. **Test YouTube API**:
   ```typescript
   const response = await fetch(
     `https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&key=${config.youtube.apiKey}`
   );
   console.log('YouTube API:', response.ok ? '✅' : '❌');
   ```

3. **Test OAuth Flow**:
   - Navigate to your app
   - Try to authenticate with Google
   - Check if redirect works properly

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API Key"**
   - Check if YouTube API is enabled
   - Verify API key restrictions
   - Ensure API key is correct

2. **"Redirect URI Mismatch"**
   - Check OAuth client configuration
   - Verify redirect URIs match exactly
   - Include both HTTP and HTTPS versions

3. **"Quota Exceeded"**
   - Check YouTube API quotas
   - Implement rate limiting
   - Request quota increase if needed

4. **"CORS Errors"**
   - Add your domain to authorized origins
   - Check Supabase CORS settings
   - Verify redirect URIs

### Debug Mode

Enable debug mode to see detailed logs:

```env
NEXT_PUBLIC_DEBUG_MODE=true
```

## 📚 Additional Resources

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 🔄 Production Deployment

For production, update these variables:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
YOUTUBE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
NEXT_PUBLIC_DEBUG_MODE=false
```

Remember to:
- Use production API keys
- Set up proper CORS origins
- Configure production redirect URIs
- Set up monitoring and logging 