import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface TopBarProps {
  theme: Theme;
  onThemeToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ theme, onThemeToggle }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-dark-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-dark-100">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Statusphere
          </h1>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Search size={20} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;