'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Play, ChevronDown, Camera, Video, Paperclip, MapPin, Image } from 'lucide-react';

const posts = [
  {
    id: 1,
    user: {
      name: 'Kina Rally',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '03 June at 08:02 AM',
      verified: true,
    },
    content: 'Hello from Bali! I\'m a traveling content creator and I\'m very excited to join the community!',
    media: {
      type: 'video',
      url: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '00:49',
    },
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
  },
  {
    id: 2,
    user: {
      name: 'Robert Fox',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '2 hours ago',
      verified: false,
    },
    content: 'Just completed the Advanced React course! The projects were challenging but so rewarding. Thank you to all the instructors!',
    likes: 42,
    comments: 15,
    shares: 7,
    isLiked: true,
  },
  {
    id: 3,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '4 hours ago',
      verified: true,
    },
    content: 'Working on a new design system for our startup. The color theory course really helped me understand the psychology behind color choices!',
    media: {
      type: 'image',
      url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    likes: 67,
    comments: 23,
    shares: 12,
    isLiked: false,
  },
  {
    id: 4,
    user: {
      name: 'Marcus Chen',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '6 hours ago',
      verified: false,
    },
    content: 'Data visualization tip: Always start with your audience in mind. What story are you trying to tell? Here\'s a quick example from my latest project.',
    likes: 89,
    comments: 31,
    shares: 18,
    isLiked: true,
  },
];

export function MobileSocialFeed() {
  const [visiblePosts, setVisiblePosts] = useState(2);
  const [postStates, setPostStates] = useState(
    posts.reduce((acc, post) => ({
      ...acc,
      [post.id]: { isLiked: post.isLiked, likes: post.likes }
    }), {})
  );

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
    setVisiblePosts(prev => Math.min(prev + 2, posts.length));
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="bg-white rounded-none sm:rounded-2xl shadow-sm border-0 sm:border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center space-x-3">
              <span>Community Feed</span>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
            </h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors touch-manipulation">
              See all
            </button>
          </div>

          {/* Create Post */}
          <div className="border border-gray-200 rounded-xl p-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 bg-gray-50 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base"
                style={{ minHeight: '44px' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-500">
                <button className="hover:text-purple-600 transition-colors p-2 touch-manipulation">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </button>
                <button className="hover:text-purple-600 transition-colors p-2 touch-manipulation">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <Video className="w-3 h-3 text-white" />
                  </div>
                </button>
                <button className="hover:text-purple-600 transition-colors p-2 touch-manipulation">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <Paperclip className="w-3 h-3 text-white" />
                  </div>
                </button>
                <button className="hover:text-purple-600 transition-colors p-2 touch-manipulation">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation">
                  Draft
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors touch-manipulation">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="divide-y divide-gray-100">
          {posts.slice(0, visiblePosts).map((post) => (
            <div key={post.id} className="p-4 sm:p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{post.user.name}</h4>
                      {post.user.verified && (
                        <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">{post.user.time}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors p-2 touch-manipulation">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-4 text-sm sm:text-base leading-relaxed">{post.content}</p>

              {/* Media */}
              {post.media && (
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img
                    src={post.media.url}
                    alt="Post media"
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  {post.media.type === 'video' && (
                    <>
                      <div className="absolute inset-0 bg-black/20" />
                      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors touch-manipulation">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5" />
                        </div>
                      </button>
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {post.media.duration}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors touch-manipulation p-2 -m-2 ${
                      postStates[post.id]?.isLiked ? 'text-red-500' : 'hover:text-red-500'
                    }`}
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      postStates[post.id]?.isLiked 
                        ? 'bg-gradient-to-br from-red-400 to-red-600' 
                        : 'bg-gradient-to-br from-gray-300 to-gray-400'
                    }`}>
                      <Heart className={`w-3 h-3 text-white ${postStates[post.id]?.isLiked ? 'fill-current' : ''}`} />
                    </div>
                    <span className="text-sm font-medium">{postStates[post.id]?.likes}</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 hover:text-blue-500 transition-colors touch-manipulation p-2 -m-2"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 hover:text-green-500 transition-colors touch-manipulation p-2 -m-2"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Share className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < posts.length && (
          <div className="p-4 sm:p-6 border-t border-gray-100">
            <button
              onClick={loadMorePosts}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-200 font-medium touch-manipulation"
            >
              <span>Load More Posts</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}