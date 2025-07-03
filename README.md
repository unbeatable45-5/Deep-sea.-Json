# 🌟 Statusphere

A modern, mobile-optimized social web app designed specifically for Nigerian university students to share memes, confessions, moods, and thoughts.

![Statusphere Logo](https://via.placeholder.com/150x150/f97316/ffffff?text=S)

## ✨ Features

### 🏠 Main Feed
- **Dark-themed scrollable homepage** showing all posts
- **Smart filtering** by campus and post type
- **Live refresh** every 15 seconds with "New Posts Available" banner
- **Mobile-first responsive design** for one-thumb scrolling

### 📱 Post Structure
Each post displays:
- 🖼️ **Meme image** (optional)
- 📝 **Short caption text** (max 280 characters)
- 👤 **Username or "Anonymous"**
- 🏫 **Campus name** (UNILAG, OAU, UI, UNIBEN, etc.)
- 😂❤🔥👀 **Reaction emojis** with live counters
- 💬 **Comment count**
- ⏰ **Timestamp** (e.g., "2h ago")
- ⋮ **Dropdown menu** for Report or Block

### ➕ Post Creation
- **Floating "Post a Status" button** opens modal
- **Two tabs**: Text Post and Meme Post
- 📷 **Image upload** for memes with preview
- 😀 **Quick emoji picker** for easy expression
- 🎭 **Anonymous toggle** for privacy
- 🏷️ **Post type selection** (Regular, Confession, Mood)
- 🏫 **Campus selection** from Nigerian universities

### 🏫 Campus Filter
Horizontal scroll menu of Nigerian universities:
- All Campuses
- UNILAG (University of Lagos)
- OAU (Obafemi Awolowo University)
- UI (University of Ibadan)
- UNIBEN (University of Benin)
- ABU (Ahmadu Bello University)
- UNN (University of Nigeria, Nsukka)
- Covenant University
- LASU (Lagos State University)

### 🧭 Feed Tabs
- **All**: Show all posts
- **Confessions**: Anonymous confessions only
- **Moods**: Mood posts only
- **🔥 Trending**: Posts sorted by total reactions

### 🌓 Top Bar
- 📱 **App logo** and name
- 🔍 **Search icon** (ready for implementation)
- 🌙 **Theme toggle** (dark/light mode)

### 🔄 Live Features
- **Auto-refresh** every 15 seconds
- **Real-time reaction counters**
- **Smooth animations** and transitions
- **Optimistic UI updates**

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Build Tool**: Vite for fast development
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Storage**: Local storage simulation (ready for backend integration)

## 🛠️ Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd statusphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Mobile Optimization

### Design Features
- **Mobile-first responsive design**
- **Touch-friendly interface** with large tap targets
- **Optimized scrolling** with custom scrollbars
- **Bottom-sheet modal** on mobile devices
- **Thumb-friendly navigation**

### Performance
- **Lazy image loading** for better performance
- **Optimized bundle size** with Vite
- **Smooth animations** with CSS transitions
- **Efficient re-renders** with React optimizations

## 🎨 Design System

### Colors
- **Primary**: Orange (#f97316) - energetic and friendly
- **Dark Theme**: Deep grays with high contrast
- **Semantic Colors**: Type-specific colors for posts

### Typography
- **Font**: Inter - modern and readable
- **Scale**: Responsive text sizing
- **Hierarchy**: Clear information hierarchy

### Components
- **Card-based layout** for posts
- **Floating action button** for quick posting
- **Horizontal scrolling** for filters
- **Modal overlays** for interactions

## 🔮 Future Enhancements

### Backend Integration
- [ ] User authentication with Nigerian university email
- [ ] Real-time chat and comments
- [ ] Push notifications
- [ ] Image upload to cloud storage
- [ ] Advanced search and hashtags

### Social Features
- [ ] User profiles and following
- [ ] Direct messaging
- [ ] Story/status features
- [ ] Campus verification system

### Moderation
- [ ] AI-powered content moderation
- [ ] Community reporting system
- [ ] Admin dashboard
- [ ] Automated spam detection

### Analytics
- [ ] Usage analytics
- [ ] Trending algorithms
- [ ] Campus-specific insights
- [ ] Content performance metrics

## 🏛️ Architecture

### Component Structure
```
src/
├── components/           # React components
│   ├── TopBar.tsx       # Header with logo and controls
│   ├── CampusFilter.tsx # Campus selection
│   ├── TabsFilter.tsx   # Content filtering tabs
│   ├── Feed.tsx         # Main post feed
│   ├── Post.tsx         # Individual post component
│   └── PostModal.tsx    # Post creation modal
├── types/               # TypeScript definitions
├── styles/              # CSS and styling
└── App.tsx              # Main application
```

### Data Models
- **Post**: Content, metadata, reactions
- **Campus**: University information
- **User**: Anonymous or identified users
- **Reactions**: Emoji-based interactions

## 📄 License

This project is built for educational and demonstration purposes.

## 🤝 Contributing

This is a demonstration project showcasing modern React development for Nigerian university social platforms.

---

**Built with ❤️ for Nigerian university students**

*Connecting campuses, one meme at a time* 🎓📱