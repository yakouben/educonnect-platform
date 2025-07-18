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
import { AuthModal } from '@/components/AuthModal';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Removed automatic success toast that was causing duplicates
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'home':
        return (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Test Auth Button */}
            <div className="text-center">
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg"
              >
                Test Authentication
              </button>
            </div>
            
            <ResponsiveBanner />
            <HorizontalCourseScroll />
            <MobileSocialFeed />
          </div>
        );
      case 'spaces':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <SpacesSection />
          </div>
        );
      case 'courses':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <CoursesPage />
          </div>
        );
      case 'members':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <MembersPage />
          </div>
        );
      case 'messages':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <MessagesPage />
          </div>
        );
      case 'registration':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <RegistrationPage />
          </div>
        );
      default:
        return (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <ResponsiveBanner />
            <HorizontalCourseScroll />
            <MobileSocialFeed />
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
      
      {/* Main Content - Fixed height with scrolling */}
      <main className="lg:ml-64 h-screen">
        <div className="h-full overflow-y-auto overflow-x-hidden main-content-scroll pt-16 sm:pt-20 pb-6 sm:pb-8 lg:pt-8 lg:pr-8 xl:pr-12 2xl:pr-16 relative z-10">
        <div className="transition-all duration-300 ease-in-out">
          {renderContent()}
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}