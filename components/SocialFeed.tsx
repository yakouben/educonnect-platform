'use client';

import { Heart, MessageCircle, Share, MoreHorizontal, Play } from 'lucide-react';

const posts = [
  {
    id: 1,
    user: {
      name: 'Kina Rally',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '03 June at 08:02 AM',
    },
    content: 'Hello from Bali! Im a traveling content creator and Im very excited to join the community!',
    media: {
      type: 'video',
      url: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '00:49',
    },
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    user: {
      name: 'Robert Fox',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      time: '2 hours ago',
    },
    content: 'Just completed the Advanced React course! The projects were challenging but so rewarding. Thank you to all the instructors! 🎉',
    likes: 42,
    comments: 15,
    shares: 7,
  },
];

export function SocialFeed() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Community Feed</h2>
        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
          See all
        </button>
      </div>

      {/* Create Post */}
      <div className="border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
            JD
          </div>
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-50 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-500">
            <button className="hover:text-purple-600 transition-colors">📷</button>
            <button className="hover:text-purple-600 transition-colors">🎥</button>
            <button className="hover:text-purple-600 transition-colors">📎</button>
            <button className="hover:text-purple-600 transition-colors">📍</button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Draft
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                  <p className="text-sm text-gray-500">{post.user.time}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Post Content */}
            <p className="text-gray-800 mb-4">{post.content}</p>

            {/* Media */}
            {post.media && (
              <div className="relative rounded-xl overflow-hidden mb-4">
                <img
                  src={post.media.url}
                  alt="Post media"
                  className="w-full h-64 object-cover"
                />
                {post.media.type === 'video' && (
                  <>
                    <div className="absolute inset-0 bg-black/20" />
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 ml-1" />
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
                <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                  <Share className="w-5 h-5" />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
