'use client';

import { Home, BookOpen, Users, MessageSquare, Hash, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'spaces', label: 'Spaces', icon: Hash },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

export function MobileBottomNav({ activeSection, setActiveSection }: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1",
                isActive
                  ? "text-blue-600"
                  : "text-gray-500"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all duration-200",
                isActive
                  ? "bg-blue-100"
                  : "bg-transparent"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
        
        {/* Add Button */}
        <button className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium text-gray-500">Add</span>
        </button>
      </div>
    </div>
  );
}