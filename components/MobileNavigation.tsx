'use client';

import { useState } from 'react';
import { Menu, X, Home, BookOpen, Users, MessageSquare, Hash, Calendar, CreditCard, UserPlus, Trophy, Clock, Bell, Settings, LogOut, GraduationCap, Star, Zap, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';

interface MobileNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, count: 0 },
  { id: 'spaces', label: 'Spaces', icon: Hash, count: 3 },
  { id: 'courses', label: 'Courses', icon: BookOpen, count: 12 },
  { id: 'events', label: 'Events', icon: Calendar, count: 2 },
  { id: 'members', label: 'Members', icon: Users, count: 48 },
  { id: 'messages', label: 'Messages', icon: MessageSquare, count: 5 },
];

const learningItems = [
  { id: 'payment', label: 'Payment Info', icon: CreditCard, count: 0 },
  { id: 'registration', label: 'Registration', icon: UserPlus, count: 1 },
  { id: 'results', label: 'Results', icon: Trophy, count: 0 },
  { id: 'schedule', label: 'Schedule', icon: Clock, count: 3 },
  { id: 'notices', label: 'Notices', icon: Bell, count: 2 },
];

export function MobileNavigation({ activeSection, setActiveSection }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Modern Glass Morphism Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-blue-900/90 border-b border-white/10 px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between">
          {/* Logo and Hamburger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 touch-manipulation backdrop-blur-sm"
              style={{ minWidth: '48px', minHeight: '48px' }}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-glow">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg">Joinly</h1>
               
              </div>
            </div>
          </div>
          
          {/* User Profile and Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 touch-manipulation">
              <Search className="w-5 h-5" />
            </button>
            
            <button className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 touch-manipulation">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                3
              </span>
            </button>
            
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slide-out Navigation Panel */}
      <div className={cn(
        "fixed inset-0 z-[60] transition-all duration-300 ease-in-out",
        isOpen ? "visible" : "invisible"
      )}>
        {/* Backdrop with blur */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Navigation Panel */}
        <div className={cn(
          "absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-blue-900/95 via-blue-800/95 to-blue-900/95 backdrop-blur-xl text-white transform transition-all duration-300 ease-in-out shadow-2xl border-r border-white/10",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Enhanced Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-glow">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-white">Joinly</h2>
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

            {/* User Profile Card */}
            <GlassCard className="p-4 bg-white/5 border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <span className="text-white font-bold text-lg">JD</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">Yakoub Doe</h3>
                  <p className="text-blue-200 text-sm">Premium Member</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-blue-200">4.8 Rating</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Navigation Content with better mobile spacing */}
          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <h3 className="text-blue-200 text-sm font-medium mb-4 uppercase tracking-wider flex items-center space-x-2">
                <Hash className="w-4 h-4" />
                <span>Main</span>
              </h3>
              <ul className="space-y-3">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <button
                        onClick={() => handleItemClick(item.id)}
                        className={cn(
                          "w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group touch-manipulation relative overflow-hidden",
                          activeSection === item.id
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                            : "hover:bg-white/10 text-blue-100 hover:text-white"
                        )}
                        style={{ minHeight: '56px' }}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200",
                          activeSection === item.id
                            ? "bg-white/20 shadow-lg"
                            : "bg-white/10 group-hover:bg-white/20"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-base flex-1">{item.label}</span>
                        
                        {/* Notification count */}
                        {item.count > 0 && (
                          <div className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in font-bold">
                            {item.count > 9 ? '9+' : item.count}
                          </div>
                        )}
                        
                        {activeSection === item.id && (
                          <div className="ml-2 w-3 h-3 bg-blue-300 rounded-full animate-glow"></div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Learning Section */}
            <div>
              <h3 className="text-blue-200 text-sm font-medium mb-4 uppercase tracking-wider flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Learning</span>
              </h3>
              <ul className="space-y-3">
                {learningItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id} className="animate-slide-up" style={{ animationDelay: `${(index + 6) * 50}ms` }}>
                      <button
                        onClick={() => handleItemClick(item.id)}
                        className={cn(
                          "w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group touch-manipulation relative overflow-hidden",
                          activeSection === item.id
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                            : "hover:bg-white/10 text-blue-100 hover:text-white"
                        )}
                        style={{ minHeight: '56px' }}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200",
                          activeSection === item.id
                            ? "bg-white/20 shadow-lg"
                            : "bg-white/10 group-hover:bg-white/20"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-base flex-1">{item.label}</span>
                        
                        {item.count > 0 && (
                          <div className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in font-bold">
                            {item.count > 9 ? '9+' : item.count}
                          </div>
                        )}
                        
                        {activeSection === item.id && (
                          <div className="ml-2 w-3 h-3 bg-blue-300 rounded-full animate-glow"></div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Enhanced Progress Card */}
            <GlassCard gradient="blue" className="p-5 animate-float">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-blue-200 text-sm font-medium">Your Progress</h4>
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Courses Completed</span>
                  <span className="text-lg font-bold text-white">6/10</span>
                </div>
                <div className="w-full bg-blue-800/50 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '60%' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-blue-200">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span>7 day streak</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.8 rating</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Enhanced Bottom Actions */}
          <div className="p-6 border-t border-white/10 space-y-3">
            <EnhancedButton
              variant="ghost"
              size="lg"
              fullWidth
              icon={<Settings className="w-5 h-5" />}
              className="justify-start text-blue-100 border-white/20 hover:bg-white/10"
            >
              Settings & Preferences
            </EnhancedButton>
            <EnhancedButton
              variant="ghost"
              size="lg"
              fullWidth
              icon={<LogOut className="w-5 h-5" />}
              className="justify-start text-red-300 border-red-400/30 hover:bg-red-500/10"
            >
              Logout
            </EnhancedButton>
          </div>
        </div>
      </div>
    </>
  );
}