import React, { useState } from 'react';
import { MessageCircle, MoreVertical } from 'lucide-react';
import { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userReactions, setUserReactions] = useState<Record<string, number>>(post.reactions);

  const handleReaction = (emoji: keyof PostType['reactions']) => {
    setUserReactions(prev => ({
      ...prev,
      [emoji]: prev[emoji] + 1
    }));
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const getPostTypeColor = (type: PostType['type']) => {
    switch (type) {
      case 'confession': return 'text-purple-500';
      case 'mood': return 'text-blue-500';
      case 'meme': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getPostTypeLabel = (type: PostType['type']) => {
    switch (type) {
      case 'confession': return 'Confession';
      case 'mood': return 'Mood';
      case 'meme': return 'Meme';
      default: return 'Post';
    }
  };

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.isAnonymous ? '?' : post.username[0].toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-white">
                {post.username}
              </span>
              <span className={`text-xs font-medium ${getPostTypeColor(post.type)}`}>
                {getPostTypeLabel(post.type)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{post.campus}</span>
              <span>•</span>
              <span>{formatTimeAgo(post.timestamp)}</span>
            </div>
          </div>
        </div>
        
        {/* Dropdown menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <MoreVertical size={20} />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-8 w-32 card shadow-lg z-10">
              <button className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors">
                Report
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors">
                Block
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {post.imageUrl && (
          <div className="mb-3">
            <img
              src={post.imageUrl}
              alt="Post image"
              className="w-full max-h-96 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        )}
        <p className="text-gray-900 dark:text-white leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Reactions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {Object.entries(userReactions).map(([emoji, count]) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji as keyof PostType['reactions'])}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-lg">{emoji}</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Comments */}
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm">{post.commentCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;