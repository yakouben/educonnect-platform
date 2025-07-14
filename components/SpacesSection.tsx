'use client';

import { useState, useMemo, useEffect } from 'react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';
import { useToast } from '@/hooks/use-toast';
import { SpaceView } from './SpaceView';
import { createSpace, addSpaceMember, getCategories, getCurrentUser, getUserProfile } from '@/lib/supabase';

interface SpaceMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  isOnline: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string | null;
}

interface Space {
  id: string;
  name: string;
  description: string;
  type: 'open' | 'private';
  category: string;
  memberCount: number;
  isJoined?: boolean;
  members: SpaceMember[];
  createdAt: string;
  owner: SpaceMember;
  color: string;
  tags: string[];
}

const spaces: Space[] = [
  {
    id: '1',
    name: 'Web Development Hub',
    description: 'Share projects, get feedback, and collaborate on web development. From React to Node.js, discuss the latest in web tech.',
    type: 'open',
    category: 'development',
    memberCount: 234,
    isJoined: true,
    createdAt: '2024-01-15',
    color: 'bg-blue-500',
    tags: ['react', 'nodejs', 'javascript'],
    owner: { id: '1', name: 'Alex Rivera', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'admin', isOnline: true },
    members: [
      { id: '1', name: 'Alex Rivera', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'admin', isOnline: true },
      { id: '2', name: 'Maya Patel', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'moderator', isOnline: false },
      { id: '3', name: 'Jordan Kim', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'member', isOnline: true }
    ]
  },
  {
    id: '2',
    name: 'Design Critique',
    description: 'Get constructive feedback on your design work. Share UI/UX designs and get valuable insights from design professionals.',
    type: 'private',
    category: 'design',
    memberCount: 89,
    isJoined: false,
    createdAt: '2024-01-12',
    color: 'bg-purple-500',
    tags: ['ui', 'ux', 'design'],
    owner: { id: '4', name: 'Sophie Chen', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'admin', isOnline: true },
    members: []
  },
  {
    id: '3',
    name: 'Startup Founders',
    description: 'Connect with fellow entrepreneurs, share experiences, and get advice on building and scaling your startup.',
    type: 'private',
    category: 'business',
    memberCount: 156,
    isJoined: true,
    createdAt: '2024-01-10',
    color: 'bg-green-500',
    tags: ['startup', 'entrepreneurship', 'business'],
    owner: { id: '5', name: 'Marcus Johnson', avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'admin', isOnline: false },
    members: []
  }
];

const defaultCategories = [
  { id: 'development', name: 'Development', description: 'Software development and programming', color: 'bg-blue-500', icon: '💻' },
  { id: 'design', name: 'Design', description: 'UI/UX design and creative work', color: 'bg-purple-500', icon: '🎨' },
  { id: 'business', name: 'Business', description: 'Business strategy and entrepreneurship', color: 'bg-green-500', icon: '💼' },
  { id: 'education', name: 'Education', description: 'Learning and teaching', color: 'bg-orange-500', icon: '📚' },
  { id: 'community', name: 'Community', description: 'General community discussions', color: 'bg-pink-500', icon: '👥' }
];

const categories = [
  { id: 'all', label: 'All Spaces', count: spaces.length },
  { id: 'joined', label: 'My Spaces', count: spaces.filter(s => s.isJoined).length },
  { id: 'development', label: 'Development', count: spaces.filter(s => s.category === 'development').length },
  { id: 'design', label: 'Design', count: spaces.filter(s => s.category === 'design').length },
  { id: 'business', label: 'Business', count: spaces.filter(s => s.category === 'business').length },
  { id: 'education', label: 'Education', count: spaces.filter(s => s.category === 'education').length },
  { id: 'community', label: 'Community', count: spaces.filter(s => s.category === 'community').length }
];

export function SpacesSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<Space | null>(null);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isCreating, setIsCreating] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [categoryInput, setCategoryInput] = useState('');
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const { toast } = useToast();
  
  const [newSpace, setNewSpace] = useState({
    name: '',
    description: '',
    type: 'open' as 'open' | 'private',
    category_name: '',
    color: 'bg-blue-500',
    tags: [] as string[]
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    category_name: ''
  });

  // Load user and categories on component mount
  useEffect(() => {
    loadUserAndCategories();
  }, []);

  const loadUserAndCategories = async () => {
    try {
      // Get current user
      const user = await getCurrentUser();
      setCurrentUser(user);

      if (user) {
        // Get user profile
        const { data: profile, error: profileError } = await getUserProfile(user.id);
        if (profile) {
          setUserProfile(profile);
        }
      }

      // Load categories from database
      const { data: categoriesData, error: categoriesError } = await getCategories();
      if (categoriesData && categoriesData.length > 0) {
        setCategories(categoriesData);
        // Set first category as default
        setNewSpace(prev => ({ ...prev, category_name: categoriesData[0].name }));
        setCategoryInput(categoriesData[0].name);
      } else {
        // Fallback to default categories
        setNewSpace(prev => ({ ...prev, category_name: 'Development' }));
        setCategoryInput('Development');
      }
    } catch (error) {
      console.error('Error loading user and categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories. Using default values.',
        variant: 'destructive'
      });
    }
  };

  // Filter categories based on input
  const handleCategoryInputChange = (value: string) => {
    setCategoryInput(value);
    setNewSpace({ ...newSpace, category_name: value });
    
    if (value.trim()) {
      const filtered = categories.filter(cat => 
        cat.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowCategorySuggestions(true);
    } else {
      setFilteredCategories([]);
      setShowCategorySuggestions(false);
    }
  };

  // Select category from suggestions
  const handleCategorySelect = (categoryName: string) => {
    setCategoryInput(categoryName);
    setNewSpace({ ...newSpace, category_name: categoryName });
    setShowCategorySuggestions(false);
  };

  // Current user (in a real app, this would come from auth context)
  const defaultUser: SpaceMember = {
    id: '7',
    name: 'You',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'member',
    isOnline: true,
  };

  const validateForm = () => {
    const errors = {
      name: '',
      description: '',
      category_name: ''
    };

    if (!newSpace.name.trim()) {
      errors.name = 'Space name is required';
    } else if (newSpace.name.length < 3) {
      errors.name = 'Space name must be at least 3 characters';
    }

    if (!newSpace.description.trim()) {
      errors.description = 'Description is required';
    } else if (newSpace.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }

    if (!newSpace.category_name.trim()) {
      errors.category_name = 'Category is required';
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  const handleCreateSpace = async () => {
    console.log('🚀 Form submitted!');
    console.log('Form data:', newSpace);
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }
    console.log('✅ Form validation passed');

    // For development - create mock user if not authenticated
    let effectiveUser = currentUser;
    let effectiveProfile = userProfile;
    
    if (!currentUser || !userProfile) {
      console.log('⚠️ No authentication - using mock user for development');
      effectiveUser = { id: 'mock-user-id' };
      effectiveProfile = { 
        id: 'mock-profile-id', 
        name: 'Development User',
        email: 'dev@example.com'
      };
    }
    
    console.log('✅ Using user:', { effectiveUser, effectiveProfile });

    setIsCreating(true);
    console.log('🔄 Creating space...');

    try {
      // Find existing category or use the first one as fallback
      const existingCategory = categories.find(cat => 
        cat.name.toLowerCase() === newSpace.category_name.toLowerCase()
      );
      console.log('📂 Category found:', existingCategory);

      // Create space in database
      const { data: spaceData, error: spaceError } = await createSpace({
        name: newSpace.name.trim(),
        description: newSpace.description.trim(),
        type: newSpace.type,
        category_id: existingCategory?.id || categories[0].id,
        color: newSpace.color,
        tags: newSpace.tags,
        owner_id: effectiveProfile.id
      });

      console.log('💾 Space creation result:', { spaceData, spaceError });

      if (spaceError) {
        throw spaceError;
      }

      if (spaceData) {
        console.log('✅ Space created successfully:', spaceData);
        
        // Add the creator as an admin member
        const { error: memberError } = await addSpaceMember(spaceData.id, effectiveProfile.id, 'admin');
        
        if (memberError) {
          console.error('⚠️ Error adding space member:', memberError);
          // Don't fail the entire operation, just log the error
        } else {
          console.log('✅ Space member added successfully');
        }

        toast({
          title: 'Space Created!',
          description: `${newSpace.name} has been created successfully.`,
          variant: 'default'
        });

        // Reset form
        setNewSpace({
          name: '',
          description: '',
          type: 'open',
          category_name: categories.length > 0 ? categories[0].name : 'Development',
          color: 'bg-blue-500',
          tags: []
        });
        setCategoryInput(categories.length > 0 ? categories[0].name : 'Development');
        setFormErrors({ name: '', description: '', category_name: '' });
        setShowCategorySuggestions(false);
        setShowCreateModal(false);

        // TODO: Refresh spaces list from database
        // For now, we'll just show the success message
      }
    } catch (error: any) {
      console.error('Error creating space:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create space. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Filter spaces based on category and search
  const filteredSpaces = useMemo(() => {
    let filtered = spaces;
    
    // Filter by category
    if (activeCategory === 'joined') {
      filtered = filtered.filter(space => space.isJoined);
    } else if (activeCategory !== 'all') {
      filtered = filtered.filter(space => space.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(space => 
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [activeCategory, searchQuery]);

  const handleJoinSpace = (spaceId: string) => {
    toast({
      title: 'Space Joined!',
      description: 'You have successfully joined the space.',
      variant: 'default'
    });
  };

  const handleLeaveSpace = (spaceId: string) => {
    toast({
      title: 'Left Space',
      description: 'You have left the space.',
      variant: 'default'
    });
  };

  const handleOpenSpace = (space: Space) => {
    setCurrentSpace(space);
  };

  const handleBackToSpaces = () => {
    setCurrentSpace(null);
  };

  // If a space is selected, show the SpaceView
  if (currentSpace) {
    return (
      <SpaceView
        space={currentSpace}
        onBack={handleBackToSpaces}
        currentUser={defaultUser}
      />
    );
  }

  const colorOptions = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500',
    'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <GlassCard gradient="blue" className="overflow-hidden">
        <div className="p-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-bold text-white">Community Spaces</h1>
                <p className="text-white/70 text-sm">Discover and join spaces that match your interests</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
                >
                  List
                </button>
              </div>
              
              <EnhancedButton
                onClick={() => setShowCreateModal(true)}
                variant="primary"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
              >
                Create Space
              </EnhancedButton>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60"
              />
            </div>
            
            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              <span>Filters</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Spaces Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredSpaces.map((space, index) => (
          <GlassCard 
              key={space.id}
            className={`group cursor-pointer transition-all duration-200 hover:scale-[1.02] ${viewMode === 'list' ? 'w-full' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
            <div className="p-6">
              {/* Space Header */}
              <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${space.color} shadow-lg`} />
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="opacity-0 group-hover:opacity-100 px-3 py-1 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm text-white/70 text-sm">
                    ⋯
                  </button>
                </div>
              </div>

              {/* Space Info */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-bold text-white text-lg">{space.name}</h3>
                  <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <span className="text-xs text-white/80 capitalize">{space.type}</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm line-clamp-3 mb-3">{space.description}</p>
              </div>

              {/* Space Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <div className="flex items-center space-x-1">
                    <span>{space.memberCount} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{space.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {space.isJoined ? (
                  <>
                    <EnhancedButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenSpace(space)}
                      className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
                    >
                      Open
                    </EnhancedButton>
                    <EnhancedButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLeaveSpace(space.id)}
                      className="px-3"
                    >
                      Settings
                    </EnhancedButton>
                  </>
                ) : (
                  <EnhancedButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleJoinSpace(space.id)}
                    className="flex-1 bg-blue-500/80 hover:bg-blue-500 backdrop-blur-sm"
                  >
                    {space.type === 'private' ? 'Request to Join' : 'Join Space'}
                  </EnhancedButton>
                )}
              </div>
            </div>
          </GlassCard>
          ))}
        </div>

      {/* Empty State */}
      {filteredSpaces.length === 0 && (
        <GlassCard className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white/60">#</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No spaces found</h3>
          <p className="text-white/60 mb-4">Try adjusting your search or filters, or create a new space!</p>
          <EnhancedButton
            onClick={() => setShowCreateModal(true)}
            variant="primary"
            className="bg-blue-500/80 hover:bg-blue-500"
          >
            Create Your First Space
          </EnhancedButton>
      </GlassCard>
      )}

      {/* Create Space Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Create a New Space</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                ✕
              </button>
            </div>

              <div className="space-y-6">
                {/* Space Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Space Name *</label>
                  <input
                    type="text"
                    value={newSpace.name}
                    onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                      placeholder="Enter space name"
                      className={`w-full px-3 py-2 bg-white/10 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60 ${
                        formErrors.name ? 'border-red-500' : 'border-white/20'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Category *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={categoryInput}
                        onChange={(e) => handleCategoryInputChange(e.target.value)}
                        onFocus={() => {
                          if (categoryInput.trim()) {
                            setShowCategorySuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          // Delay hiding suggestions to allow clicking on them
                          setTimeout(() => setShowCategorySuggestions(false), 200);
                        }}
                        placeholder="Enter or select a category"
                        className={`w-full px-3 py-2 bg-white/10 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none text-white placeholder-white/60 ${
                          formErrors.category_name ? 'border-red-500' : 'border-white/20'
                        }`}
                      />
                      
                      {/* Category Suggestions Dropdown */}
                      {showCategorySuggestions && filteredCategories.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-gray-800/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl max-h-40 overflow-y-auto">
                          {filteredCategories.map((category) => (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => handleCategorySelect(category.name)}
                              className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center space-x-2 text-white/90 text-sm"
                            >
                              <span className="text-lg">{category.icon}</span>
                              <div>
                                <div className="font-medium">{category.name}</div>
                                {category.description && (
                                  <div className="text-xs text-white/60">{category.description}</div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {formErrors.category_name && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.category_name}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Description *</label>
                  <textarea
                    value={newSpace.description}
                    onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                    placeholder="Describe what this space is about..."
                    rows={4}
                    className={`w-full px-3 py-2 bg-white/10 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none resize-none text-white placeholder-white/60 ${
                      formErrors.description ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {formErrors.description && (
                    <p className="text-red-400 text-xs mt-1">{formErrors.description}</p>
                  )}
              </div>

              {/* Color Selection */}
              <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Space Color</label>
                  <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewSpace({ ...newSpace, color })}
                        className={`w-8 h-8 rounded-full ${color} ${
                          newSpace.color === color ? 'ring-2 ring-white/40 scale-110' : ''
                        } shadow-lg transition-all duration-200 hover:scale-105`}
                    />
                  ))}
                </div>
              </div>

                {/* Privacy Settings */}
              <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">Privacy & Access</label>
                  <div className="space-y-3">
                    {(['open', 'private'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewSpace({ ...newSpace, type })}
                        className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-colors backdrop-blur-sm ${
                        newSpace.type === type
                          ? 'border-white/40 bg-white/20'
                          : 'border-white/20 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <span className="text-xs text-white/80 capitalize">{type.charAt(0)}</span>
                      </div>
                        <div className="text-left flex-1">
                          <div className="font-medium text-sm capitalize text-white">{type} Space</div>
                        <div className="text-xs text-white/60">
                            {type === 'open' && 'Anyone can see and join this space'}
                            {type === 'private' && 'Members need to be invited or request to join'}
                          </div>
                        </div>
                        {newSpace.type === type && (
                          <span className="text-green-300 text-lg">✓</span>
                        )}
                    </button>
                  ))}
                </div>
              </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-white/20">
                  <EnhancedButton
                  onClick={() => setShowCreateModal(false)}
                    variant="ghost"
                    className="flex-1"
                >
                  Cancel
                  </EnhancedButton>
                  <EnhancedButton
                    onClick={handleCreateSpace}
                    variant="primary"
                    className="flex-1 bg-blue-500/80 hover:bg-blue-500"
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating...' : 'Create Space'}
                  </EnhancedButton>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}