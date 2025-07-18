// Configuration utility for environment variables
// Updated to match your existing components: VideoUpload, YouTubeConnect, VideoPlayer

export const config = {
  // Supabase Configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },

  // YouTube API Configuration
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY!,
    clientId: process.env.YOUTUBE_CLIENT_ID!,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET!,
    redirectUri: process.env.YOUTUBE_REDIRECT_URI!,
  },

  // Google OAuth Configuration
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  },

  // Site Configuration
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  // Video Upload Configuration (for VideoUpload component)
  upload: {
    maxSize: Number.MAX_SAFE_INTEGER, // No size limit
    allowedTypes: process.env.NEXT_PUBLIC_ALLOWED_VIDEO_TYPES?.split(',') || ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
    chunkSize: parseInt(process.env.NEXT_PUBLIC_UPLOAD_CHUNK_SIZE || '5242880'),
    endpoint: process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT || '/api/youtube/upload',
  },

  // Video Processing Configuration
  processing: {
    enabled: process.env.NEXT_PUBLIC_VIDEO_PROCESSING_ENABLED === 'true',
    thumbnailGeneration: process.env.NEXT_PUBLIC_THUMBNAIL_GENERATION_ENABLED === 'true',
    compression: process.env.NEXT_PUBLIC_VIDEO_COMPRESSION_ENABLED === 'true',
  },

  // Storage Configuration
  storage: {
    provider: process.env.NEXT_PUBLIC_STORAGE_PROVIDER || 'supabase',
    bucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'video-uploads',
    supabaseBucket: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'video-uploads',
  },

  // Video Player Configuration (for VideoPlayer component)
  player: {
    provider: process.env.NEXT_PUBLIC_VIDEO_PLAYER_PROVIDER || 'youtube',
    autoplay: process.env.NEXT_PUBLIC_VIDEO_PLAYER_AUTOPLAY === 'true',
    controls: process.env.NEXT_PUBLIC_VIDEO_PLAYER_CONTROLS !== 'false',
    quality: process.env.NEXT_PUBLIC_VIDEO_PLAYER_QUALITY || 'auto',
    width: parseInt(process.env.NEXT_PUBLIC_VIDEO_PLAYER_WIDTH || '560'),
    height: parseInt(process.env.NEXT_PUBLIC_VIDEO_PLAYER_HEIGHT || '315'),
  },

  // YouTube Upload Configuration (for VideoUpload component)
  youtubeUpload: {
    enabled: process.env.NEXT_PUBLIC_YOUTUBE_UPLOAD_ENABLED === 'true',
    autoPublish: process.env.NEXT_PUBLIC_YOUTUBE_AUTO_PUBLISH === 'true',
    privacyStatus: process.env.NEXT_PUBLIC_YOUTUBE_PRIVACY_STATUS || 'private',
    categoryId: process.env.NEXT_PUBLIC_YOUTUBE_CATEGORY_ID || '27',
    tags: process.env.NEXT_PUBLIC_YOUTUBE_TAGS?.split(',') || ['course', 'education', 'learning'],
  },

  // API Rate Limiting
  rateLimit: {
    api: parseInt(process.env.NEXT_PUBLIC_API_RATE_LIMIT || '100'),
    upload: parseInt(process.env.NEXT_PUBLIC_UPLOAD_RATE_LIMIT || '10'),
    youtube: parseInt(process.env.NEXT_PUBLIC_YOUTUBE_API_RATE_LIMIT || '50'),
  },

  // Security Configuration
  security: {
    jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET!,
    encryptionKey: process.env.NEXT_PUBLIC_ENCRYPTION_KEY!,
    csrfSecret: process.env.NEXT_PUBLIC_CSRF_SECRET!,
  },

  // Development Configuration
  development: {
    nodeEnv: process.env.NODE_ENV || 'development',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    debugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'debug',
  },

  // Analytics Configuration
  analytics: {
    enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },

  // CDN Configuration
  cdn: {
    url: process.env.NEXT_PUBLIC_CDN_URL,
    enabled: process.env.NEXT_PUBLIC_CDN_ENABLED === 'true',
  },

  // Email Configuration
  email: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'noreply@yourdomain.com',
  },

  // Webhook Configuration
  webhook: {
    url: process.env.NEXT_PUBLIC_WEBHOOK_URL,
    secret: process.env.NEXT_PUBLIC_WEBHOOK_SECRET,
  },
};

// Validation function to check if required environment variables are set
export function validateConfig() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'YOUTUBE_API_KEY',
    'YOUTUBE_CLIENT_ID',
    'YOUTUBE_CLIENT_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Helper functions for common configuration checks
export const isDevelopment = config.development.nodeEnv === 'development';
export const isProduction = config.development.nodeEnv === 'production';

export const canUploadToYouTube = config.youtubeUpload.enabled && config.youtube.apiKey;
export const canProcessVideos = config.processing.enabled;
export const canGenerateThumbnails = config.processing.thumbnailGeneration;

// File size validation helper (for VideoUpload component)
export function isValidFileSize(size: number): boolean {
  return true; // No size limit
}

// File type validation helper (for VideoUpload component)
export function isValidFileType(type: string): boolean {
  const extension = type.toLowerCase().split('.').pop();
  return config.upload.allowedTypes.includes(extension || '');
}

// Get YouTube embed URL (for VideoPlayer component)
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}

// Get CDN URL for assets
export function getCdnUrl(path: string): string {
  if (config.cdn.enabled && config.cdn.url) {
    return `${config.cdn.url}/${path}`;
  }
  return path;
}

// Get upload endpoint (for VideoUpload component)
export function getUploadEndpoint(): string {
  return config.upload.endpoint;
}

// Get OAuth URL (for YouTubeConnect component)
export function getGoogleAuthUrl(): string {
  return '/api/auth/google/url';
}

// Check if YouTube connection is available (for YouTubeConnect component)
export function canConnectYouTube(): boolean {
  return !!(config.youtube.clientId && config.youtube.clientSecret);
}

// Get video player dimensions (for VideoPlayer component)
export function getVideoPlayerDimensions() {
  return {
    width: config.player.width,
    height: config.player.height,
  };
}

// Get YouTube upload settings (for VideoUpload component)
export function getYouTubeUploadSettings() {
  return {
    privacyStatus: config.youtubeUpload.privacyStatus,
    categoryId: config.youtubeUpload.categoryId,
    tags: config.youtubeUpload.tags,
    autoPublish: config.youtubeUpload.autoPublish,
  };
}

// Database table names (for reference)
export const DB_TABLES = {
  COURSE_VIDEOS: 'course_videos',
  USER_YOUTUBE_TOKENS: 'user_youtube_tokens',
  USERS: 'users',
} as const;

// API endpoints (for reference)
export const API_ENDPOINTS = {
  YOUTUBE_UPLOAD: '/api/youtube/upload',
  GOOGLE_AUTH_URL: '/api/auth/google/url',
  GOOGLE_CALLBACK: '/api/auth/google/callback',
} as const; 