import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Link as LinkIcon, Settings } from 'lucide-react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const isOwnProfile = currentUser?.id === user.id;
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Cover photo */}
      <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
        {isOwnProfile && (
          <button className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors">
            <Settings size={18} />
          </button>
        )}
      </div>
      
      {/* Profile info */}
      <div className="px-6 pb-6 relative">
        {/* Avatar (positioned to overlap cover photo) */}
        <div className="absolute -top-16 left-6 border-4 border-white dark:border-gray-800 rounded-full">
          <Avatar src={user.avatar} alt={user.name} size="xl" />
        </div>
        
        {/* Action buttons (positioned on the right) */}
        <div className="flex justify-end mb-4 pt-4">
          {isOwnProfile ? (
            <Link to="/settings">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          ) : (
            <Button 
              onClick={handleFollowToggle}
              variant={isFollowing ? "outline" : "primary"}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        
        {/* User info */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
          
          <p className="mt-3 text-gray-800 dark:text-gray-200">{user.bio}</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon size={16} />
              <a 
                href="#" 
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                portfolio-site.com
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Joined {user.joined}</span>
            </div>
          </div>
          
          <div className="flex gap-6 mt-5">
            <div>
              <span className="font-bold text-gray-900 dark:text-white">{user.following}</span>{' '}
              <span className="text-gray-600 dark:text-gray-400">Following</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-white">{user.followers}</span>{' '}
              <span className="text-gray-600 dark:text-gray-400">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;