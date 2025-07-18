'use client';

import { useState, useEffect } from 'react';
import { Play, BookOpen, Search, Grid, List, PlayCircle, Plus, AlertCircle } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';
import { supabase } from '@/lib/supabase';

interface Course {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  youtube_id: string;
  thumbnail_url: string;
  created_at: string;
  user_id: string;
}

export function CoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from database
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to view courses.');
        setLoading(false);
        return;
      }
      const { data: coursesData, error: coursesError } = await supabase
        .from('course_videos')
        .select('*')
        .order('created_at', { ascending: false });
      if (coursesError) {
        throw coursesError;
      }
      setCourses(coursesData || []);
    } catch (err) {
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const q = searchQuery.toLowerCase();
    return course.title.toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchCourses}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <GlassCard gradient="blue" className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <h1 className="text-lg sm:text-xl font-bold text-white">My Courses</h1>
              <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm animate-glow">
              <BookOpen className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <EnhancedButton
                variant="primary"
                size="md"
                icon={<Plus className="w-4 h-4" />}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border border-blue-400/30 hover:border-blue-300/50 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => {
                  // TODO: Add new course functionality
                  console.log('New course button clicked');
                }}
              >
                New Course
              </EnhancedButton>
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}`}
                >
                  <Grid className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}`}
                >
                  <List className="w-4 h-4 text-white" />
                </button>
          </div>
        </div>
      </div>
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
                placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60 text-sm sm:text-base"
            />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Courses Grid */}
      <GlassCard gradient="blue" className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Your Courses</h2>
            <span className="text-xs sm:text-sm text-white/70">{filteredCourses.length} courses found</span>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No courses yet</h3>
              <p className="text-white/60 mb-6">Add your first course!</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCourses.map((course, index) => (
                <GlassCard
                  key={course.id}
                  className="relative flex-shrink-0 overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={course.thumbnail_url || `https://img.youtube.com/vi/${course.youtube_id}/maxresdefault.jpg`}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-200">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </button>
                    </div>
                  </div>
                  {/* Course Content */}
                  <div className="p-4 sm:p-6">
                    <h4 className="font-bold text-xl mb-4 text-white leading-tight line-clamp-2 drop-shadow-lg">
                      {course.title}
                    </h4>
                    {course.description && (
                      <p className="text-sm text-white/70 mb-4">
                        {course.description}
                      </p>
                    )}
                    <div className="flex items-center justify-end">
                      <EnhancedButton
                        variant="primary"
                        size="md"
                        icon={<PlayCircle className="w-4 h-4" />}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border border-blue-400/30 hover:border-blue-300/50 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 animate-pulse-slow"
                        onClick={() => window.open(course.youtube_url, '_blank')}
                      >
                        Watch Course
                      </EnhancedButton>
                    </div>
                  </div>
                </GlassCard>
              ))}
          </div>
        ) : (
          <div className="space-y-4">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 sm:p-6 border border-white/20 rounded-2xl hover:border-white/40 hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/5 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden">
                    <img
                        src={course.thumbnail_url || `https://img.youtube.com/vi/${course.youtube_id}/maxresdefault.jpg`}
                      alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-bold text-white mb-1 text-sm sm:text-base">{course.title}</h3>
                    {course.description && (
                      <p className="text-white/60 text-xs sm:text-sm mb-2">
                        {course.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <EnhancedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                      onClick={() => window.open(course.youtube_url, '_blank')}
                    >
                      Watch
                    </EnhancedButton>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      </GlassCard>
    </div>
  );
}