'use client';

import { useState } from 'react';
import { Search, Plus, Phone, Video, MoreHorizontal, Send, Paperclip, Smile, Image, Mic, ArrowLeft, MessageCircle, Code, Palette, TrendingUp, Database, Smartphone, Zap } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';

const conversations = [
  {
    id: 1,
    name: 'Sarah med',
    username: '@sarah_codes',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Hey! I saw your latest project, it looks amazing!',
    timestamp: '2 min ago',
    unread: 2,
    isOnline: true,
    isTyping: false,
    icon: Code,
  },
  {
    id: 2,
    name: 'Design Team',
    username: 'Group • 12 members',
    avatar: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Marcus: The new mockups are ready for review',
    timestamp: '15 min ago',
    unread: 0,
    isOnline: false,
    isTyping: true,
    icon: Palette,
    isGroup: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    username: '@emily_markets',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Thanks for the marketing insights! Really helpful',
    timestamp: '1 hour ago',
    unread: 0,
    isOnline: true,
    isTyping: false,
    icon: TrendingUp,
  },
  {
    id: 4,
    name: 'David Kim',
    username: '@david_data',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'The data analysis report is complete',
    timestamp: '3 hours ago',
    unread: 1,
    isOnline: false,
    isTyping: false,
    icon: Database,
  },
  {
    id: 5,
    name: 'Founders Circle',
    username: 'Group • 23 members',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Lisa: Excited to announce our Series A!',
    timestamp: '5 hours ago',
    unread: 5,
    isOnline: false,
    isTyping: false,
    icon: Zap,
    isGroup: true,
  },
];

const messages = [
  {
    id: 1,
    senderId: 1,
    senderName: 'Sarah med',
    senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Hey! I saw your latest project on the community feed. The UI design is absolutely stunning!',
    timestamp: '10:30 AM',
    isOwn: false,
  },
  {
    id: 2,
    senderId: 'me',
    senderName: 'You',
    senderAvatar: '',
    content: 'Thank you so much! I really appreciate the feedback. It took me weeks to get the animations just right.',
    timestamp: '10:32 AM',
    isOwn: true,
  },
  {
    id: 3,
    senderId: 1,
    senderName: 'Sarah med',
    senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The attention to detail really shows! Are you using Framer Motion for the animations?',
    timestamp: '10:33 AM',
    isOwn: false,
  },
  {
    id: 4,
    senderId: 'me',
    senderName: 'You',
    senderAvatar: '',
    content: 'Yes! Framer Motion is amazing for React animations. I also used some custom CSS for the micro-interactions.',
    timestamp: '10:35 AM',
    isOwn: true,
  },
  {
    id: 5,
    senderId: 1,
    senderName: 'Sarah med',
    senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Would love to collaborate on a project sometime! I think our skills would complement each other well',
    timestamp: '10:36 AM',
    isOwn: false,
  },
];

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConversations, setShowConversations] = useState(true);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const handleConversationSelect = (conversation: typeof conversations[0]) => {
    setSelectedConversation(conversation);
    setShowConversations(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-8rem)] flex overflow-hidden">
      <GlassCard gradient="blue" className="flex w-full overflow-hidden">
        {/* Mobile: Show conversations or chat based on state */}
        <div className={`${showConversations ? 'block' : 'hidden'} sm:block w-full sm:w-80 border-r border-white/20 flex flex-col`}>
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
                <span>Messages</span>
                <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              </h1>
              <EnhancedButton
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              >
                New
              </EnhancedButton>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60 text-sm"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
            {filteredConversations.map((conversation, index) => {
              const IconComponent = conversation.icon;
              return (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation)}
                  className={`flex items-center space-x-3 p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-white/10 animate-slide-up ${
                    selectedConversation?.id === conversation.id ? 'bg-white/20 shadow-lg' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                      <IconComponent className="w-3 h-3 text-white" />
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white text-sm sm:text-base truncate">{conversation.name}</h3>
                      <span className="text-xs text-white/60 flex-shrink-0">{conversation.timestamp}</span>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm mb-1 truncate">{conversation.username}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white/60 text-xs truncate flex-1 mr-2">
                        {conversation.isTyping ? (
                          <span className="text-green-400">Typing...</span>
                        ) : (
                          conversation.lastMessage
                        )}
                      </p>
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area - Only visible on small screens */}
        <div className={`${showConversations ? 'hidden' : 'block'} sm:hidden flex-1 flex flex-col`}>
          {/* Chat Header */}
          <div className="p-4 sm:p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowConversations(true)}
                  className="sm:hidden p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>
                <div className="relative">
                  <img
                    src={selectedConversation?.avatar}
                    alt={selectedConversation?.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                    <selectedConversation.icon className="w-2 h-2 text-white" />
                  </div>
                  {selectedConversation?.isOnline && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">{selectedConversation?.name}</h3>
                  <p className="text-white/70 text-xs sm:text-sm">
                    {selectedConversation?.isTyping ? (
                      <span className="text-green-400">Typing...</span>
                    ) : selectedConversation?.isOnline ? (
                      'Online'
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                  <Phone className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                  <Video className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                  <MoreHorizontal className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex animate-slide-up ${
                  message.isOwn ? 'justify-end' : 'justify-start'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`max-w-xs sm:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                  <div className={`${message.isOwn ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-white/10 backdrop-blur-sm border border-white/20'} rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg`}>
                    <p className={`text-sm sm:text-base ${message.isOwn ? 'text-white' : 'text-white/90'}`}>
                      {message.content}
                    </p>
                  </div>
                  <div className={`text-xs text-white/60 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                    {message.timestamp}
                  </div>
                </div>
                {!message.isOwn && (
                  <div className="order-1 mr-2 sm:mr-3">
                    <img
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-white/30"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 sm:p-6 border-t border-white/20">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                <Paperclip className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                <Image className="w-4 h-4 text-white" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60 text-sm sm:text-base"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                  <Smile className="w-4 h-4 text-white" />
                </button>
              </div>
              <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                <Mic className="w-4 h-4 text-white" />
              </button>
              <EnhancedButton
                onClick={handleSendMessage}
                variant="primary"
                size="sm"
                icon={<Send className="w-4 h-4" />}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              >
                Send
              </EnhancedButton>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}