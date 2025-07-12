'use client';

import { useState } from 'react';
import { Plus, Users, Lock, Eye, Globe, MoreHorizontal, Hash, Home, Lightbulb, Rocket } from 'lucide-react';

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

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-gray-900">Community Spaces</h2>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Home className="w-4 h-4 text-white" />
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create Space</span>
        </button>
      </div>

      {/* Spaces List */}
      <div className="space-y-3">
        {spaces.map((space) => (
          <div
            key={space.id}
            className={`group flex items-center space-x-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
              space.isActive
                ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200'
                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${space.color}`} />
              <Hash className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-900 text-sm">{space.name}</h4>
                {getAccessIcon(space.type)}
                {space.isActive && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center space-x-1">
                    <span>Active</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-xs mb-2">{space.description}</p>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{space.memberCount} members</span>
                </div>
                <span>•</span>
                <span>Last activity {space.lastActivity}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
            <Lightbulb className="w-3 h-3 text-white" />
          </div>
          <h3 className="font-semibold text-blue-900 text-sm">Space Ideas</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="text-left p-2 bg-white/50 rounded-lg hover:bg-white/80 transition-colors">
            <div className="text-xs font-medium text-blue-800 flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>Study Groups</span>
            </div>
            <div className="text-xs text-blue-600">Collaborative learning</div>
          </button>
          <button className="text-left p-2 bg-white/50 rounded-lg hover:bg-white/80 transition-colors">
            <div className="text-xs font-medium text-blue-800 flex items-center space-x-1">
              <Rocket className="w-3 h-3" />
              <span>Project Teams</span>
            </div>
            <div className="text-xs text-blue-600">Build together</div>
          </button>
        </div>
      </div>

      {/* Create Space Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Create a Space</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Space Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Space name
                </label>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${newSpace.color}`} />
                  <input
                    type="text"
                    value={newSpace.name}
                    onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                    placeholder="Your space name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Space color
                </label>
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewSpace({ ...newSpace, color })}
                      className={`w-6 h-6 rounded-full ${color} ${
                        newSpace.color === color ? 'ring-2 ring-gray-400' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newSpace.description}
                  onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                  placeholder="What's this space about?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Access Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access
                </label>
                <div className="space-y-2">
                  {(['open', 'private', 'secret'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewSpace({ ...newSpace, type })}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                        newSpace.type === type
                          ? 'border-purple-300 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {getAccessIcon(type)}
                      <div className="text-left">
                        <div className="font-medium text-sm capitalize">{type}</div>
                        <div className="text-xs text-gray-500">
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
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle space creation here
                    setShowCreateModal(false);
                    setNewSpace({ name: '', description: '', type: 'open', color: 'bg-blue-500' });
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
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