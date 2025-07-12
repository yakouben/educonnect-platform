'use client';

import { useState } from 'react';
import { Search, Filter, Users, MapPin, Calendar, MessageCircle, UserPlus, Star, Award, Grid, List, MoreHorizontal, Code, Palette, TrendingUp, Database, Smartphone, Zap } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';

const members = [
  {
    id: 1,
    name: 'Sarah med',
    username: '@sarah_codes',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'San Francisco, CA',
    joinDate: 'Jan 2023',
    bio: 'Full-stack developer passionate about creating amazing user experiences. Love to share knowledge and help others grow.',
    icon: Code,
  },
  {
    id: 2,
    name: 'Marcus Chen',
    username: '@marcus_design',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'New York, NY',
    joinDate: 'Mar 2023',
    bio: 'UX Designer with 8+ years of experience. I believe great design solves real problems.',
    icon: Palette,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    username: '@emily_markets',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'Austin, TX',
    joinDate: 'Feb 2023',
    bio: 'Growth marketer helping startups scale. Always experimenting with new strategies and tactics.',
    icon: TrendingUp,
  },
  {
    id: 4,
    name: 'David Kim',
    username: '@david_data',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'Seattle, WA',
    joinDate: 'Apr 2023',
    bio: 'Data scientist turning complex data into actionable insights. Love working with AI and ML.',
    icon: Database,
  },
  {
    id: 5,
    name: 'Lisa Wang',
    username: '@lisa_founder',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'Los Angeles, CA',
    joinDate: 'May 2023',
    bio: 'Serial entrepreneur building the future. Passionate about mentoring the next generation of founders.',
    icon: Zap,
  },
  {
    id: 6,
    name: 'Alex Thompson',
    username: '@alex_creative',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: 'Miami, FL',
    joinDate: 'Jun 2023',
    bio: 'Creative director with a passion for storytelling through design. Love collaborating with amazing teams.',
    icon: Palette,
  },
];

const locations = ['All', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Los Angeles, CA', 'Miami, FL'];

export function MembersPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <GlassCard gradient="blue" className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <h1 className="text-lg sm:text-xl font-bold text-white">Community Members</h1>
              <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm animate-glow">
              <Users className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === 'grid' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
                  }`}
                >
                  <Grid className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === 'list' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
                  }`}
                >
                  <List className="w-4 h-4 text-white" />
                </button>
              </div>
              <EnhancedButton
                variant="primary"
                size="sm"
                icon={<UserPlus className="w-4 h-4" />}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg rounded-2xl"
              >
                Invite Members
              </EnhancedButton>
        </div>
      </div>

      {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60 text-sm sm:text-base"
              />
          </div>
          </div>
        </div>
      </GlassCard>

      {/* Members Grid */}
      <GlassCard gradient="blue" className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Community Directory</h2>
            <span className="text-xs sm:text-sm text-white/70">{filteredMembers.length} members found</span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
        {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMembers.map((member, index) => {
              const IconComponent = member.icon;
              return (
                <div
                  key={member.id}
                  className="group border border-white/20 rounded-3xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:border-white/40 relative backdrop-blur-sm bg-white/5 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Online Status */}
                  {/* Removed isOnline and isVerified */}

                  {/* Profile Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
                      />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                          <IconComponent className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-white text-sm sm:text-base truncate">{member.name}</h3>
                      {/* Removed isVerified and Award icon */}
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm truncate">{member.username}</p>
                        {/* Removed badge and badgeColor */}
                    </div>
                  </div>

                    {/* Role and Company */}
                    {/* Removed role and company */}

                    {/* Bio/Description */}
                    <div className="mb-4">
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{member.bio}</p>
                    </div>

                    {/* Location and Join Date */}
                    <div className="flex items-center space-x-4 text-xs sm:text-sm text-white/60 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{member.joinDate}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <EnhancedButton
                        variant="primary"
                        size="sm"
                        fullWidth
                        icon={<MessageCircle className="w-4 h-4" />}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg rounded-2xl"
                      >
                        Message
                      </EnhancedButton>
                      <button className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20 rounded-2xl">
                        <MoreHorizontal className="w-4 h-4 text-white" />
                      </button>
                    </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
              {filteredMembers.map((member, index) => {
              const IconComponent = member.icon;
              return (
                <div
                  key={member.id}
                  className="flex items-center space-x-4 p-4 sm:p-6 border border-white/20 rounded-3xl hover:border-white/40 hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/5 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                    {/* Profile */}
                    <div className="relative flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
                    />
                      <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                        <IconComponent className="w-3 h-3 text-white" />
                    </div>
                    {/* Removed isOnline */}
                  </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-white text-sm sm:text-base">{member.name}</h3>
                      {/* Removed isVerified and Award icon */}
                      {/* Removed badge */}
                    </div>
                      <p className="text-white/80 text-xs sm:text-sm mb-2">{member.username}</p>
                      {/* Removed company */}
                    
                      {/* Bio/Description */}
                      <p className="text-white/80 text-xs sm:text-sm mb-3 leading-relaxed">{member.bio}</p>
                      
                      {/* Join Date */}
                      <div className="flex items-center space-x-1 text-xs sm:text-sm text-white/60 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {member.joinDate}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <EnhancedButton
                        variant="primary"
                        size="sm"
                        icon={<MessageCircle className="w-4 h-4" />}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg rounded-2xl"
                      >
                        Message
                      </EnhancedButton>
                      <button className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20 rounded-2xl">
                        <MoreHorizontal className="w-4 h-4 text-white" />
                      </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </GlassCard>
    </div>
  );
}