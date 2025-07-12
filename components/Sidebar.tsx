'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
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
  Plus
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { EnhancedButton } from './ui/enhanced-button';
import { GlassCard } from './ui/glass-card';
import { EnhancedSearch } from './ui/enhanced-search';

interface SidebarProps {
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

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMainCollapsed, setIsMainCollapsed] = useState(false);
  const [isLearningCollapsed, setIsLearningCollapsed] = useState(false);

  return (
    <div className="fixed left-0 top-0 h-screen w-64 xl:w-72 bg-gradient-to-b from-blue-900/95 via-blue-800/95 to-blue-900/95 backdrop-blur-xl text-white flex flex-col z-40 shadow-2xl border-r border-blue-700/30">
      {/* Logo */}
      <div className="p-6 xl:p-8 border-b border-blue-700/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg animate-glow">
              <GraduationCap className="w-6 h-6 xl:w-7 xl:h-7 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg xl:text-xl">EduConnect</h2>
              <p className="text-blue-200 text-sm xl:text-base">Learning Platform</p>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-blue-800/50 transition-all duration-200 group"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-blue-200 group-hover:text-yellow-300 transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-blue-200 group-hover:text-blue-100 transition-colors" />
            )}
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl bg-blue-800/30 hover:bg-blue-800/50 transition-all duration-200 text-blue-100 hover:text-white border border-blue-700/30"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Quick search...</span>
            <span className="ml-auto text-xs bg-blue-700/50 px-2 py-1 rounded-md">⌘K</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 xl:p-8 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Main Navigation */}
        <div>
          <button
            onClick={() => setIsMainCollapsed(!isMainCollapsed)}
            className="flex items-center justify-between w-full text-blue-200 text-sm font-medium mb-4 uppercase tracking-wider hover:text-white transition-colors"
          >
            <span>Main</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMainCollapsed && "rotate-180")} />
          </button>
          
          <div className={cn("space-y-2 transition-all duration-300", isMainCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100")}>
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
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                        : "hover:bg-blue-800/50 text-blue-100 hover:text-white hover:transform hover:scale-105"
                    )}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                      activeSection === item.id
                        ? "bg-white/20 shadow-lg"
                        : "bg-blue-800/30 group-hover:bg-blue-700/40"
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium flex-1">{item.label}</span>
                    
                    {/* Notification count */}
                    {item.count > 0 && (
                      <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in">
                        {item.count > 9 ? '9+' : item.count}
                      </div>
                    )}
                    
                    {activeSection === item.id && (
                      <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full animate-glow"></div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Section */}
        <div>
          <button
            onClick={() => setIsLearningCollapsed(!isLearningCollapsed)}
            className="flex items-center justify-between w-full text-blue-200 text-sm font-medium mb-4 uppercase tracking-wider hover:text-white transition-colors"
          >
            <span>Learning</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isLearningCollapsed && "rotate-180")} />
          </button>
          
          <div className={cn("space-y-2 transition-all duration-300", isLearningCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100")}>
            {learningItems.map((item, index) => {
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
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                        : "hover:bg-blue-800/50 text-blue-100 hover:text-white hover:transform hover:scale-105"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                      activeSection === item.id
                        ? "bg-white/20 shadow-lg"
                        : "bg-blue-800/30 group-hover:bg-blue-700/40"
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium flex-1">{item.label}</span>
                    
                    {item.count > 0 && (
                      <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in">
                        {item.count > 9 ? '9+' : item.count}
                      </div>
                    )}
                    
                    {activeSection === item.id && (
                      <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full animate-glow"></div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Progress Card */}
        <GlassCard gradient="blue" className="p-4 animate-float">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-blue-200 text-sm font-medium">Your Progress</h4>
            <Trophy className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-200">Courses</span>
              <span className="text-sm font-bold text-white">6/10</span>
            </div>
            <div className="w-full bg-blue-800/50 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out animate-shimmer"
                style={{ width: '60%' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-200">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-orange-400" />
                <span>7 day streak</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span>4.8 avg</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-blue-200 text-sm font-medium mb-3 uppercase tracking-wider">Quick Actions</h4>
          <EnhancedButton
            variant="ghost"
            size="sm"
            fullWidth
            icon={<Plus className="w-4 h-4" />}
            className="justify-start text-blue-100 border-blue-700/30 hover:bg-blue-800/30"
          >
            Join Course
          </EnhancedButton>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 xl:p-8 border-t border-blue-700/30 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-800/50 text-blue-100 hover:text-white transition-all duration-200 group">
          <div className="w-8 h-8 bg-blue-800/30 rounded-lg flex items-center justify-center group-hover:bg-blue-700/40 transition-colors">
            <Settings className="w-4 h-4" />
          </div>
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-blue-100 hover:text-red-300 transition-all duration-200 group">
          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <EnhancedSearch
              placeholder="Search courses, members, spaces..."
              recentSearches={['React', 'JavaScript', 'UI Design']}
              trendingSearches={['AI', 'Web3', 'Mobile Development']}
              onResultSelect={() => setIsSearchOpen(false)}
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}