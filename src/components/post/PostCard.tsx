import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share, MoreHorizontal, Bookmark } from 'lucide-react';
import { Post, User } from '../../types';
import Avatar from '../ui/Avatar';
import { getUserById, getCommentsByPostId } from '../../data/mockData';
import Button from '../ui/Button';

interface PostCardProps {
  post: Post;
  showComments?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showComments = false }) => {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const author = getUserById(post.userId) as User;
  const comments = getCommentsByPostId(post.id);
  
  // Format date to relative time (e.g. "2 hours ago")
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

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleToggleComments = () => {
    setIsCommenting(!isCommenting);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // In a real app, this would send the comment to a backend
      // For now, we just reset the comment field
      setCommentText('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Post header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <Link to={`/profile/${author.id}`} className="flex items-center gap-3 group">
          <Avatar src={author.avatar} alt={author.name} size="md" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {author.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              @{author.username} · {getRelativeTime(post.createdAt)}
            </p>
          </div>
        </Link>
        
        {/* More options dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MoreHorizontal size={20} className="text-gray-500" />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
              <div className="py-1">
                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Report post
                </button>
                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Mute @{author.username}
                </button>
                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Block @{author.username}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Post content */}
      <div className="px-4 py-3">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.content}</p>
      </div>
      
      {/* Post image (if available) */}
      {post.imageUrl && (
        <div className="mt-2">
          <img 
            src={post.imageUrl} 
            alt="Post" 
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}
      
      {/* Post actions */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        {/* Like button */}
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 transition-colors ${
            isLiked 
              ? 'text-pink-600 dark:text-pink-500' 
              : 'text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500'
          }`}
        >
          <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          <span className="text-sm">{likeCount > 0 && likeCount}</span>
        </button>
        
        {/* Comment button */}
        <button 
          onClick={handleToggleComments}
          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-sm">{post.comments > 0 && post.comments}</span>
        </button>
        
        {/* Share button */}
        <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
          <Share size={20} />
          <span className="text-sm">{post.shares > 0 && post.shares}</span>
        </button>
        
        {/* Save button */}
        <button 
          onClick={handleSave}
          className={`flex items-center gap-1 transition-colors ${
            isSaved 
              ? 'text-blue-600 dark:text-blue-500' 
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
          }`}
        >
          <Bookmark size={20} className={isSaved ? 'fill-current' : ''} />
        </button>
      </div>
      
      {/* Comments section (conditionally visible) */}
      {(showComments || isCommenting) && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {/* Comment form */}
          <form onSubmit={handleSubmitComment} className="flex gap-2 mb-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
            <Button 
              type="submit" 
              disabled={!commentText.trim()} 
              size="sm"
            >
              Post
            </Button>
          </form>
          
          {/* Comment list */}
          {comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map(comment => {
                const commentAuthor = getUserById(comment.userId) as User;
                return (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar src={commentAuthor.avatar} alt={commentAuthor.name} size="sm" />
                    <div className="flex-1">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-sm">
                        <Link to={`/profile/${commentAuthor.id}`} className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {commentAuthor.name}
                        </Link>{' '}
                        <span className="text-gray-800 dark:text-gray-200">{comment.content}</span>
                      </div>
                      <div className="flex gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{getRelativeTime(comment.createdAt)}</span>
                        <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          Like ({comment.likes})
                        </button>
                        <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
              No comments yet. Be the first to comment!
            </p>
          )}
          
          {/* Show more comments button (if needed) */}
          {comments.length > 2 && (
            <button className="w-full text-center mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              View all {post.comments} comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;