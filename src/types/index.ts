export interface Post {
  id: string;
  type: 'text' | 'meme' | 'confession' | 'mood';
  content: string;
  imageUrl?: string;
  username: string;
  isAnonymous: boolean;
  campus: string;
  timestamp: Date;
  reactions: {
    '😂': number;
    '❤': number;
    '🔥': number;
    '👀': number;
  };
  commentCount: number;
  reported?: boolean;
}

export interface Campus {
  id: string;
  name: string;
  shortName: string;
}

export type TabFilter = 'all' | 'confessions' | 'moods' | 'trending';

export type Theme = 'light' | 'dark';

export interface NewPost {
  type: 'text' | 'meme';
  content: string;
  imageUrl?: string;
  username: string;
  isAnonymous: boolean;
  campus: string;
  postType: 'text' | 'confession' | 'mood';
}