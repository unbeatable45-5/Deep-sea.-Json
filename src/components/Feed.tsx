import React from 'react';
import { Post as PostType } from '../types';
import Post from './Post';

interface FeedProps {
  posts: PostType[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-4">📱</div>
          <p className="text-lg font-medium mb-2">No posts yet</p>
          <p className="text-sm">Be the first to share something!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;