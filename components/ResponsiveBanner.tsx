'use client';

import { GraduationCap, BookOpen, Clock, Zap, Star, TrendingUp, Award, Target, Calendar } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';
import { useToast } from './ui/toast';

export function ResponsiveBanner() {
  const { success } = useToast();

  const handleContinueLearning = () => {
    success('Let\'s continue!', 'Redirecting to your latest course...');
  };

  const stats = [
    {
      id: 'courses',
      value: '4',
      label: 'Active Courses',
      gradient: 'emerald',
      icon: BookOpen,
      bgIcon: '📚',
      trend: '+2 this week',
      progress: 75,
    },
    {
      id: 'time',
      value: '24h',
      label: 'This Week',
      gradient: 'blue',
      icon: Clock,
      bgIcon: '⏱️',
      trend: '+5h from last week',
      progress: 80,
    },
    {
      id: 'streak',
      value: '7',
      label: 'Day Streak',
      gradient: 'orange',
      icon: Zap,
      bgIcon: '🔥',
      trend: 'Personal best!',
      progress: 100,
    },
    {
      id: 'rating',
      value: '4.8',
      label: 'Avg Rating',
      gradient: 'purple',
      icon: Star,
      bgIcon: '⭐',
      trend: '+0.2 improvement',
      progress: 96,
    },
  ];

  const gradientClasses = {
    emerald: 'from-emerald-500 to-teal-600',
    blue: 'from-blue-500 to-cyan-600',
    orange: 'from-orange-500 to-red-600',
    purple: 'from-purple-500 to-indigo-600',
  };

  return (
    <div className="relative w-full">
      {/* Main Banner */}
      <GlassCard 
        gradient="blue"
        className="relative rounded-none sm:rounded-2xl overflow-hidden border-0 sm:border"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-8 left-6 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 px-4 sm:px-8 py-8 sm:py-12 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-blue-900/90">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-300" />
                <p className="text-blue-200 text-sm sm:text-base animate-slide-up">
                  September 4, 2023
                </p>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white leading-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
                Welcome back, John! 👋
              </h1>
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-md animate-slide-up" style={{ animationDelay: '200ms' }}>
                Continue your learning journey and connect with the community
              </p>
              
              {/* Mobile CTA */}
              <div className="mt-6 lg:hidden animate-slide-up" style={{ animationDelay: '300ms' }}>
                <EnhancedButton
                  onClick={handleContinueLearning}
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<Star className="w-4 h-4" />}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl"
                >
                  Continue Learning
                </EnhancedButton>
              </div>
            </div>
            
            {/* Desktop Illustration */}
            <div className="hidden lg:block animate-bounce-in" style={{ animationDelay: '400ms' }}>
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-glow">
                  <GraduationCap className="w-16 h-16 text-white" />
                </div>
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce-in" style={{ animationDelay: '600ms' }}>
                  <Award className="w-4 h-4 text-yellow-800" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-bounce-in" style={{ animationDelay: '700ms' }}>
                  <Target className="w-4 h-4 text-green-800" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Floating Elements */}
        <div className="absolute top-4 right-4 lg:hidden">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-float">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
      </GlassCard>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 sm:mt-6 px-4 sm:px-0">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <GlassCard
              key={stat.id}
              gradient={stat.gradient as any}
              className={`p-3 sm:p-6 text-white animate-scale-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[stat.gradient as keyof typeof gradientClasses]} opacity-90 rounded-2xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm animate-float">
                      <div className="text-lg sm:text-2xl">{stat.bgIcon}</div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-end space-x-1">
                      <h3 className="text-lg sm:text-2xl font-bold">{stat.value}</h3>
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 animate-bounce" />
                    </div>
                    <p className="text-white/90 text-xs sm:text-base font-medium">{stat.label}</p>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5 overflow-hidden">
                      <div 
                        className="bg-white h-full rounded-full transition-all duration-1000 ease-out animate-shimmer"
                        style={{ 
                          width: `${stat.progress}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      />
                    </div>
                    
                    {/* Trend */}
                    <p className="text-white/70 text-xs hidden sm:block">{stat.trend}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Desktop CTA Button */}
      <div className="hidden lg:block mt-6 px-4 sm:px-0">
        <EnhancedButton
          onClick={handleContinueLearning}
          variant="primary"
          size="lg"
          icon={<Star className="w-4 h-4" />}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl animate-bounce-in"
          style={{ animationDelay: '800ms' }}
        >
          Continue Learning Journey
        </EnhancedButton>
      </div>
    </div>
  );
}