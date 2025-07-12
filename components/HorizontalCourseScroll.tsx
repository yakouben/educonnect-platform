'use client';

import { Play, Users, Star, Clock, ChevronRight, Code, Palette, TrendingUp, Database, Smartphone, Zap } from 'lucide-react';

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
    icon: Code,
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
    icon: Palette,
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
    icon: TrendingUp,
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
    icon: Database,
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
    icon: Smartphone,
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
    icon: Zap,
    bgPattern: 'bg-gradient-to-br',
  },
];

export function HorizontalCourseScroll() {
  return (
    <div className="px-4 sm:px-0">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center space-x-3">
          <span>Your Courses</span>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-4 h-4 text-white" />
          </div>
        </h3>
        <button className="flex items-center space-x-1 text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors touch-manipulation">
          <span>See All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Horizontal Scrolling Container */}
      <div className="relative">
        {/* Scroll Indicator */}
        <div className="absolute top-0 right-0 z-10 bg-gradient-to-l from-white via-white to-transparent w-8 h-full pointer-events-none sm:hidden" />
        
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
            {courses.map((course) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                  className={`relative w-80 sm:w-96 ${course.bgPattern} ${course.color} rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 flex-shrink-0 touch-manipulation`}
                  style={{
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
                  }}
                >
                  {/* 3D Background Pattern */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-20">
                    <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-8 left-6 w-8 h-8 sm:w-12 sm:h-12 bg-white/5 rounded-full blur-lg"></div>
                    <div className="absolute top-1/2 left-1/4 w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full blur-md"></div>
                  </div>

                  {/* Header */}
                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                        {course.category}
                      </span>
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="relative z-10 mb-6">
                    <h4 className="font-bold text-lg sm:text-xl mb-2 leading-tight">{course.title}</h4>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover ring-2 ring-white/30"
                      />
                      <span className="text-white/90 text-sm font-medium">{course.instructor}</span>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-white/80">Progress</span>
                        <span className="font-bold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-white/90 to-white/70 rounded-full transition-all duration-500 shadow-sm"
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
                        <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                        <span>{course.rating}</span>
                      </div>
                      <div className="font-bold text-lg">
                        {course.price}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="relative z-10 w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center space-x-2 border border-white/30 hover:border-white/50 touch-manipulation">
                    <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Play className="w-3 h-3 text-white ml-0.5" />
                    </div>
                    <span>Continue Learning</span>
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}