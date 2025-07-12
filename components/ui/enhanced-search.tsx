'use client';

import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { Search, X, Filter, Clock, Trending, Hash } from 'lucide-react';
import { GlassCard } from './glass-card';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'member' | 'space' | 'message';
  thumbnail?: string;
  category?: string;
}

interface EnhancedSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
  showFilters?: boolean;
  recentSearches?: string[];
  trendingSearches?: string[];
}

export function EnhancedSearch({
  placeholder = "Search courses, members, spaces...",
  onSearch,
  onResultSelect,
  className,
  showFilters = true,
  recentSearches = [],
  trendingSearches = [],
}: EnhancedSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search results - replace with actual search logic
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Advanced React & Next.js Mastery',
      description: 'Complete guide to modern React development',
      type: 'course',
      category: 'Development',
    },
    {
      id: '2',
      title: 'Digital Marketing & Growth Hacking',
      description: 'Learn growth strategies and marketing techniques',
      type: 'course',
      category: 'Marketing',
    },
    {
      id: '3',
      title: 'Alex Rivera',
      description: 'Senior Full-Stack Developer',
      type: 'member',
    },
    {
      id: '4',
      title: 'Web Development Community',
      description: 'Connect with fellow developers',
      type: 'space',
    },
  ];

  const filters = [
    { id: 'all', label: 'All', count: 45 },
    { id: 'courses', label: 'Courses', count: 23 },
    { id: 'members', label: 'Members', count: 12 },
    { id: 'spaces', label: 'Spaces', count: 8 },
    { id: 'messages', label: 'Messages', count: 2 },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    onSearch?.(value);
  };

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    onResultSelect?.(result);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={searchRef} className={cn('relative w-full max-w-2xl', className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full pl-11 pr-12 py-3 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200 shadow-sm hover:shadow-md',
            'dark:bg-gray-800/80 dark:border-gray-700 dark:text-white',
            'placeholder:text-gray-500 dark:placeholder:text-gray-400'
          )}
        />
        
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <GlassCard className="absolute top-full mt-2 w-full max-h-[500px] overflow-hidden z-50">
          <div className="p-4">
            {/* Filters */}
            {showFilters && (
              <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-gray-200/50">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={cn(
                        'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
                        activeFilter === filter.id
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                      )}
                    >
                      {filter.label} {filter.count > 0 && `(${filter.count})`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-500">Searching...</span>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && query && results.length > 0 && (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Results ({results.length})
                </h3>
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      result.type === 'course' && 'bg-blue-100 text-blue-600',
                      result.type === 'member' && 'bg-green-100 text-green-600',
                      result.type === 'space' && 'bg-purple-100 text-purple-600',
                      result.type === 'message' && 'bg-orange-100 text-orange-600'
                    )}>
                      {result.type === 'course' && '📚'}
                      {result.type === 'member' && '👤'}
                      {result.type === 'space' && '🏠'}
                      {result.type === 'message' && '💬'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {result.description}
                      </p>
                    </div>
                    {result.category && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {result.category}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && query && results.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">🔍</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No results found for "{query}"
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try different keywords or check the spelling
                </p>
              </div>
            )}

            {/* Recent/Trending Searches */}
            {!query && (recentSearches.length > 0 || trendingSearches.length > 0) && (
              <div className="space-y-4">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <h3 className="text-sm font-medium text-gray-500">Recent searches</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {trendingSearches.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Trending className="h-4 w-4 text-gray-400" />
                      <h3 className="text-sm font-medium text-gray-500">Trending</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
                        >
                          <Hash className="h-3 w-3" />
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </GlassCard>
      )}
    </div>
  );
} 