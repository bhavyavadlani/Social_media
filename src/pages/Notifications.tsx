import React, { useState, useEffect } from 'react';
import { Bell, MessageCircle, User, Heart } from 'lucide-react';
import { Notification } from '../types';
import { notifications, getUserById } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import { Link } from 'react-router-dom';

const Notifications: React.FC = () => {
  const [userNotifications, setUserNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would filter to current user's notifications
      setUserNotifications(notifications);
      setIsLoading(false);
    };
    
    loadNotifications();
  }, []);
  
  // Helper to get the appropriate icon for the notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart size={18} className="text-pink-500" />;
      case 'comment':
        return <MessageCircle size={18} className="text-blue-500" />;
      case 'follow':
        return <User size={18} className="text-green-500" />;
      case 'message':
        return <MessageCircle size={18} className="text-indigo-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };
  
  // Format date to relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo`;
    
    const years = Math.floor(days / 365);
    return `${years}y`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        </div>
        
        {isLoading ? (
          // Loading skeleton
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : userNotifications.length > 0 ? (
          // Notifications list
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {userNotifications.map(notification => {
              const sourceUser = getUserById(notification.sourceUserId);
              
              if (!sourceUser) return null;
              
              return (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    !notification.read ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar src={sourceUser.avatar} alt={sourceUser.name} size="md" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link 
                          to={`/profile/${sourceUser.id}`}
                          className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {sourceUser.name}
                        </Link>
                        <span className="text-gray-600 dark:text-gray-400">
                          {notification.content}
                        </span>
                      </div>
                      
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        {getNotificationIcon(notification.type)}
                        <span>{getRelativeTime(notification.createdAt)}</span>
                      </div>
                    </div>
                    
                    {/* Notification state indicator */}
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Empty state
          <div className="py-12 px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <Bell size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notifications yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              When someone interacts with your posts or profile, you'll see their activity here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;