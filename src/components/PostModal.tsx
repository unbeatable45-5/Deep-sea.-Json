import React, { useState } from 'react';
import { X, Image, Type } from 'lucide-react';
import { Campus, NewPost } from '../types';

interface PostModalProps {
  campuses: Campus[];
  onClose: () => void;
  onSubmit: (post: NewPost) => void;
}

const PostModal: React.FC<PostModalProps> = ({ campuses, onClose, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'meme'>('text');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [username, setUsername] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState(campuses[0]?.shortName || '');
  const [postType, setPostType] = useState<'text' | 'confession' | 'mood'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || (!isAnonymous && !username.trim()) || !selectedCampus) {
      return;
    }

    const newPost: NewPost = {
      type: activeTab,
      content: content.trim(),
      imageUrl: activeTab === 'meme' ? imageUrl : undefined,
      username: username.trim(),
      isAnonymous,
      campus: selectedCampus,
      postType,
    };

    onSubmit(newPost);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary
      // For demo, we'll use a placeholder URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const emojis = ['😂', '😭', '😍', '🔥', '💀', '✨', '💯', '👀', '🤔', '❤️'];

  const insertEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-800 rounded-t-xl sm:rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-100">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Post a Status
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-dark-100">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'text'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-600 dark:text-gray-400'
            }`}
          >
            <Type size={16} className="inline mr-2" />
            Text Post
          </button>
          <button
            onClick={() => setActiveTab('meme')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'meme'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-600 dark:text-gray-400'
            }`}
          >
            <Image size={16} className="inline mr-2" />
            Meme Post
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Post Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Post Type
            </label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value as 'text' | 'confession' | 'mood')}
              className="input"
            >
              <option value="text">Regular Post</option>
              <option value="confession">Confession</option>
              <option value="mood">Mood</option>
            </select>
          </div>

          {/* Image Upload for Meme Tab */}
          {activeTab === 'meme' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Meme
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {imageUrl && (
                <div className="mt-2">
                  <img src={imageUrl} alt="Preview" className="w-full max-h-48 object-cover rounded-lg" />
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Caption {activeTab === 'meme' ? '(Optional)' : ''}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={activeTab === 'meme' ? 'Add a caption to your meme...' : "What's on your mind?"}
              className="input h-24 resize-none"
              maxLength={280}
              required={activeTab === 'text'}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {content.length}/280
              </div>
            </div>
          </div>

          {/* Emoji Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Emojis
            </label>
            <div className="flex flex-wrap gap-1">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  className="p-2 text-lg hover:bg-gray-100 dark:hover:bg-dark-100 rounded transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Username */}
          {!isAnonymous && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="input"
                required
              />
            </div>
          )}

          {/* Anonymous Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="anonymous" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Post anonymously
            </label>
          </div>

          {/* Campus Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Campus
            </label>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="input"
              required
            >
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.shortName}>
                  {campus.name} ({campus.shortName})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary"
            disabled={!content.trim() || (!isAnonymous && !username.trim()) || !selectedCampus}
          >
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;