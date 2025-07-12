'use client';

import { useState } from 'react';
import { Menu, X, Home, BookOpen, Users, MessageSquare, Hash, Calendar, CreditCard, UserPlus, Trophy, Clock, Bell, Settings, LogOut, GraduationCap, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'spaces', label: 'Spaces', icon: Hash },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

const learningItems = [
  { id: 'payment', label: 'Payment Info', icon: CreditCard },
  { id: 'registration', label: 'Registration', icon: UserPlus },
  { id: 'results', label: 'Results', icon: Trophy },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'notices', label: 'Notices', icon: Bell },
];

export function MobileNavigation({ activeSection, setActiveSection }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Hamburger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">EduConnect</h1>
              </div>
            </div>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors touch-manipulation">
              <div className="w-5 h-5 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                <Bell className="w-3 h-3 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                3
              </span>
            </button>
            
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Navigation Panel */}
      <div className={cn(
        "fixed inset-0 z-50 transition-all duration-300 ease-in-out",
        isOpen ? "visible" : "invisible"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-black transition-opacity duration-300",
            isOpen ? "opacity-50" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Navigation Panel */}
        <div className={cn(
          "absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white transform transition-transform duration-300 ease-in-out shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Header */}
          <div className="p-6 border-b border-blue-700/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">EduConnect</h2>
                  <p className="text-blue-200 text-sm">Learning Platform</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors touch-manipulation"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <h3 className="text-blue-200 text-sm font-medium mb-4 uppercase tracking-wider">Main</h3>
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleItemClick(item.id)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group touch-manipulation",
                          activeSection === item.id
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                            : "hover:bg-blue-800/50 text-blue-100 hover:text-white hover:transform hover:scale-105"
                        )}
                        style={{ minHeight: '44px' }}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shadow-sm",
                          activeSection === item.id
                            ? "bg-gradient-to-br from-blue-300 to-blue-400"
                            : "bg-white/10"
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                        {activeSection === item.id && (
                          <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full"></div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Learning Section */}
            <div>
              <h3 className="text-blue-200 text-sm font-medium mb-4 uppercase tracking-wider">Learning</h3>
              <ul className="space-y-2">
                {learningItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleItemClick(item.id)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group touch-manipulation",
                          activeSection === item.id
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                            : "hover:bg-blue-800/50 text-blue-100 hover:text-white hover:transform hover:scale-105"
                        )}
                        style={{ minHeight: '44px' }}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shadow-sm",
                          activeSection === item.id
                            ? "bg-gradient-to-br from-blue-300 to-blue-400"
                            : "bg-white/10"
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                        {activeSection === item.id && (
                          <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full"></div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-800/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-4 border border-blue-600/20">
              <h4 className="text-blue-200 text-sm font-medium mb-3">Your Progress</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-200">Courses</span>
                  <span className="text-sm font-bold text-white">6/10</span>
                </div>
                <div className="w-full bg-blue-800/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-blue-200">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>7 day streak</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>4.8 avg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-blue-700/30 space-y-2">
            <button 
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-800/50 text-blue-100 hover:text-white transition-all duration-200 group touch-manipulation"
              style={{ minHeight: '44px' }}
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
              <span className="font-medium">Settings</span>
            </button>
            <button 
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-800/50 text-blue-100 hover:text-white transition-all duration-200 group touch-manipulation"
              style={{ minHeight: '44px' }}
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}