import React, { useState } from 'react';
import { 
  MoonIcon, 
  SunIcon,
  UserIcon,
  BriefcaseIcon,
  ShoppingBagIcon,
  BookOpenIcon,
  TagIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { CategoryType, CATEGORY_LABELS } from '../../types/todo';

interface HeaderProps {
  isDark: boolean;
  onDarkModeToggle: () => void;
  currentCategory: CategoryType | 'ALL';
  onCategoryFilter: (category: CategoryType | 'ALL') => void;
}

const CATEGORY_ICONS: Record<CategoryType | 'ALL', React.ComponentType<{ className?: string }>> = {
  ALL: TagIcon,
  PERSONAL: UserIcon,
  WORK: BriefcaseIcon,
  SHOPPING: ShoppingBagIcon,
  STUDY: BookOpenIcon,
  OTHER: TagIcon
};

export const Header: React.FC<HeaderProps> = ({ 
  isDark, 
  onDarkModeToggle,
  currentCategory,
  onCategoryFilter
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-sm z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Todo List</h1>
        
        <div className="flex items-center gap-2">
          {/* 카테고리 드롭다운 */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg 
                bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                transition-colors text-gray-900 dark:text-gray-100"
            >
              {currentCategory === 'ALL' ? (
                <>
                  <TagIcon className="w-5 h-5" />
                  <span>전체 카테고리</span>
                </>
              ) : (
                <>
                  {CATEGORY_ICONS[currentCategory] && React.createElement(CATEGORY_ICONS[currentCategory], { className: "w-5 h-5" })}
                  <span>{CATEGORY_LABELS[currentCategory as CategoryType]}</span>
                </>
              )}
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 
                rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[160px]">
                <button
                  onClick={() => {
                    onCategoryFilter('ALL');
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center gap-2
                    ${currentCategory === 'ALL' 
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'}`}
                >
                  <TagIcon className="w-5 h-5" />
                  <span>전체</span>
                </button>
                {(Object.entries(CATEGORY_LABELS) as [CategoryType, string][]).map(([value, label]) => {
                  const Icon = CATEGORY_ICONS[value];
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        onCategoryFilter(value);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center gap-2
                        ${currentCategory === value 
                          ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 다크모드 토글 버튼 */}
          <button
            onClick={onDarkModeToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
              text-gray-600 dark:text-gray-300 transition-colors duration-200"
          >
            {isDark ? (
              <SunIcon className="w-6 h-6" />
            ) : (
              <MoonIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}; 