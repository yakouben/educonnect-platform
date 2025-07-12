'use client';

import { useState } from 'react';
import { Search, Filter, Users, MapPin, Calendar, MessageCircle, UserPlus, Star, Award, Grid, List, MoreHorizontal, Code, Palette, TrendingUp, Database, Smartphone, Zap } from 'lucide-react';

const members = [
  {
    id: 1,
    name: 'Sarah Johnson',
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
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredMembers = members.filter(member => {
    const matchesRole = selectedRole === 'All' || member.role === selectedRole;
    const matchesLocation = selectedLocation === 'All' || member.location === selectedLocation;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnline = !showOnlineOnly || member.isOnline;
    return matchesRole && matchesLocation && matchesSearch && matchesOnline;
  });

  return (
    <div className="space-y-6 p-4 md:p-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <span>Community Members</span>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-4 h-4 text-white" />
            </div>
          </h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Connect with amazing people in our community</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md">
            <UserPlus className="w-4 h-4" />
            <span>Invite Members</span>
          </button>
          
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search members, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm md:text-base"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-sm md:text-base"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <label className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Online only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">{members.length}</h3>
          <p className="text-purple-100 text-xs md:text-base">Total Members</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">{members.filter(m => m.isOnline).length}</h3>
          <p className="text-emerald-100 text-xs md:text-base">Online Now</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">{members.filter(m => m.isVerified).length}</h3>
          <p className="text-blue-100 text-xs md:text-base">Verified Members</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">23</h3>
          <p className="text-orange-100 text-xs md:text-base">New This Week</p>
        </div>
      </div>

      {/* Members Grid/List */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Community Directory</h2>
          <span className="text-xs md:text-sm text-gray-500">{filteredMembers.length} members found</span>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredMembers.map((member) => {
              const IconComponent = member.icon;
              return (
                <div
                  key={member.id}
                  className="group border border-gray-200 rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 hover:border-purple-300 relative"
                >
                  {/* Online Status */}
                  {member.isOnline && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  )}

                  {/* Profile Header */}
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-3 ring-4 ring-white shadow-lg"
                      />
                      <div className="absolute -top-1 -right-1">
                        <div className="w-6 h-6 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                          <IconComponent className="w-3 h-3 text-gray-600" />
                        </div>
                      </div>
                      {member.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{member.name}</h3>
                    <p className="text-purple-600 text-xs md:text-sm mb-1">{member.username}</p>
                    
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className={`px-2 py-1 ${member.badgeColor} text-white text-xs font-medium rounded-full`}>
                        {member.badge}
                      </span>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs md:text-sm text-gray-600 justify-center">
                      <span className="font-medium">{member.role}</span>
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-gray-600 justify-center">
                      <span>{member.company}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-xs md:text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-xs md:text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>Joined {member.joinDate}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-3 text-center">{member.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4 justify-center">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{member.followers}</div>
                      <div>Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{member.following}</div>
                      <div>Following</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{member.posts}</div>
                      <div>Posts</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all text-xs md:text-sm font-medium flex items-center justify-center space-x-1">
                      <span>Connect</span>
                      <UserPlus className="w-3 h-3" />
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMembers.map((member) => {
              const IconComponent = member.icon;
              return (
                <div
                  key={member.id}
                  className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-6 border border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                    />
                    <div className="absolute -top-1 -right-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                        <IconComponent className="w-3 h-3 text-gray-600" />
                      </div>
                    </div>
                    {member.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm md:text-base">{member.name}</h3>
                      {member.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      <span className={`px-2 py-1 ${member.badgeColor} text-white text-xs font-medium rounded-full`}>
                        {member.badge}
                      </span>
                    </div>
                    
                    <p className="text-purple-600 text-xs md:text-sm mb-1">{member.username}</p>
                    <p className="text-gray-600 text-xs md:text-sm mb-2">{member.role} at {member.company}</p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-4 text-xs text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {member.joinDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                      {member.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-center">
                    <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 mb-3">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{member.followers}</div>
                        <div>Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{member.posts}</div>
                        <div>Posts</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 justify-center">
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all text-xs md:text-sm font-medium">
                        Connect
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}