import React from 'react';
import { Campus } from '../types';

interface CampusFilterProps {
  campuses: Campus[];
  selectedCampus: string;
  onCampusChange: (campusId: string) => void;
}

const CampusFilter: React.FC<CampusFilterProps> = ({
  campuses,
  selectedCampus,
  onCampusChange,
}) => {
  return (
    <div className="py-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {campuses.map((campus) => (
          <button
            key={campus.id}
            onClick={() => onCampusChange(campus.id)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCampus === campus.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-100'
              }
            `}
          >
            {campus.shortName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CampusFilter;