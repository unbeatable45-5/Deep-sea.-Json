import React from 'react';
import { TabFilter } from '../types';

interface TabsFilterProps {
  activeTab: TabFilter;
  onTabChange: (tab: TabFilter) => void;
}

const TabsFilter: React.FC<TabsFilterProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabFilter; label: string; emoji?: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'confessions', label: 'Confessions' },
    { id: 'moods', label: 'Moods' },
    { id: 'trending', label: 'Trending', emoji: '🔥' },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-dark-100 mb-4">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab.id
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <span className="flex items-center justify-center gap-1">
              {tab.emoji && <span>{tab.emoji}</span>}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsFilter;