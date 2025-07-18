-- Simplified course_videos table structure
-- Remove unnecessary columns if they exist
ALTER TABLE course_videos 
DROP COLUMN IF EXISTS category,
DROP COLUMN IF EXISTS level,
DROP COLUMN IF EXISTS duration,
DROP COLUMN IF EXISTS price;

-- Ensure we have the essential columns
ALTER TABLE course_videos 
ADD COLUMN IF NOT EXISTS title TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS youtube_url TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS youtube_id TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS instructor_name VARCHAR(255
ADD COLUMN IF NOT EXISTS instructor_avatar TEXT,
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create simplified courses table if it doesn't exist (alternative approach)
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  youtube_url TEXT NOT NULL,
  youtube_video_id TEXT NOT NULL,
  thumbnail_url TEXT,
  instructor_id UUID REFERENCES auth.users(id),
  instructor_name VARCHAR(255 instructor_avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_enrollments table if it doesn't exist
CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'enrolled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, user_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_videos_user_id ON course_videos(user_id);
CREATE INDEX IF NOT EXISTS idx_course_videos_created_at ON course_videos(created_at);
CREATE INDEX IF NOT EXISTS idx_course_videos_youtube_id ON course_videos(youtube_id);

CREATE INDEX IF NOT EXISTS idx_courses_user_id ON courses(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON courses(created_at);
CREATE INDEX IF NOT EXISTS idx_courses_youtube_video_id ON courses(youtube_video_id);

CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_status ON course_enrollments(status); 