import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Filter } from 'lucide-react';
import PostCard from '../components/post/PostCard';
import { Post } from '../types';
import { posts } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import { users } from '../data/mockData';

const Explore: React.FC = () => {
  const [explorePosts, setExplorePosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'trending' | 'latest' | 'photos'>('trending');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from API
    const loadPosts = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sort posts according to filter
      let filteredPosts = [...posts];
      
      switch (activeFilter) {
        case 'trending':
          // Sort by popularity (likes + comments)
          filteredPosts = filteredPosts.sort((a, b) => 
            (b.likes + b.comments) - (a.likes + a.comments)
          );
          break;
        case 'latest':
          // Sort by date
          filteredPosts = filteredPosts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'photos':
          // Only show posts with images
          filteredPosts = filteredPosts.filter(post => post.imageUrl);
          break;
      }
      
      // Filter by search query if present
      if (searchQuery) {
        filteredPosts = filteredPosts.filter(post => 
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setExplorePosts(filteredPosts);
      setIsLoading(false);
    };
    
    loadPosts();
  }, [activeFilter, searchQuery]);
  
  // Popular hashtags
  const popularHashtags = [
    '#technology',
    '#design',
    '#photography',
    '#travel',
    '#food',
    '#fitness',
    '#music',
    '#art'
  ];
  
  // Popular accounts
  const popularAccounts = users.slice(0, 4);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for posts, people, or topics"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-2 py-2 flex items-center overflow-x-auto">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'trending'
                    ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter('trending')}
              >
                <TrendingUp size={16} />
                Trending
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'latest'
                    ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter('latest')}
              >
                Latest
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'photos'
                    ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter('photos')}
              >
                Photos
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-auto"
              >
                <Filter size={16} />
                More Filters
              </button>
            </div>
          </div>
          
          {/* Posts */}
          {isLoading ? (
            // Loading state
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden p-4 animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : explorePosts.length > 0 ? (
            <div className="space-y-6">
              {explorePosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Popular hashtags */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Popular Hashtags</h3>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {popularHashtags.map((tag, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Popular accounts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Popular Accounts</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {popularAccounts.map((user) => (
                <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{user.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">@{user.username}</p>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-3 py-1 text-sm font-medium transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                Show more
              </a>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Cookies</a>
              <a href="#" className="hover:underline">Ads info</a>
            </div>
            <p>© 2025 Connect, Inc.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;