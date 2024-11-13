import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface AddButtonProps {
  onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-primary rounded-full shadow-lg 
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
        flex items-center justify-center text-white z-50"
    >
      <PlusIcon className="w-8 h-8" />
    </button>
  );
}; 