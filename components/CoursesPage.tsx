'use client';

import { useState } from 'react';
import { Play, Clock, Users, Star, BookOpen, Award, TrendingUp, Filter, Search, Grid, List, Code, Palette, Database, Smartphone, Zap } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';

const courses = [
  {
    id: 1,
    title: 'Advanced React & Next.js Mastery',
    instructor: 'Alex Rivera',
    instructorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    progress: 75,
    duration: '12 weeks',
    students: 2847,
    rating: 4.9,
    price: '$199',
    image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'In Progress',
    color: 'from-purple-500 to-indigo-600',
    category: 'Development',
    level: 'Advanced',
    completedLessons: 18,
    totalLessons: 24,
    nextLesson: 'Server-Side Rendering Deep Dive',
    icon: Code,
  },
  {
    id: 2,
    title: 'UI/UX Design System Fundamentals',
    instructor: 'Maya Patel',
    instructorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    progress: 45,
    duration: '8 weeks',
    students: 1923,
    rating: 4.8,
    price: '$149',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'In Progress',
    color: 'from-pink-500 to-rose-600',
    category: 'Design',
    level: 'Intermediate',
    completedLessons: 12,
    totalLessons: 20,
    nextLesson: 'Color Theory & Psychology',
    icon: Palette,
  },
  {
    id: 3,
    title: 'Digital Marketing & Growth Hacking',
    instructor: 'Jordan Kim',
    instructorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    progress: 90,
    duration: '6 weeks',
    students: 3456,
    rating: 4.9,
    price: '$129',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Almost Complete',
    color: 'from-emerald-500 to-teal-600',
    category: 'Marketing',
    level: 'Beginner',
    completedLessons: 16,
    totalLessons: 18,
    nextLesson: 'Advanced Analytics Setup',
    icon: TrendingUp,
  },
  {
    id: 4,
    title: 'Data Science with Python',
    instructor: 'Sam Chen',
    instructorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    progress: 30,
    duration: '16 weeks',
    students: 1567,
    rating: 4.7,
    price: '$299',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Just Started',
    color: 'from-blue-500 to-cyan-600',
    category: 'Data Science',
    level: 'Advanced',
    completedLessons: 8,
    totalLessons: 32,
    nextLesson: 'Pandas Data Manipulation',
    icon: Database,
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
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
              }`}
            >
                  <Grid className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
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
              {filteredCourses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                    className="group border border-white/20 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-white/40 backdrop-blur-sm bg-white/5 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                        className="w-full h-32 sm:h-48 object-cover transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-80`} />
                      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <Play className="w-4 h-4 sm:w-6 sm:h-6 ml-1" />
                    </button>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {course.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                    <div className="p-4 sm:p-6">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-400/30">
                        {course.category}
                      </span>
                        <span className="px-2 py-1 bg-white/15 text-white/80 text-xs font-medium rounded-full border border-white/20">
                        {course.level}
                      </span>
                    </div>
                    
                      <h3 className="font-bold text-white mb-2 line-clamp-2 text-sm sm:text-base">{course.title}</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                      />
                        <p className="text-white/80 text-xs sm:text-sm">{course.instructor}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-white/80">Progress</span>
                          <span className="font-medium text-white">{course.progress}%</span>
                      </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Course Stats */}
                      <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                          <span>{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      </div>


                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
              {filteredCourses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                    className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 sm:p-6 border border-white/20 rounded-2xl hover:border-white/40 hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/5 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={course.image}
                      alt={course.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-80 rounded-xl`} />
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                        <IconComponent className="w-3 h-3 text-white" />
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
              );
            })}
          </div>
        )}
      </div>
      </GlassCard>
    </div>
  );
}