import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const PostCard = ({ post, onUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return date.toLocaleDateString();
  };

  const handleLike = async () => {
    try {
      if (liked) {
        setLiked(false);
        await supabase
          .from('posts')
          .update({ likes_count: (post.likes_count || 0) - 1 })
          .eq('id', post.id);
      } else {
        setLiked(true);
        await supabase
          .from('posts')
          .update({ likes_count: (post.likes_count || 0) + 1 })
          .eq('id', post.id);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border mb-6">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {post.user_metadata?.first_name?.[0] || 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {post.user_metadata?.first_name || 'User'} {post.user_metadata?.last_name || ''}
            </h3>
            <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
              liked 
                ? 'text-red-600 hover:text-red-700' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            <span className="text-lg">{liked ? '❤️' : '🤍'}</span>
            <span>{post.likes_count || 0} likes</span>
          </button>
          
          <button
            onClick={toggleComments}
            className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <span className="text-lg">💬</span>
            <span>{post.comments_count || 0} comments</span>
          </button>
        </div>
      </div>

      {/* Comments Section Placeholder */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mt-3 text-center text-gray-500">
            <p>Comments feature coming soon!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
