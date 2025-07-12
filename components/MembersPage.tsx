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
    role: 'Senior Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    joinDate: 'Jan 2023',
    followers: 1234,
    following: 567,
    posts: 89,
    skills: ['React', 'TypeScript', 'Node.js'],
    isOnline: true,
    isVerified: true,
    bio: 'Full-stack developer passionate about creating amazing user experiences. Love to share knowledge and help others grow.',
    icon: Code,
    badge: 'Expert',
    badgeColor: 'bg-purple-500',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    username: '@marcus_design',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'UX Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    joinDate: 'Mar 2023',
    followers: 892,
    following: 234,
    posts: 156,
    skills: ['Figma', 'Prototyping', 'User Research'],
    isOnline: false,
    isVerified: true,
    bio: 'UX Designer with 8+ years of experience. I believe great design solves real problems.',
    icon: Palette,
    badge: 'Pro',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    username: '@emily_markets',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Marketing Manager',
    company: 'GrowthLab',
    location: 'Austin, TX',
    joinDate: 'Feb 2023',
    followers: 2156,
    following: 789,
    posts: 234,
    skills: ['Growth Hacking', 'Analytics', 'Content Strategy'],
    isOnline: true,
    isVerified: false,
    bio: 'Growth marketer helping startups scale. Always experimenting with new strategies and tactics.',
    icon: TrendingUp,
    badge: 'Rising Star',
    badgeColor: 'bg-emerald-500',
  },
  {
    id: 4,
    name: 'David Kim',
    username: '@david_data',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Data Scientist',
    company: 'DataCorp',
    location: 'Seattle, WA',
    joinDate: 'Apr 2023',
    followers: 567,
    following: 123,
    posts: 67,
    skills: ['Python', 'Machine Learning', 'SQL'],
    isOnline: true,
    isVerified: true,
    bio: 'Data scientist turning complex data into actionable insights. Love working with AI and ML.',
    icon: Database,
    badge: 'Mentor',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    username: '@lisa_founder',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Founder & CEO',
    company: 'StartupXYZ',
    location: 'Los Angeles, CA',
    joinDate: 'May 2023',
    followers: 3421,
    following: 456,
    posts: 178,
    skills: ['Leadership', 'Strategy', 'Fundraising'],
    isOnline: false,
    isVerified: true,
    bio: 'Serial entrepreneur building the future. Passionate about mentoring the next generation of founders.',
    icon: Zap,
    badge: 'Founder',
    badgeColor: 'bg-red-500',
  },
  {
    id: 6,
    name: 'Alex Thompson',
    username: '@alex_creative',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Creative Director',
    company: 'CreativeAgency',
    location: 'Miami, FL',
    joinDate: 'Jun 2023',
    followers: 1789,
    following: 345,
    posts: 123,
    skills: ['Branding', 'Creative Strategy', 'Team Leadership'],
    isOnline: true,
    isVerified: false,
    bio: 'Creative director with a passion for storytelling through design. Love collaborating with amazing teams.',
    icon: Palette,
    badge: 'Creative',
    badgeColor: 'bg-pink-500',
  },
];

const roles = ['All', 'Developer', 'Designer', 'Marketing Manager', 'Data Scientist', 'Founder & CEO', 'Creative Director'];
const locations = ['All', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Los Angeles, CA', 'Miami, FL'];

export function MembersPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member => {
    const matchesRole = selectedRole === 'All' || member.role.includes(selectedRole);
    const matchesSkill = selectedSkill === 'All' || member.skills.includes(selectedSkill);
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSkill && matchesSearch;
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
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-1">
            <button
              onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
              }`}
            >
                  <Grid className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
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
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
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
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60 text-sm sm:text-base"
            />
          </div>
            <div className="flex space-x-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white text-sm sm:text-base"
              >
                <option value="All">All Roles</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
                <option value="Analyst">Analyst</option>
            </select>
            <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white text-sm sm:text-base"
              >
                <option value="All">All Skills</option>
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Figma">Figma</option>
                <option value="Node.js">Node.js</option>
            </select>
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
                    className="group border border-white/20 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:border-white/40 relative backdrop-blur-sm bg-white/5 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Online Status */}
                  {member.isOnline && (
                      <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  )}

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
                      {member.isVerified && (
                            <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm truncate">{member.username}</p>
                        <span className={`inline-block px-2 py-1 ${member.badgeColor} text-white text-xs font-medium rounded-full mt-1`}>
                        {member.badge}
                      </span>
                    </div>
                  </div>

                    {/* Role and Company */}
                    <div className="mb-4">
                      <p className="font-semibold text-white text-sm sm:text-base mb-1">{member.role}</p>
                      <p className="text-white/70 text-xs sm:text-sm">{member.company}</p>
                    </div>

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

                  {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {member.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/15 text-white/80 rounded-full text-xs border border-white/20">
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                          <span className="px-2 py-1 bg-white/15 text-white/80 rounded-full text-xs border border-white/20">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                    </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                      <EnhancedButton
                        variant="primary"
                        size="sm"
                        fullWidth
                        icon={<MessageCircle className="w-4 h-4" />}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                      >
                        Message
                      </EnhancedButton>
                      <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
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
                    className="flex items-center space-x-4 p-4 sm:p-6 border border-white/20 rounded-2xl hover:border-white/40 hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/5 animate-slide-up"
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
                      {member.isOnline && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                      )}
                  </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-white text-sm sm:text-base">{member.name}</h3>
                        {member.isVerified && (
                          <Award className="w-4 h-4 text-blue-400" />
                        )}
                        <span className={`px-2 py-1 ${member.badgeColor} text-white text-xs font-medium rounded-full`}>
                          {member.badge}
                        </span>
                      </div>
                      <p className="text-white/80 text-xs sm:text-sm mb-2">{member.username} • {member.role}</p>
                      <p className="text-white/70 text-xs sm:text-sm mb-2">{member.company}</p>
                      
                      {/* Bio/Description */}
                      <p className="text-white/80 text-xs sm:text-sm mb-3 leading-relaxed">{member.bio}</p>
                      
                      {/* Join Date */}
                      <div className="flex items-center space-x-1 text-xs sm:text-sm text-white/60 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {member.joinDate}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {member.skills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/15 text-white/80 rounded-full text-xs border border-white/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <EnhancedButton
                        variant="primary"
                        size="sm"
                        icon={<MessageCircle className="w-4 h-4" />}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                      >
                        Message
                      </EnhancedButton>
                      <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
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