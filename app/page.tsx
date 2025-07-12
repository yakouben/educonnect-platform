'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MobileNavigation } from '@/components/MobileNavigation';
import { ResponsiveBanner } from '@/components/ResponsiveBanner';
import { HorizontalCourseScroll } from '@/components/HorizontalCourseScroll';
import { MobileSocialFeed } from '@/components/MobileSocialFeed';
import { CoursesPage } from '@/components/CoursesPage';
import { MembersPage } from '@/components/MembersPage';
import { MessagesPage } from '@/components/MessagesPage';
import { RegistrationPage } from '@/components/RegistrationPage';
import { SpacesSection } from '@/components/SpacesSection';
import { ToastContainer, useToast } from '@/components/ui/toast';
import { SkeletonCard } from '@/components/ui/skeleton';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, removeToast, success } = useToast();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      success('Welcome back!', 'Your dashboard is ready.');
    }, 1500);

    return () => clearTimeout(timer);
  }, [success]);

  // Handle section changes with smooth transitions
  const handleSectionChange = (section: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveSection(section);
      setIsLoading(false);
    }, 300);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            <SkeletonCard />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'spaces':
        return (
          <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl backdrop-blur-xl border border-blue-700/30">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-8 left-6 w-24 h-24 bg-white/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 animate-slide-up">Community Spaces 🏠</h1>
                <p className="text-blue-100 text-sm sm:text-base animate-slide-up" style={{ animationDelay: '100ms' }}>Create dedicated spaces for your community members to connect and collaborate</p>
              </div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <SpacesSection />
            </div>
          </div>
        );
      case 'courses':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <CoursesPage />
          </div>
        );
      case 'members':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <MembersPage />
          </div>
        );
      case 'messages':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <MessagesPage />
          </div>
        );
      case 'registration':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <RegistrationPage />
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
            {/* Banner Section */}
            <div className="px-4 sm:px-6 lg:px-8 animate-slide-up">
              <ResponsiveBanner />
            </div>

            {/* Courses Section */}
            <div className="px-0 sm:px-6 lg:px-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <HorizontalCourseScroll />
            </div>

            {/* Social Feed */}
            <div className="px-0 sm:px-6 lg:px-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <MobileSocialFeed />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
      </div>
      
      {/* Mobile Navigation - Hidden on desktop */}
      <div className="lg:hidden">
        <MobileNavigation activeSection={activeSection} setActiveSection={handleSectionChange} />
      </div>
      
      {/* Main Content - Adjusted for sidebar on desktop */}
      <main className="pt-16 sm:pt-20 pb-6 sm:pb-8 lg:ml-64 xl:ml-72 lg:pt-8 lg:pr-8 xl:pr-12 2xl:pr-16 relative z-10">
        <div className="transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Global keyboard shortcuts */}
      {typeof window !== 'undefined' && (
        <div className="hidden">
          {/* Add keyboard shortcut handler here */}
        </div>
      )}
    </div>
  );
}