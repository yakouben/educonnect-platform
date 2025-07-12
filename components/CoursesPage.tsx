'use client';

import { useState } from 'react';
import { Play, Clock, Users, Star, BookOpen, Award, TrendingUp, Filter, Search, Grid, List, Code, Palette, Database, Smartphone, Zap, ChevronRight, Calendar, PlayCircle, Video } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';

const courses = [
  {
    id: 1,
    title: 'Complete React & Next.js Course 2024',
    instructor: 'Yakoub Bensalah',
    instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    videoThumbnail: 'https://img.youtube.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    progress: 75,
    duration: '42.5 hours',
    students: 15847,
    rating: 4.9,
    price: '$89.99',
    category: 'Development',
    level: 'All Levels',
    completedLessons: 89,
    totalLessons: 120,
    nextLesson: 'Server Components & SSR',
    lastWatched: '2 days ago',
    chapters: 12,
    description: 'Master modern React development with Next.js 14, TypeScript, and advanced patterns.',
    icon: Code,
  },
  {
    id: 2,
    title: 'Advanced UI/UX Design Masterclass',
    instructor: 'Yakoub Bensalah',
    instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    videoThumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg',
    progress: 45,
    duration: '28.3 hours',
    students: 8934,
    rating: 4.8,
    price: '$129.99',
    category: 'Design',
    level: 'Intermediate',
    completedLessons: 34,
    totalLessons: 76,
    nextLesson: 'Advanced Prototyping in Figma',
    lastWatched: '1 day ago',
    chapters: 8,
    description: 'Create stunning user interfaces and experiences with design systems and modern tools.',
    icon: Palette,
  },
  {
    id: 3,
    title: 'Python for Data Science & AI',
    instructor: 'Yakoub Bensalah',
    instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    videoThumbnail: 'https://img.youtube.com/vi/LHBE6Q9XlzI/maxresdefault.jpg',
    progress: 90,
    duration: '56.7 hours',
    students: 12456,
    rating: 4.9,
    price: '$149.99',
    category: 'Data Science',
    level: 'Beginner',
    completedLessons: 124,
    totalLessons: 138,
    nextLesson: 'Neural Networks with TensorFlow',
    lastWatched: '3 hours ago',
    chapters: 15,
    description: 'Complete Python bootcamp covering data analysis, machine learning, and AI.',
    icon: Database,
  },
  {
    id: 4,
    title: 'Digital Marketing Mastery 2024',
    instructor: 'Yakoub Bensalah',
    instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    videoThumbnail: 'https://img.youtube.com/vi/nU-IIXBWlS4/maxresdefault.jpg',
    progress: 30,
    duration: '38.2 hours',
    students: 9876,
    rating: 4.7,
    price: '$94.99',
    category: 'Marketing',
    level: 'All Levels',
    completedLessons: 23,
    totalLessons: 78,
    nextLesson: 'Google Ads Campaign Setup',
    lastWatched: '1 week ago',
    chapters: 10,
    description: 'Complete digital marketing course covering SEO, social media, and paid advertising.',
    icon: TrendingUp,
  },
  {
    id: 5,
    title: 'Mobile App Development with Flutter',
    instructor: 'Yakoub Bensalah',
    instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    videoThumbnail: 'https://img.youtube.com/vi/VPvVD8t02U8/maxresdefault.jpg',
    progress: 60,
    duration: '44.8 hours',
    students: 6543,
    rating: 4.8,
    price: '$119.99',
    category: 'Development',
    level: 'Intermediate',
    completedLessons: 67,
    totalLessons: 112,
    nextLesson: 'State Management with Bloc',
    lastWatched: '5 days ago',
    chapters: 11,
    description: 'Build beautiful, native mobile apps for iOS and Android with Flutter and Dart.',
    icon: Smartphone,
  },
  {
    id: 6,
    title: 'Blockchain & Web3 Development',
    instructor: 'Yakoub Bensalah',
    instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    videoThumbnail: 'https://img.youtube.com/vi/gyMwXuJrbJQ/maxresdefault.jpg',
    progress: 25,
    duration: '52.3 hours',
    students: 4321,
    rating: 4.6,
    price: '$199.99',
    category: 'Development',
    level: 'Advanced',
    completedLessons: 31,
    totalLessons: 98,
    nextLesson: 'Smart Contract Development',
    lastWatched: '2 weeks ago',
    chapters: 13,
    description: 'Master blockchain development with Ethereum, Solidity, and decentralized applications.',
    icon: Zap,
  },
];

const categories = ['All', 'Development', 'Design', 'Marketing', 'Data Science', 'Business'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export function CoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

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
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === 'grid' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
                  }`}
                >
                  <Grid className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === 'list' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
                  }`}
                >
                  <List className="w-4 h-4 text-white" />
                </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
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
            <div className="flex space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white text-sm sm:text-base"
              >
                <option value="All">All Categories</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Science">Data Science</option>
                <option value="Business">Business</option>
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white text-sm sm:text-base"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
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
        {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCourses.map((course, index) => (
                <GlassCard
                  key={course.id}
                  className={`relative flex-shrink-0 overflow-hidden animate-scale-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={course.videoThumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-200">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </button>
                    </div>
                    
                    {/* Video Duration */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded-md text-xs font-medium">
                      {course.duration}
                      </div>
                    
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                        {course.category}
                      </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {course.level}
                      </span>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="font-bold text-xl mb-4 text-white leading-tight line-clamp-2 drop-shadow-lg">
                      {course.title}
                    </h4>
                    
                    {/* Instructor */}
                    <div className="flex items-center space-x-3 mb-6">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
                      />
                      <span className="text-sm text-white/90 font-medium">{course.instructor}</span>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-white/80 font-medium">Your Progress</span>
                        <span className="font-bold text-white text-lg">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                        <div
                          className="bg-gradient-to-r from-white to-white/80 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-white/70 mt-2 font-medium">
                        {course.completedLessons} of {course.totalLessons} lessons completed
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {course.progress > 0 && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold border border-green-400/30">
                            Enrolled
                          </span>
                        )}
                      </div>
                      <EnhancedButton
                        variant="primary"
                        size="md"
                        icon={<PlayCircle className="w-4 h-4" />}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border border-blue-400/30 hover:border-blue-300/50 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 animate-pulse-slow"
                      >
                        {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
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
                  {/* Video Thumbnail */}
                  <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden">
                    <img
                        src={course.videoThumbnail}
                      alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-2 mb-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-400/30">
                        {course.category}
                      </span>
                      <span className="px-2 py-1 bg-white/15 text-white/80 text-xs font-medium rounded-full border border-white/20">
                        {course.level}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-white mb-1 text-sm sm:text-base">{course.title}</h3>
                    <p className="text-white/80 text-xs sm:text-sm mb-2">{course.instructor}</p>
                    
                    <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-4 text-xs text-white/60">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <div className="text-center sm:text-right">
                      <div className="text-xs text-white/60 mb-1">Progress</div>
                      <div className="font-bold text-white">{course.progress}%</div>
                    </div>
                    <EnhancedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                    >
                      Continue
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