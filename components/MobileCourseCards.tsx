'use client';

import { ChevronRight, Play, Users, Star, Clock, BookOpen } from 'lucide-react';

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
    category: 'Development',
    level: 'Advanced',
    completedLessons: 18,
    totalLessons: 24,
    nextLesson: 'Server-Side Rendering Deep Dive',
    color: 'from-purple-500 via-purple-600 to-indigo-700',
    emoji: '⚛️',
    icon: '🚀',
    bgPattern: 'bg-gradient-to-br',
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
    category: 'Design',
    level: 'Intermediate',
    completedLessons: 12,
    totalLessons: 20,
    nextLesson: 'Color Theory & Psychology',
    color: 'from-pink-500 via-rose-500 to-red-600',
    emoji: '🎨',
    icon: '✨',
    bgPattern: 'bg-gradient-to-br',
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
    category: 'Marketing',
    level: 'Beginner',
    completedLessons: 16,
    totalLessons: 18,
    nextLesson: 'Advanced Analytics Setup',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    emoji: '📈',
    icon: '💎',
    bgPattern: 'bg-gradient-to-br',
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
    category: 'Data Science',
    level: 'Advanced',
    completedLessons: 8,
    totalLessons: 32,
    nextLesson: 'Pandas Data Manipulation',
    color: 'from-blue-500 via-indigo-500 to-purple-600',
    emoji: '📊',
    icon: '🔬',
    bgPattern: 'bg-gradient-to-br',
  },
  {
    id: 5,
    title: 'Mobile App Development',
    instructor: 'Lisa Wang',
    instructorAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    progress: 60,
    duration: '10 weeks',
    students: 2134,
    rating: 4.8,
    price: '$179',
    category: 'Development',
    level: 'Intermediate',
    completedLessons: 15,
    totalLessons: 25,
    nextLesson: 'React Native Navigation',
    color: 'from-orange-500 via-amber-500 to-yellow-600',
    emoji: '📱',
    icon: '⚡',
    bgPattern: 'bg-gradient-to-br',
  },
  {
    id: 6,
    title: 'Blockchain & Web3 Development',
    instructor: 'Alex Thompson',
    instructorAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    progress: 25,
    duration: '14 weeks',
    students: 987,
    rating: 4.6,
    price: '$349',
    category: 'Development',
    level: 'Advanced',
    completedLessons: 6,
    totalLessons: 28,
    nextLesson: 'Smart Contract Basics',
    color: 'from-violet-500 via-purple-500 to-fuchsia-600',
    emoji: '⛓️',
    icon: '🌟',
    bgPattern: 'bg-gradient-to-br',
  },
];

export function MobileCourseCards() {
  return (
    <div className="px-4 space-y-6 md:hidden">
      {/* Your Courses - Horizontal Scroll */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <span>Your Courses</span>
            <span className="text-xl">📚</span>
          </h3>
          <button className="flex items-center space-x-1 text-blue-600 text-sm font-medium">
            <span>See All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Horizontal Scrolling Container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
            {courses.map((course) => (
              <div
                key={course.id}
                className={`relative w-80 ${course.bgPattern} ${course.color} rounded-3xl p-6 text-white shadow-xl transform transition-all duration-300 flex-shrink-0`}
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
                }}
              >
                {/* 3D Background Pattern */}
                <div className="absolute inset-0 rounded-3xl opacity-20">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-8 left-6 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>
                  <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/10 rounded-full blur-md"></div>
                </div>

                {/* Header */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl drop-shadow-lg">{course.emoji}</span>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-xl">{course.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="relative z-10 mb-6">
                  <h4 className="font-bold text-xl mb-2 leading-tight">{course.title}</h4>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-white/30"
                    />
                    <span className="text-white/90 text-sm font-medium">{course.instructor}</span>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-white/80">Progress</span>
                      <span className="font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-white/80 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/70 mt-2">
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Next Lesson */}
                  <div className="mb-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <p className="text-xs text-white/70 mb-1">Next lesson:</p>
                    <p className="text-sm font-medium">{course.nextLesson}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-white/80 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="font-bold text-lg">
                      {course.price}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="relative z-10 w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center space-x-2 border border-white/30 hover:border-white/50">
                  <Play className="w-4 h-4" />
                  <span>Continue Learning</span>
                  <span className="text-lg">✨</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-2xl">📖</span>
          </div>
          <h4 className="text-xl font-bold mb-1">{courses.length}</h4>
          <p className="text-blue-100 text-sm">Active Courses</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-2xl">⏱️</span>
          </div>
          <h4 className="text-xl font-bold mb-1">24h</h4>
          <p className="text-emerald-100 text-sm">This Week</p>
        </div>
      </div>

      {/* Learning Streak */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Learning Streak 🔥</h3>
              <p className="text-orange-100 text-sm">Keep up the great work!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">7</div>
              <div className="text-orange-200 text-xs">days</div>
            </div>
          </div>
          <div className="flex space-x-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  i < 7 ? 'bg-white/30 text-white' : 'bg-white/10 text-white/50'
                }`}
              >
                🔥
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}