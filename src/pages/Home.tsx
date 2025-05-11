import React, { useState, useEffect } from 'react';
import { Sparkles, Users } from 'lucide-react';
import PostCard from '../components/post/PostCard';
import CreatePostCard from '../components/post/CreatePostCard';
import { Post } from '../types';
import { posts } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import { users } from '../data/mockData';

const Home: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'following' | 'discover'>('following');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from API
    const loadPosts = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set posts - in a real app this would be from an API
      setFeedPosts(posts);
      setIsLoading(false);
    };
    
    loadPosts();
  }, [activeTab]);
  
  // Sample trending topics
  const trendingTopics = [
    { name: 'Technology', posts: 5420 },
    { name: 'Design', posts: 3250 },
    { name: 'Politics', posts: 2980 },
    { name: 'Sports', posts: 2145 },
    { name: 'Climate', posts: 1876 }
  ];
  
  // People to follow
  const suggestedUsers = users.slice(0, 3);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content (feed) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create post card */}
          <CreatePostCard />
          
          {/* Feed tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
              <button
                className={`py-4 font-medium text-center flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'following'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('following')}
              >
                <Users size={18} />
                Following
              </button>
              <button
                className={`py-4 font-medium text-center flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'discover'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('discover')}
              >
                <Sparkles size={18} />
                Discover
              </button>
            </div>
          </div>
          
          {/* Feed content */}
          {isLoading ? (
            // Loading state skeleton
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
          ) : (
            // Actual posts
            <div className="space-y-6">
              {feedPosts.length > 0 ? (
                feedPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No posts to show
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start following people to see their posts in your feed or check the Discover tab.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Trending topics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Trending Topics</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <h4 className="font-medium text-gray-900 dark:text-white">{topic.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{topic.posts.toLocaleString()} posts</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                Show more
              </a>
            </div>
          </div>
          
          {/* Who to follow */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Who to Follow</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {suggestedUsers.map((user) => (
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

export default Home;