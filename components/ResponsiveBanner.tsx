'use client';

import { GraduationCap, BookOpen, Clock, Zap, Star } from 'lucide-react';

export function ResponsiveBanner() {
  return (
    <div className="relative w-full">
      {/* Main Banner */}
      <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-none sm:rounded-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-8 left-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <p className="text-purple-200 mb-2 text-sm sm:text-base">September 4, 2023</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white leading-tight">
                Welcome back, John!
              </h1>
              <p className="text-purple-100 text-sm sm:text-base lg:text-lg max-w-md">
                Continue your learning journey and connect with the community
              </p>
              
              {/* Mobile CTA */}
              <div className="mt-6 lg:hidden">
                <button className="w-full sm:w-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center space-x-2 border border-white/30 hover:border-white/50 touch-manipulation">
                  <span>Continue Learning</span>
                  <Star className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Desktop Illustration */}
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Floating Elements */}
        <div className="absolute top-4 right-4 lg:hidden">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Stats - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 sm:mt-6 px-4 sm:px-0">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>
          <h3 className="text-lg sm:text-2xl font-bold mb-1">4</h3>
          <p className="text-emerald-100 text-xs sm:text-base">Active Courses</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>
          <h3 className="text-lg sm:text-2xl font-bold mb-1">24h</h3>
          <p className="text-blue-100 text-xs sm:text-base">This Week</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>
          <h3 className="text-lg sm:text-2xl font-bold mb-1">7</h3>
          <p className="text-orange-100 text-xs sm:text-base">Day Streak</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>
          <h3 className="text-lg sm:text-2xl font-bold mb-1">4.8</h3>
          <p className="text-purple-100 text-xs sm:text-base">Avg Rating</p>
        </div>
      </div>
    </div>
  );
}