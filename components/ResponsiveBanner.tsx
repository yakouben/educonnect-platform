'use client';

import { GraduationCap, Calendar, Star, Award, Target } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';
import { useToast } from './ui/toast';

export function ResponsiveBanner() {
  const { success } = useToast();

  const handleContinueLearning = () => {
    success('Lets continue!', 'Redirecting to your latest course...');
  };

  return (
    <div className="relative w-full">
      {/* Clean, Simple Banner Design */}
      <GlassCard 
        gradient="blue"
        className="relative rounded-2xl my-4 overflow-hidden border-2 border-blue-600/30 shadow-2xl"
      >
        {/* Minimal Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-6 left-4 w-24 h-24 bg-blue-200/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-12 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-blue-900/90 border border-blue-600/20 rounded-xl">
          <div className="flex flex-col">
            <div className="mb-0">
              {/* Date with consistent styling */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                  <Calendar className="w-4 h-4 text-blue-300" />
                </div>
                <p className="text-blue-200 text-sm sm:text-base font-medium animate-slide-up">
                  September 4, 2023
                </p>
              </div>
              
              {/* Welcome Message - Consistent across all screen sizes */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white leading-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
                Welcome back, Yakoub! 👋
              </h1>
              <p className="text-blue-100 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
                Continue your learning journey and connect with the community
              </p>
            </div>
          </div>
        </div>

        {/* Simple Mobile Corner Element */}
        <div className="absolute top-6 right-6 lg:hidden">
          <div className="w-16 h-16 bg-blue-400/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-float border-2 border-blue-300/30 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
