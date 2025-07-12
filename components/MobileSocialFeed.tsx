'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Play, ChevronDown, Camera, Video, Paperclip, MapPin, Shield, Crown } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';
import { useToast } from './ui/toast';

const adminPosts = [
  {
    id: 1,
    user: {
      name: 'Joinly Admin',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '2 hours ago',
      role: 'admin',
      badge: 'Platform Admin',
    },
    content: 'Welcome to our new learning platform! 🎉 We\'ve added amazing new features including AI-powered course recommendations, interactive coding challenges, and live mentorship sessions. Get ready to supercharge your learning journey!',
    media: {
      type: 'video',
      url: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2:15',
    },
    likes: 127,
    comments: 23,
    shares: 15,
    isLiked: false,
    tags: ['announcement', 'update', 'features'],
  },
  {
    id: 2,
    user: {
      name: 'Joinly Admin',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '1 day ago',
      role: 'admin',
      badge: 'Platform Admin',
    },
    content: 'New Course Alert! 📚 We just launched "Advanced Machine Learning with Python" - a comprehensive 40-hour course covering neural networks, deep learning, and practical AI applications. Early bird discount available for the next 48 hours!',
    media: {
      type: 'image',
      url: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    likes: 89,
    comments: 12,
    shares: 8,
    isLiked: true,
    tags: ['course-launch', 'machine-learning', 'discount'],
  },
  {
    id: 3,
    user: {
      name: 'Joinly Admin',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '3 days ago',
      role: 'admin',
      badge: 'Platform Admin',
    },
    content: 'Community Spotlight! 🌟 This week we\'re featuring success stories from our learners who landed their dream jobs after completing our courses. From junior developers to senior data scientists - your dedication inspires us all!',
    likes: 156,
    comments: 34,
    shares: 22,
    isLiked: false,
    tags: ['success-stories', 'community', 'inspiration'],
  },
  {
    id: 4,
    user: {
      name: 'Joinly Admin',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '5 days ago',
      role: 'admin',
      badge: 'Platform Admin',
    },
    content: 'Tech Talk Tuesday! 💻 Join us for a live session on "Building Scalable Web Applications" this Tuesday at 7 PM EST. Our senior instructors will share industry insights and answer your questions. Register now!',
    likes: 78,
    comments: 16,
    shares: 11,
    isLiked: true,
    tags: ['tech-talk', 'live-session', 'web-development'],
  },
];

export function MobileSocialFeed() {
  const [visiblePosts, setVisiblePosts] = useState(2);
  const [postStates, setPostStates] = useState(
    adminPosts.reduce((acc, post) => ({
      ...acc,
      [post.id]: { isLiked: post.isLiked, likes: post.likes }
    }), {})
  );
  const { success } = useToast();

  const handleLike = (postId: number) => {
    setPostStates(prev => ({
      ...prev,
      [postId]: {
        isLiked: !prev[postId].isLiked,
        likes: prev[postId].isLiked ? prev[postId].likes - 1 : prev[postId].likes + 1
      }
    }));
  };

  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + 2, adminPosts.length));
  };

  const handlePostAction = (action: string) => {
    success(`${action} successful!`, `Your ${action.toLowerCase()} has been processed.`);
  };

  return (
    <div className="px-4 sm:px-0">
      <GlassCard gradient="blue" className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-3">
              <span>Community Feed</span>
              <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm animate-glow">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
            </h2>
            <button className="text-white/80 hover:text-white font-medium text-sm transition-colors touch-manipulation">
              See all
            </button>
          </div>

          {/* Admin Post Creator */}
          <GlassCard className="p-4 mb-4 sm:mb-6 bg-white/5 border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium shadow-lg">
                  <Crown className="w-5 h-5" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Shield className="w-2 h-2 text-yellow-800" />
                </div>
              </div>
              <input
                type="text"
                placeholder="Share updates with the community..."
                className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30 transition-all text-white placeholder-white/60 text-base border border-white/20"
                style={{ minHeight: '44px' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-white/70">
                <button className="hover:text-white transition-colors p-2 touch-manipulation">
                  <div className="w-8 h-8 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/25 transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                </button>
                <button className="hover:text-white transition-colors p-2 touch-manipulation">
                  <div className="w-8 h-8 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/25 transition-colors">
                    <Video className="w-4 h-4" />
                  </div>
                </button>
                <button className="hover:text-white transition-colors p-2 touch-manipulation">
                  <div className="w-8 h-8 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/25 transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </div>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors touch-manipulation">
                  Draft
                </button>
                <EnhancedButton
                  variant="primary"
                  size="sm"
                  onClick={() => handlePostAction('Post')}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                >
                  Post
                </EnhancedButton>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Admin Posts */}
        <div className="divide-y divide-white/10">
          {adminPosts.slice(0, visiblePosts).map((post, index) => (
            <div key={post.id} className="p-4 sm:p-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-white text-base">{post.user.name}</h4>
                    </div>
                    <p className="text-sm text-white/70">{post.user.time}</p>
                  </div>
                </div>
                <button className="text-white/40 hover:text-white/70 transition-colors p-2 touch-manipulation">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-white/90 mb-4 text-sm sm:text-base leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white/15 backdrop-blur-sm text-white/80 rounded-full text-xs font-medium border border-white/20">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Media */}
              {post.media && (
                <div className="relative rounded-xl overflow-hidden mb-4 shadow-lg">
                  <img
                    src={post.media.url}
                    alt="Post media"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  {post.media.type === 'video' && (
                    <>
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600 ml-1" />
                      </button>
                      <div className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4 bg-black/80 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base font-medium">
                        {post.media.duration}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-all duration-200 touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10 ${
                      postStates[post.id]?.isLiked ? 'text-red-400' : 'text-white/70 hover:text-white'
                    }`}
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                      postStates[post.id]?.isLiked 
                        ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg' 
                        : 'bg-white/15 hover:bg-white/25'
                    }`}>
                      <Heart className={`w-4 h-4 text-white transition-all duration-200 ${postStates[post.id]?.isLiked ? 'fill-current scale-110' : ''}`} />
                    </div>
                    <span className="text-sm font-bold">{postStates[post.id]?.likes}</span>
                  </button>
                  <button 
                    onClick={() => handlePostAction('Comment')}
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <div className="w-8 h-8 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/25 transition-colors">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                  <button 
                    onClick={() => handlePostAction('Share')}
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors touch-manipulation p-2 -m-2 rounded-lg hover:bg-white/10"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <div className="w-8 h-8 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/25 transition-colors">
                      <Share className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold">{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < adminPosts.length && (
          <div className="p-4 sm:p-6 border-t border-white/10">
            <EnhancedButton
              onClick={loadMorePosts}
              variant="ghost"
              size="lg"
              fullWidth
              icon={<ChevronDown className="w-4 h-4" />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
            >
              Load More Updates
            </EnhancedButton>
          </div>
        )}
      </GlassCard>
    </div>
  );
}