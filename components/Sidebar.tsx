'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  CreditCard,
  UserPlus,
  BookOpen,
  Calendar,
  Trophy,
  Bell,
  Clock,
  Home,
  Users,
  MessageSquare,
  Bookmark,
  Settings,
  LogOut,
  GraduationCap,
  Hash,
  Search,
  Moon,
  Sun,
  Zap,
  Star,
  ChevronDown,
  Plus,
  User,
  Award,
  Target,
  TrendingUp,
  Activity,
  Coffee,
  Flame,
  Link
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { EnhancedButton } from './ui/enhanced-button';
import { GlassCard } from './ui/glass-card';
import { EnhancedSearch } from './ui/enhanced-search';
import { CommunityReferralModal } from './CommunityReferralModal';
import { getCurrentUser, getOrCreateUserProfile } from '@/lib/supabase';
import Image from 'next/image';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, count: 0 },
  { id: 'courses', label: 'Courses', icon: BookOpen, count: 12 },
  { id: 'spaces', label: 'Spaces', icon: Hash, count: 3 },
  { id: 'events', label: 'Events', icon: Calendar, count: 2 },
  { id: 'members', label: 'Members', icon: Users, count: 48 },
  { id: 'messages', label: 'Messages', icon: MessageSquare, count: 5 },
];

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
      
      if (user) {
        // Try to get or create user profile
        const { data: profile, error } = await getOrCreateUserProfile(user.id, {
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          avatar: user.user_metadata?.avatar_url
        });
        
        if (profile) {
          setUserProfile(profile);
        } else if (error) {
          console.error('Error with user profile:', error);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const handleReferralClick = () => {
    if (!currentUser || !userProfile) {
      // Show a message that user needs to be logged in
      alert('Please log in to access referral links');
      return;
    }
    setShowReferralModal(true);
  };

  return (
    <>
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900/95 via-blue-800/95 to-blue-900/95 backdrop-blur-xl text-white flex flex-col z-50 shadow-2xl border-r border-blue-700/30 overflow-hidden">
      {/* Enhanced Logo Section - Fixed */}
      <div className="flex-shrink-0 p-6 border-b border-blue-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl ring-2 ring-blue-400/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              <Image
                src="/logo-joinly.png"
                alt="Joinly"
                width={28}
                height={28}
                className="w-7 h-7 relative z-10"
              />
            </div>
            <div>
              <h2 className="font-bold text-xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Joinly
              </h2>
              <p className="text-blue-200 text-xs">Learning Platform</p>
            </div>
          </div>
          
          {/* Enhanced Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl hover:bg-blue-800/50 transition-all duration-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-blue-200 group-hover:text-yellow-300 transition-colors relative z-10" />
            ) : (
              <Moon className="w-5 h-5 text-blue-200 group-hover:text-blue-100 transition-colors relative z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation - Scrollable content */}
      <nav className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 px-6 py-4 overflow-y-auto custom-scrollbar">
        {/* Navigation Items */}
          <div className="space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden sidebar-item",
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "hover:bg-blue-800/50 text-blue-100 hover:text-white"
                  )}
                >
                  {/* Enhanced Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 relative z-10",
                    activeSection === item.id
                      ? "bg-white/20 shadow-lg"
                      : "bg-blue-800/30 group-hover:bg-blue-700/40"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium flex-1 relative z-10">{item.label}</span>
                  
                  {/* Enhanced Notification count */}
                  {item.count > 0 && (
                      <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg ring-2 ring-red-400/30 relative z-10 font-bold">
                      {item.count > 9 ? '9+' : item.count}
                    </div>
                  )}
                  
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full shadow-lg relative z-10"></div>
                  )}
                </button>
              </div>
            );
          })}
          </div>

            {/* Referral Links Section */}
            <div className="mt-6 pt-6 border-t border-blue-700/30">
              <div className="animate-slide-up" style={{ animationDelay: `${navigationItems.length * 50}ms` }}>
                <button
                  onClick={handleReferralClick}
                  disabled={isLoadingUser}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-green-500/10 text-blue-100 hover:text-green-300 transition-all duration-200 group relative overflow-hidden sidebar-item disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors relative z-10">
                    <Link className="w-4 h-4" />
                  </div>
                  <span className="font-medium relative z-10">
                    {isLoadingUser ? 'Loading...' : 'Referral Links'}
                  </span>
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full shadow-lg relative z-10"></div>
                </button>
              </div>
            </div>
        </div>

        {/* Bottom Fixed Section - Settings & Logout */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-blue-700/30 space-y-2">
          {/* Settings Button */}
            <div className="animate-slide-up" style={{ animationDelay: `${(navigationItems.length + 1) * 50}ms` }}>
            <button
              onClick={() => setActiveSection('settings')}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden sidebar-item",
                activeSection === 'settings'
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  : "hover:bg-blue-800/50 text-blue-100 hover:text-white"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 relative z-10",
                activeSection === 'settings'
                  ? "bg-white/20 shadow-lg"
                  : "bg-blue-800/30 group-hover:bg-blue-700/40"
              )}>
                <Settings className="w-4 h-4" />
              </div>
              <span className="font-medium flex-1 relative z-10">Settings</span>
              {activeSection === 'settings' && (
                <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full shadow-lg relative z-10"></div>
              )}
            </button>
          </div>

          {/* Logout Button */}
            <div className="animate-slide-up" style={{ animationDelay: `${(navigationItems.length + 2) * 50}ms` }}>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-blue-100 hover:text-red-300 transition-all duration-200 group relative overflow-hidden sidebar-item">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors relative z-10">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-medium relative z-10">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <EnhancedSearch
              placeholder="Search courses, members, spaces..."
              recentSearches={['React', 'JavaScript', 'UI Design']}
                onClose={() => setIsSearchOpen(false)}
            />
            </div>
          </div>
        )}
        </div>

      {/* Community Referral Modal */}
      {currentUser && userProfile && (
        <CommunityReferralModal
          isOpen={showReferralModal}
          onClose={() => setShowReferralModal(false)}
          currentUserId={userProfile.id}
          currentUserName={userProfile.name}
        />
      )}
    </>
  );
}