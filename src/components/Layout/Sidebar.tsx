import React from 'react';
import { FolderIcon, CalendarIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  currentFilter: 'all' | 'today' | 'important' | 'completed';
  onFilterChange: (filter: 'all' | 'today' | 'important' | 'completed') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <aside className="hidden md:block w-48 fixed left-0 top-16 bottom-0 
      bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <nav className="p-3 space-y-4">
        <div>
          <h2 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">카테고리</h2>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => onFilterChange('all')}
                className={`flex items-center gap-2 w-full p-2 rounded-lg 
                  ${currentFilter === 'all' 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'} 
                  transition-colors text-sm`}
              >
                <FolderIcon className="w-4 h-4" />
                <span>전체</span>
              </button>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">필터</h2>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => onFilterChange('today')}
                className={`flex items-center gap-2 w-full p-2 rounded-lg 
                  ${currentFilter === 'today' 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'} 
                  transition-colors text-sm`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>오늘</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onFilterChange('important')}
                className={`flex items-center gap-2 w-full p-2 rounded-lg 
                  ${currentFilter === 'important' 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'} 
                  transition-colors text-sm`}
              >
                <StarIcon className="w-4 h-4" />
                <span>중요</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onFilterChange('completed')}
                className={`flex items-center gap-2 w-full p-2 rounded-lg 
                  ${currentFilter === 'completed' 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'} 
                  transition-colors text-sm`}
              >
                <CheckCircleIcon className="w-4 h-4" />
                <span>완료</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}; 