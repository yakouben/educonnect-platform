'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Plus, 
  Users, 
  Search, 
  MoreHorizontal,
  Pin,
  Hash,
  Settings,
  Bell,
  BellOff,
  UserPlus,
  Crown,
  Shield,
  Smile,
  Paperclip,
  Image,
  Video,
  FileText,
  Link,
  Calendar,
  Archive,
  Star,
  Reply,
  Edit,
  Trash2,
  X,
  ChevronDown,
  Activity,
  Clock,
  Eye,
  MessageCircle,
  Heart,
  Share,
  Download,
  Copy,
  Flag,
  Volume2,
  VolumeX,
  Phone,
  VideoIcon,
  ScreenShare,
  Mic,
  MicOff,
  ArrowLeft,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';
import { useToast } from '@/hooks/use-toast';

interface SpaceMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  isOnline: boolean;
  status?: 'active' | 'offline';
  customStatus?: string;
}

interface Message {
  id: string;
  author: SpaceMember;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  }>;
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  isEdited?: boolean;
  replyTo?: string;
  isPinned?: boolean;
}

interface Space {
  id: string;
  name: string;
  description: string;
  type: 'open' | 'private' | 'secret';
  category: string;
  memberCount: number;
  color: string;
  members: SpaceMember[];
  tags: string[];
  owner: SpaceMember;
}

interface SpaceViewProps {
  space: Space;
  onBack: () => void;
  currentUser: SpaceMember;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Alex Rivera',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'admin',
      isOnline: true,
      status: 'active'
    },
    content: 'Hey everyone! 👋 Welcome to our Web Development Hub. Feel free to share your projects and ask questions.',
    timestamp: '10:30 AM',
    type: 'text',
    reactions: [
      { emoji: '👋', count: 5, users: ['2', '3', '4', '5', '6'] },
      { emoji: '🚀', count: 3, users: ['2', '3', '4'] }
    ],
    isPinned: true
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'Maya Patel',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'moderator',
      isOnline: true,
      status: 'active'
    },
    content: 'Just finished working on a new React component library. Would love to get some feedback! 🎨',
    timestamp: '10:45 AM',
    type: 'text',
    attachments: [
      {
        id: '1',
        name: 'component-library-demo.png',
        type: 'image/png',
        url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
        size: 2048000
      }
    ],
    reactions: [
      { emoji: '🔥', count: 8, users: ['1', '3', '4', '5', '6', '7', '8', '9'] },
      { emoji: '💯', count: 4, users: ['1', '3', '4', '5'] }
    ]
  },
  {
    id: '3',
    author: {
      id: '3',
      name: 'Jordan Kim',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'member',
      isOnline: false,
      status: 'idle'
    },
    content: 'That looks amazing Maya! The color scheme is really clean. Are you planning to open source it?',
    timestamp: '11:02 AM',
    type: 'text',
    replyTo: '2'
  },
  {
    id: '4',
    author: {
      id: '4',
      name: 'Sam Chen',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'member',
      isOnline: true,
      status: 'active'
    },
    content: 'Quick question - has anyone worked with Next.js 14 App Router? Im having some issues with server components.',
    timestamp: '11:15 AM',
    type: 'text',
    reactions: [
      { emoji: '🤔', count: 2, users: ['1', '2'] }
    ]
  }
];

export function SpaceView({ space, onBack, currentUser }: SpaceViewProps) {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const [showSpaceInfo, setShowSpaceInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      author: currentUser,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      replyTo: replyTo || undefined
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setReplyTo(null);
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          if (existingReaction.users.includes(currentUser.id)) {
            // Remove reaction
            existingReaction.count--;
            existingReaction.users = existingReaction.users.filter(id => id !== currentUser.id);
            if (existingReaction.count === 0) {
              return { ...msg, reactions: reactions.filter(r => r.emoji !== emoji) };
            }
          } else {
            // Add reaction
            existingReaction.count++;
            existingReaction.users.push(currentUser.id);
          }
        } else {
          // New reaction
          reactions.push({ emoji, count: 1, users: [currentUser.id] });
        }
        
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400';
      case 'idle': return 'bg-yellow-400';
      case 'dnd': return 'bg-red-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-3 h-3 text-yellow-400" />;
      case 'moderator': return <Shield className="w-3 h-3 text-blue-400" />;
      default: return null;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 bottom-0 z-50 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 backdrop-blur-xl">
      {/* Modern floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Enhanced Header with glass morphism */}
      <div className="relative flex items-center justify-between p-4 lg:p-6 bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 backdrop-blur-2xl border-b border-blue-700/30 shadow-xl">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="group p-3 hover:bg-blue-800/50 rounded-xl transition-all duration-300 hover:scale-110 flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-white group-hover:text-blue-300 transition-colors" />
          </button>
          
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className={`w-4 h-4 rounded-full ${space.color} shadow-lg animate-pulse flex-shrink-0`} />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg lg:text-xl font-bold text-white truncate bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {space.name}
              </h1>
              <p className="text-sm text-blue-200 hidden sm:block font-medium">{space.memberCount} members online</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Enhanced action buttons */}
          <button className="hidden sm:flex p-3 hover:bg-blue-800/50 rounded-xl transition-all duration-300 hover:scale-110 text-blue-200 hover:text-green-400 group">
            <Phone className="w-5 h-5 group-hover:animate-bounce" />
          </button>
          <button className="hidden sm:flex p-3 hover:bg-blue-800/50 rounded-xl transition-all duration-300 hover:scale-110 text-blue-200 hover:text-red-400 group">
            <VideoIcon className="w-5 h-5 group-hover:animate-bounce" />
          </button>
          
          <button
            onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
            className="hidden md:flex p-3 hover:bg-blue-800/50 rounded-xl transition-all duration-300 hover:scale-110 text-blue-200 hover:text-yellow-400"
          >
            {isNotificationEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowMembers(!showMembers)}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${showMembers ? 'text-white bg-blue-500/30 shadow-lg border border-blue-400/30' : 'text-blue-200 hover:text-white hover:bg-blue-800/50'}`}
          >
            <Users className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowSpaceInfo(!showSpaceInfo)}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${showSpaceInfo ? 'text-white bg-blue-500/30 shadow-lg border border-blue-400/30' : 'text-blue-200 hover:text-white hover:bg-blue-800/50'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 88px)' }}>
        {/* Enhanced Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Messages with modern styling */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 scrollbar-hide">
            {messages.map((message) => (
              <div key={message.id} className="group relative animate-slide-in">
                {message.isPinned && (
                  <div className="flex items-center space-x-2 mb-3 text-sm text-amber-300 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 px-4 py-2 rounded-2xl border border-amber-500/20 backdrop-blur-sm shadow-lg">
                    <Pin className="w-4 h-4" />
                    <span className="font-medium">Pinned Message</span>
                  </div>
                )}
                
                {message.replyTo && (
                  <div className="ml-12 lg:ml-16 mb-2 text-sm text-blue-300 pl-4 border-l-3 border-blue-500/50 bg-gradient-to-r from-blue-500/10 to-transparent rounded-r-xl py-2 backdrop-blur-sm">
                    <span className="font-medium">Replying to {messages.find(m => m.id === message.replyTo)?.author.name}</span>
                  </div>
                )}

                <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-blue-800/20 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-blue-700/30">
                  <div className="relative flex-shrink-0 group">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl overflow-hidden ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300">
                      <img
                        src={message.author.avatar}
                        alt={message.author.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-3 border-blue-900 shadow-lg ${getStatusColor(message.author.status || 'offline')} animate-pulse`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-bold text-white text-base lg:text-lg truncate hover:text-blue-300 transition-colors cursor-pointer">
                        {message.author.name}
                      </span>
                      {getRoleIcon(message.author.role)}
                      <span className="text-sm text-white/50 flex-shrink-0 font-medium">{message.timestamp}</span>
                      {message.isEdited && (
                        <span className="text-xs text-white/40 hidden sm:inline bg-white/10 px-2 py-0.5 rounded-full">(edited)</span>
                      )}
                    </div>

                    <div className="text-white/90 break-words text-base lg:text-lg leading-relaxed mb-3">
                      {message.content}
                    </div>

                    {/* Enhanced Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id}>
                            {attachment.type.startsWith('image/') ? (
                              <div className="relative inline-block group">
                                <img
                                  src={attachment.url}
                                  alt={attachment.name}
                                  className="max-w-full lg:max-w-lg max-h-64 lg:max-h-80 rounded-2xl object-cover cursor-pointer hover:opacity-90 transition-all duration-300 shadow-2xl ring-1 ring-white/20 hover:ring-blue-400/50"
                                />
                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xl rounded-xl p-2 border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <Download className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-2xl max-w-full lg:max-w-lg border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg group">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                  <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-white truncate">{attachment.name}</p>
                                  <p className="text-xs text-white/60 font-medium">{formatFileSize(attachment.size)}</p>
                                </div>
                                <button className="p-2 hover:bg-white/20 rounded-xl flex-shrink-0 transition-all duration-300 hover:scale-110">
                                  <Download className="w-4 h-4 text-white/70" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Enhanced Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {message.reactions.map((reaction) => (
                          <button
                            key={reaction.emoji}
                            onClick={() => handleReaction(message.id, reaction.emoji)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm transition-all duration-300 backdrop-blur-xl shadow-lg hover:scale-110 ${
                              reaction.users.includes(currentUser.id)
                                ? 'bg-gradient-to-r from-blue-500/40 to-blue-600/40 text-blue-200 border border-blue-400/50 shadow-blue-500/20'
                                : 'bg-blue-800/30 text-blue-200 hover:bg-blue-700/40 border border-blue-600/30'
                            }`}
                          >
                            <span className="text-lg">{reaction.emoji}</span>
                            <span className="font-bold">{reaction.count}</span>
                          </button>
                        ))}
                        <button
                          onClick={() => handleReaction(message.id, '👍')}
                          className="w-8 h-8 flex items-center justify-center bg-blue-800/30 hover:bg-blue-700/40 rounded-full text-blue-200 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-xl border border-blue-600/30"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Message Actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={() => setReplyTo(message.id)}
                      className="p-2 hover:bg-blue-800/40 rounded-xl text-blue-200 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                    >
                      <Reply className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReaction(message.id, '👍')}
                      className="p-2 hover:bg-blue-800/40 rounded-xl text-blue-200 hover:text-green-400 transition-all duration-300 hover:scale-110"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                    {message.author.id === currentUser.id && (
                      <>
                        <button
                          onClick={() => setEditingMessage(message.id)}
                          className="hidden sm:block p-2 hover:bg-blue-800/40 rounded-xl text-blue-200 hover:text-yellow-400 transition-all duration-300 hover:scale-110"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="hidden sm:block p-2 hover:bg-blue-800/40 rounded-xl text-blue-200 hover:text-red-400 transition-all duration-300 hover:scale-110">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="hidden lg:block p-2 hover:bg-blue-800/40 rounded-xl text-blue-200 hover:text-white transition-all duration-300 hover:scale-110">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-3 text-blue-200 text-sm p-4 bg-gradient-to-r from-blue-800/30 to-transparent rounded-2xl backdrop-blur-sm border border-blue-700/30 animate-slide-in">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="font-medium">Someone is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Reply Preview */}
          {replyTo && (
            <div className="px-4 lg:px-6 py-3 bg-gradient-to-r from-blue-800/30 via-blue-700/30 to-blue-800/30 backdrop-blur-xl border-t border-blue-700/30 animate-slide-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-sm text-blue-200 min-w-0 flex-1">
                  <Reply className="w-5 h-5 flex-shrink-0 text-blue-400" />
                  <span className="truncate font-medium">Replying to {messages.find(m => m.id === replyTo)?.author.name}</span>
                </div>
                <button
                  onClick={() => setReplyTo(null)}
                  className="text-blue-300 hover:text-white flex-shrink-0 p-2 hover:bg-blue-800/30 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Message Input */}
          <div className="p-4 lg:p-6 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-blue-900/90 backdrop-blur-2xl border-t border-blue-700/30 shadow-2xl">
            <div className="flex items-end space-x-3 lg:space-x-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <button className="group p-3 hover:bg-blue-800/50 rounded-xl transition-all duration-300 hover:scale-110 text-blue-200 hover:text-blue-300">
                    <Paperclip className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </button>
                  <button className="group p-3 hover:bg-blue-800/50 rounded-xl transition-all duration-300 hover:scale-110 text-blue-200 hover:text-green-400">
                    <Image className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="group p-3 hover:bg-blue-800/50 rounded-xl transition-all duration-300 hover:scale-110 text-blue-200 hover:text-yellow-400">
                    <Smile className="w-5 h-5 group-hover:bounce transition-transform duration-300" />
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-4 lg:px-6 py-4 lg:py-5 bg-gradient-to-r from-blue-800/30 to-blue-700/30 backdrop-blur-xl border border-blue-600/30 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none resize-none text-white placeholder-blue-300 text-base lg:text-lg leading-relaxed shadow-xl hover:border-blue-500/40 transition-all duration-300"
                    rows={1}
                    style={{ minHeight: '60px' }}
                  />
                  {/* Character count indicator */}
                  <div className="absolute bottom-2 right-3 text-xs text-blue-300 font-medium">
                    {newMessage.length}/2000
                  </div>
                </div>
              </div>
              <EnhancedButton
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                variant="primary"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 lg:px-8 py-4 lg:py-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 rounded-2xl border border-blue-400/30"
                icon={<Send className="w-5 h-5" />}
              >
                <span className="hidden sm:inline font-bold">Send</span>
              </EnhancedButton>
            </div>
          </div>
        </div>

        {/* Members Sidebar - Mobile overlay */}
        {showMembers && (
          <div className={`${
            showMembers ? 'fixed' : 'hidden'
          } lg:relative inset-y-0 right-0 w-full sm:w-80 lg:w-80 bg-blue-900/30 lg:bg-blue-900/20 backdrop-blur-md border-l border-blue-700/30 flex flex-col z-40 lg:z-auto`}>
            {/* Mobile overlay backdrop */}
            <div 
              className="fixed inset-0 bg-blue-900/50 lg:hidden"
              onClick={() => setShowMembers(false)}
            />
            
            {/* Sidebar content */}
            <div className="relative h-full flex flex-col bg-gradient-to-b from-blue-900/90 via-blue-800/90 to-blue-900/90 backdrop-blur-md lg:bg-gradient-to-b lg:from-blue-900/80 lg:via-blue-800/80 lg:to-blue-900/80 lg:backdrop-blur-md">
              <div className="p-4 border-b border-blue-700/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Members ({space.memberCount})</h3>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-200 hover:text-white p-2 hover:bg-blue-800/30 rounded-lg transition-all duration-300">
                      <UserPlus className="w-4 h-4" />
                    </button>
                    <button 
                      className="lg:hidden text-blue-200 hover:text-white p-2 hover:bg-blue-800/30 rounded-lg transition-all duration-300"
                      onClick={() => setShowMembers(false)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    className="w-full pl-10 pr-4 py-2 bg-blue-800/30 backdrop-blur-sm border border-blue-600/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder-blue-300 text-sm"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                <div className="space-y-3">
                  {/* Online Members */}
                  <div>
                    <h4 className="text-sm font-medium text-blue-200 mb-2">Online - {space.members.filter(m => m.isOnline).length}</h4>
                    <div className="space-y-2">
                      {space.members.filter(m => m.isOnline).map((member) => (
                        <div key={member.id} className="flex items-center space-x-3 p-2 hover:bg-blue-800/30 rounded-lg transition-colors group">
                          <div className="relative">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-blue-900 ${getStatusColor(member.status || 'offline')}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium text-white truncate">{member.name}</span>
                              {getRoleIcon(member.role)}
                            </div>
                            {member.customStatus && (
                              <p className="text-xs text-blue-300 truncate">{member.customStatus}</p>
                            )}
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-700/40 rounded">
                            <MoreHorizontal className="w-4 h-4 text-blue-200" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Offline Members */}
                  {space.members.filter(m => !m.isOnline).length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-200 mb-2">Offline - {space.members.filter(m => !m.isOnline).length}</h4>
                      <div className="space-y-2">
                        {space.members.filter(m => !m.isOnline).map((member) => (
                          <div key={member.id} className="flex items-center space-x-3 p-2 hover:bg-blue-800/30 rounded-lg transition-colors group opacity-60">
                            <div className="relative">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-blue-900" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-1">
                                <span className="text-sm font-medium text-white truncate">{member.name}</span>
                                {getRoleIcon(member.role)}
                              </div>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-700/40 rounded">
                              <MoreHorizontal className="w-4 h-4 text-blue-200" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Space Info Sidebar - Mobile overlay */}
        {showSpaceInfo && (
          <div className={`${
            showSpaceInfo ? 'fixed' : 'hidden'
          } lg:relative inset-y-0 right-0 w-full sm:w-80 lg:w-80 bg-blue-900/30 lg:bg-blue-900/20 backdrop-blur-md border-l border-blue-700/30 flex flex-col z-40 lg:z-auto`}>
            {/* Mobile overlay backdrop */}
            <div 
              className="fixed inset-0 bg-blue-900/50 lg:hidden"
              onClick={() => setShowSpaceInfo(false)}
            />
            
            {/* Sidebar content */}
            <div className="relative h-full flex flex-col bg-gradient-to-b from-blue-900/90 via-blue-800/90 to-blue-900/90 backdrop-blur-md lg:bg-gradient-to-b lg:from-blue-900/80 lg:via-blue-800/80 lg:to-blue-900/80 lg:backdrop-blur-md">
              <div className="p-4 border-b border-blue-700/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Space Info</h3>
                  <button 
                    className="lg:hidden text-blue-200 hover:text-white p-2 hover:bg-blue-800/30 rounded-lg transition-all duration-300"
                    onClick={() => setShowSpaceInfo(false)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                {/* Space Description */}
                <div>
                  <h4 className="text-sm font-medium text-blue-200 mb-2">About</h4>
                  <p className="text-sm text-blue-100">{space.description}</p>
                </div>

                {/* Space Stats */}
                <div>
                  <h4 className="text-sm font-medium text-blue-200 mb-2">Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Members</span>
                      <span className="text-white">{space.memberCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Messages Today</span>
                      <span className="text-white">24</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Created</span>
                      <span className="text-white">Jan 15, 2024</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-sm font-medium text-blue-200 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {space.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-800/30 text-blue-200 text-xs rounded-full border border-blue-600/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-medium text-blue-200 mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-2 p-2 hover:bg-blue-800/30 rounded-lg transition-colors text-left">
                      <Pin className="w-4 h-4 text-blue-200" />
                      <span className="text-sm text-blue-100">View Pinned Messages</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 p-2 hover:bg-blue-800/30 rounded-lg transition-colors text-left">
                      <Archive className="w-4 h-4 text-blue-200" />
                      <span className="text-sm text-blue-100">Message History</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 p-2 hover:bg-blue-800/30 rounded-lg transition-colors text-left">
                      <Settings className="w-4 h-4 text-blue-200" />
                      <span className="text-sm text-blue-100">Space Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .border-l-3 {
          border-left-width: 3px;
        }

        .border-3 {
          border-width: 3px;
        }

        /* Custom scrollbar for webkit browsers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: transform, opacity, background-color, border-color, color, fill, stroke, box-shadow;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced button hover effects */
        .enhanced-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        /* Message bubble animations */
        .message-bubble {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .message-bubble:hover {
          transform: translateX(5px);
          box-shadow: 0 8px 25px -8px rgba(59, 130, 246, 0.3);
        }

        /* Glass morphism enhancement */
        .glass-effect {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Improved focus states */
        .focus-ring:focus {
          outline: none;
          ring-width: 3px;
          ring-color: rgba(59, 130, 246, 0.5);
          ring-offset-width: 2px;
          ring-offset-color: transparent;
        }
      `}</style>
    </div>
  );
} 
