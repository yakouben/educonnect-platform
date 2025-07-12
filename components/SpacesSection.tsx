'use client';

import { useState } from 'react';
import { Plus, Users, Lock, Eye, Globe, MoreHorizontal, Hash, Home, Lightbulb, Rocket } from 'lucide-react';
import { GlassCard } from './ui/glass-card';

interface Space {
  id: string;
  name: string;
  description: string;
  type: 'open' | 'private' | 'secret';
  memberCount: number;
  color: string;
  lastActivity: string;
  isActive?: boolean;
}

const spaces: Space[] = [
  {
    id: '1',
    name: 'Web Development Hub',
    description: 'Share projects, get feedback, and collaborate on web dev',
    type: 'open',
    memberCount: 234,
    color: 'bg-blue-500',
    lastActivity: '2 min ago',
    isActive: true,
  },
  {
    id: '2',
    name: 'Design Critique',
    description: 'Get constructive feedback on your design work',
    type: 'private',
    memberCount: 89,
    color: 'bg-purple-500',
    lastActivity: '15 min ago',
  },
  {
    id: '3',
    name: 'Career Mentorship',
    description: 'Connect with mentors and advance your career',
    type: 'private',
    memberCount: 156,
    color: 'bg-green-500',
    lastActivity: '1 hour ago',
  },
  {
    id: '4',
    name: 'Founders Circle',
    description: 'Exclusive space for startup founders and entrepreneurs',
    type: 'secret',
    memberCount: 23,
    color: 'bg-orange-500',
    lastActivity: '3 hours ago',
  },
];

export function SpacesSection() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSpace, setNewSpace] = useState({
    name: '',
    description: '',
    type: 'open' as 'open' | 'private' | 'secret',
    color: 'bg-blue-500',
  });

  const getAccessIcon = (type: string) => {
    switch (type) {
      case 'open':
        return <Globe className="w-4 h-4" />;
      case 'private':
        return <Users className="w-4 h-4" />;
      case 'secret':
        return <Lock className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getAccessDescription = (type: string) => {
    switch (type) {
      case 'open':
        return 'Anyone in the community can see and join this space';
      case 'private':
        return 'Members need to be invited or request to join';
      case 'secret':
        return 'Only invited members can see and access this space';
      default:
        return '';
    }
  };

  const colorOptions = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  const handleCreateSpace = () => {
    // Handle space creation here
    setShowCreateModal(false);
    setNewSpace({ name: '', description: '', type: 'open', color: 'bg-blue-500' });
  };

  return (
    <div className="relative">
      <GlassCard gradient="blue" className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg sm:text-xl font-bold text-white">Community Spaces</h2>
              <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm animate-glow">
                <Home className="w-4 h-4 text-white" />
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 touch-manipulation"
            >
              <Plus className="w-4 h-4" />
              <span>Create Space</span>
            </button>
          </div>
        </div>

        {/* Spaces List */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {spaces.map((space, index) => (
            <div
              key={space.id}
              className={`group flex items-center space-x-4 p-4 sm:p-5 rounded-xl border backdrop-blur-sm transition-all duration-200 cursor-pointer animate-slide-up ${
                space.isActive
                  ? 'bg-gradient-to-r from-white/20 to-white/10 border-white/30 shadow-lg'
                  : 'border-white/20 hover:border-white/40 hover:bg-white/10'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${space.color.replace('bg-', 'bg-gradient-to-br from-')} shadow-lg`} />
                <div className="w-6 h-6 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Hash className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                  <h4 className="font-semibold text-white text-sm sm:text-base">{space.name}</h4>
                  <div className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    {getAccessIcon(space.type)}
                  </div>
                  {space.isActive && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs font-medium rounded-full flex items-center space-x-1 border border-green-400/30">
                      <span>Active</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-xs sm:text-sm mb-2 line-clamp-2">{space.description}</p>
                <div className="flex items-center space-x-3 text-xs text-white/60">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{space.memberCount} members</span>
                  </div>
                  <span>•</span>
                  <span>Last activity {space.lastActivity}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm">
                  <MoreHorizontal className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Create Space Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Create a Space</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Space Name */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Space name
                </label>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${newSpace.color}`} />
                  <input
                    type="text"
                    value={newSpace.name}
                    onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                    placeholder="Your space name"
                    className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60"
                  />
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Space color
                </label>
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewSpace({ ...newSpace, color })}
                      className={`w-6 h-6 rounded-full ${color} ${
                        newSpace.color === color ? 'ring-2 ring-white/40' : ''
                      } shadow-lg`}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Description
                </label>
                <textarea
                  value={newSpace.description}
                  onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                  placeholder="What's this space about?"
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none resize-none text-white placeholder-white/60"
                />
              </div>

              {/* Access Level */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Access
                </label>
                <div className="space-y-2">
                  {(['open', 'private', 'secret'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewSpace({ ...newSpace, type })}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors backdrop-blur-sm ${
                        newSpace.type === type
                          ? 'border-white/40 bg-white/20'
                          : 'border-white/20 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        {getAccessIcon(type)}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm capitalize text-white">{type}</div>
                        <div className="text-xs text-white/60">
                          {getAccessDescription(type)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm text-white/80 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSpace}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                >
                  Create Space
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}