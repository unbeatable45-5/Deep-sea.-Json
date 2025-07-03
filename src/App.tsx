import React, { useState, useEffect } from 'react';
import { Post, Campus, TabFilter, Theme } from './types';
import TopBar from './components/TopBar';
import CampusFilter from './components/CampusFilter';
import TabsFilter from './components/TabsFilter';
import Feed from './components/Feed';
import PostModal from './components/PostModal';
import { Plus } from 'lucide-react';

// Mock data for Nigerian universities
const mockCampuses: Campus[] = [
  { id: 'all', name: 'All Campuses', shortName: 'All' },
  { id: 'unilag', name: 'University of Lagos', shortName: 'UNILAG' },
  { id: 'oau', name: 'Obafemi Awolowo University', shortName: 'OAU' },
  { id: 'ui', name: 'University of Ibadan', shortName: 'UI' },
  { id: 'uniben', name: 'University of Benin', shortName: 'UNIBEN' },
  { id: 'abu', name: 'Ahmadu Bello University', shortName: 'ABU' },
  { id: 'unn', name: 'University of Nigeria, Nsukka', shortName: 'UNN' },
  { id: 'covenant', name: 'Covenant University', shortName: 'Covenant' },
  { id: 'lasu', name: 'Lagos State University', shortName: 'LASU' },
];

// Mock posts data
const mockPosts: Post[] = [
  {
    id: '1',
    type: 'meme',
    content: 'When you submit assignment 5 minutes before deadline 😂',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    username: 'codewizard_ng',
    isAnonymous: false,
    campus: 'UNILAG',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    reactions: { '😂': 124, '❤': 23, '🔥': 45, '👀': 12 },
    commentCount: 18
  },
  {
    id: '2',
    type: 'confession',
    content: 'I haven\'t attended a single lecture this semester but somehow I\'m still passing. Nigerian university system is something else 🤯',
    username: 'Anonymous',
    isAnonymous: true,
    campus: 'OAU',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h ago
    reactions: { '😂': 89, '❤': 156, '🔥': 78, '👀': 234 },
    commentCount: 67
  },
  {
    id: '3',
    type: 'mood',
    content: 'Currently debugging code at 3AM because this assignment is due tomorrow. Send help and energy drinks 💀',
    username: 'midnight_coder',
    isAnonymous: false,
    campus: 'UI',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30min ago
    reactions: { '😂': 45, '❤': 67, '🔥': 23, '👀': 8 },
    commentCount: 12
  }
];

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPostsAvailable, setNewPostsAvailable] = useState(false);

  // Theme toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Live refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new posts arriving
      if (Math.random() > 0.7) {
        setNewPostsAvailable(true);
      }
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNewPost = (newPost: any) => {
    const post: Post = {
      id: Date.now().toString(),
      type: newPost.postType || newPost.type,
      content: newPost.content,
      imageUrl: newPost.imageUrl,
      username: newPost.isAnonymous ? 'Anonymous' : newPost.username,
      isAnonymous: newPost.isAnonymous,
      campus: newPost.campus,
      timestamp: new Date(),
      reactions: { '😂': 0, '❤': 0, '🔥': 0, '👀': 0 },
      commentCount: 0
    };
    
    setPosts(prev => [post, ...prev]);
    setIsPostModalOpen(false);
  };

  const handleRefreshFeed = () => {
    setNewPostsAvailable(false);
    // In a real app, this would fetch new posts from the server
  };

  const filteredPosts = posts.filter(post => {
    const campusMatch = selectedCampus === 'all' || post.campus === selectedCampus;
    const tabMatch = activeTab === 'all' || 
                    (activeTab === 'trending' && getTotalReactions(post) > 50) ||
                    post.type === activeTab;
    return campusMatch && tabMatch;
  });

  const sortedPosts = activeTab === 'trending' 
    ? filteredPosts.sort((a, b) => getTotalReactions(b) - getTotalReactions(a))
    : filteredPosts;

  function getTotalReactions(post: Post): number {
    return Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <TopBar 
        theme={theme} 
        onThemeToggle={handleThemeToggle} 
      />
      
      <main className="max-w-2xl mx-auto px-4 pb-20">
        <CampusFilter 
          campuses={mockCampuses}
          selectedCampus={selectedCampus}
          onCampusChange={setSelectedCampus}
        />
        
        <TabsFilter 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        {newPostsAvailable && (
          <div className="mb-4">
            <button 
              onClick={handleRefreshFeed}
              className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
            >
              🔄 New Posts Available
            </button>
          </div>
        )}
        
        <Feed posts={sortedPosts} />
      </main>

      {/* Floating Post Button */}
      <button
        onClick={() => setIsPostModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
      >
        <Plus size={24} />
      </button>

      {/* Post Modal */}
      {isPostModalOpen && (
        <PostModal
          campuses={mockCampuses.filter(c => c.id !== 'all')}
          onClose={() => setIsPostModalOpen(false)}
          onSubmit={handleNewPost}
        />
      )}
    </div>
  );
}

export default App;