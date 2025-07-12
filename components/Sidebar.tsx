'use client';

import { cn } from '@/lib/utils';
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
  Hash
} from 'lucide-react';

interface SidebarProps {
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

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 xl:w-72 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white flex flex-col z-40 shadow-2xl">
      {/* Logo */}
      <div className="p-6 xl:p-8 border-b border-blue-700/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
            <GraduationCap className="w-6 h-6 xl:w-7 xl:h-7 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg xl:text-xl">EduConnect</h2>
            <p className="text-blue-200 text-sm xl:text-base">Learning Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 xl:p-8 space-y-8 overflow-y-auto">
        {/* Main Navigation */}
        <div>
          <h3 className="text-blue-200 text-sm font-medium mb-4 uppercase tracking-wider">Main</h3>
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                        : "hover:bg-blue-800/50 text-blue-100 hover:text-white hover:transform hover:scale-105"
                    )}
                  >
                    <Icon className="w-5 h-5" />
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
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                        : "hover:bg-blue-800/50 text-blue-100 hover:text-white hover:transform hover:scale-105"
                    )}
                  >
                    <Icon className="w-5 h-5" />
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
              <span>🔥 7 day streak</span>
              <span>⭐ 4.8 avg</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 xl:p-8 border-t border-blue-700/30 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-800/50 text-blue-100 hover:text-white transition-all duration-200 group">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-800/50 text-blue-100 hover:text-white transition-all duration-200 group">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}