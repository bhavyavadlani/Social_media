import React, { useState, useRef } from 'react';
import { Image, Smile, MapPin, Calendar, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

const CreatePostCard: React.FC = () => {
  const { currentUser } = useAuth();
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim() && !selectedImage) return;
    
    // Simulate posting
    setIsLoading(true);
    
    // In a real app, this would send the post to a backend
    setTimeout(() => {
      setPostContent('');
      setSelectedImage(null);
      setIsLoading(false);
      
      // Refresh the feed or add the new post to the list
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!currentUser) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200">
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="flex gap-3">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
            <div className="flex-1">
              <textarea
                placeholder="What's happening?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full min-h-[80px] bg-transparent border-none resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base"
              />
              
              {/* Preview selected image */}
              {selectedImage && (
                <div className="relative mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img 
                    src={selectedImage} 
                    alt="Post preview" 
                    className="w-full max-h-[300px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex gap-2">
            {/* Image upload button */}
            <button
              type="button"
              onClick={triggerFileInput}
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Image size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            {/* Emoji picker button */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Smile size={20} />
            </button>
            
            {/* Location button */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <MapPin size={20} />
            </button>
            
            {/* Schedule post button */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Calendar size={20} />
            </button>
          </div>
          
          <Button
            type="submit"
            disabled={(!postContent.trim() && !selectedImage) || isLoading}
            isLoading={isLoading}
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostCard;