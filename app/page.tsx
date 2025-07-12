'use client';

import { useState } from 'react';
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

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'spaces':
        return (
          <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
              <div className="relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Community Spaces 🏠</h1>
                <p className="text-blue-100 text-sm sm:text-base">Create dedicated spaces for your community members to connect and collaborate</p>
              </div>
            </div>
            <SpacesSection />
          </div>
        );
      case 'courses':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CoursesPage />
          </div>
        );
      case 'members':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MembersPage />
          </div>
        );
      case 'messages':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MessagesPage />
          </div>
        );
      case 'registration':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RegistrationPage />
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            {/* Banner Section */}
            <div className="px-4 sm:px-6 lg:px-8">
              <ResponsiveBanner />
            </div>

            {/* Courses Section */}
            <div className="px-0 sm:px-6 lg:px-8">
              <HorizontalCourseScroll />
            </div>

            {/* Social Feed */}
            <div className="px-0 sm:px-6 lg:px-8">
              <MobileSocialFeed />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
      
      {/* Mobile Navigation - Hidden on desktop */}
      <div className="lg:hidden">
        <MobileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
      
      {/* Main Content - Adjusted for sidebar on desktop */}
      <main className="pt-16 sm:pt-20 pb-6 sm:pb-8 lg:ml-64 xl:ml-72 lg:pt-8 lg:pr-8 xl:pr-12 2xl:pr-16">
        {renderContent()}
      </main>
    </div>
  );
}