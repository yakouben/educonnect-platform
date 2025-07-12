'use client';

import { useState } from 'react';
import { Play, Clock, Users, Star, BookOpen, Award, TrendingUp, Filter, Search, Grid, List, Code, Palette, Database, Smartphone, Zap } from 'lucide-react';

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
    <div className="space-y-6 p-4 md:p-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <span>My Learning Journey</span>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
          </h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Continue your courses and discover new skills</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm md:text-base"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm md:text-base"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">4</h3>
          <p className="text-purple-100 text-sm md:text-base">Active Courses</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">12</h3>
          <p className="text-emerald-100 text-sm md:text-base">Completed Courses</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-4 md:p-6 text-white sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">87%</h3>
          <p className="text-orange-100 text-sm md:text-base">Average Progress</p>
        </div>
      </div>

      {/* Courses Grid/List */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Your Courses</h2>
          <span className="text-xs md:text-sm text-gray-500">{filteredCourses.length} courses found</span>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredCourses.map((course) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                  className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-purple-300"
                >
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-80`} />
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <Play className="w-4 h-4 md:w-6 md:h-6 ml-1" />
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

                  <div className="p-4 md:p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        {course.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {course.level}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">{course.title}</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
                      />
                      <p className="text-gray-600 text-xs md:text-sm">{course.instructor}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Next Lesson */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Next lesson:</p>
                      <p className="text-xs md:text-sm font-medium text-gray-900">{course.nextLesson}</p>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="font-medium text-purple-600">
                        {course.price}
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 md:py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all text-xs md:text-sm font-medium shadow-sm hover:shadow-md flex items-center justify-center space-x-2">
                      <span>Continue Learning</span>
                      <Star className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                  className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-6 border border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-80 rounded-xl`} />
                    <div className="absolute top-1 right-1 md:top-2 md:right-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-2 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        {course.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {course.level}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{course.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm mb-2">{course.instructor}</p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-4 text-xs text-gray-500">
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

                  <div className="flex-shrink-0 w-full md:w-48">
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs md:text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 text-center md:text-left">{course.completedLessons}/{course.totalLessons} lessons completed</p>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all text-xs md:text-sm font-medium">
                      Continue
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}