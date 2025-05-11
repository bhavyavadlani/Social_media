import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/profile/ProfileHeader';
import PostCard from '../components/post/PostCard';
import { User, Post } from '../types';
import { getUserById, getPostsByUserId } from '../data/mockData';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data
    const loadUserData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (userId) {
        const userData = getUserById(userId);
        if (userData) {
          setUser(userData);
          
          // Get user's posts
          const posts = getPostsByUserId(userId);
          setUserPosts(posts);
        }
      }
      
      setIsLoading(false);
    };
    
    loadUserData();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl"></div>
          <div className="bg-white dark:bg-gray-800 rounded-b-xl p-6 pb-24 relative">
            <div className="absolute -top-16 left-6 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="mt-16 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User not found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">The user you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-6">
        {/* Profile header */}
        <ProfileHeader user={user} />
        
        {/* Tabs navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
            <button
              className={`py-4 font-medium text-center transition-colors ${
                activeTab === 'posts'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
            <button
              className={`py-4 font-medium text-center transition-colors ${
                activeTab === 'media'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('media')}
            >
              Media
            </button>
            <button
              className={`py-4 font-medium text-center transition-colors ${
                activeTab === 'likes'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('likes')}
            >
              Likes
            </button>
          </div>
        </div>
        
        {/* Posts/content based on active tab */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  When {user.name.split(' ')[0]} posts something, you'll see it here.
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'media' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="grid grid-cols-3 gap-4">
              {userPosts
                .filter(post => post.imageUrl)
                .map(post => (
                  <div key={post.id} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt="Media content" 
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                    />
                  </div>
                ))}
              
              {userPosts.filter(post => post.imageUrl).length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    No media posts yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'likes' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Posts liked by {user.name} will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;