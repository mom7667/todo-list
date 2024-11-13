import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddTodoFormProps {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-full"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <h2 className="text-lg font-semibold mb-4">새 메모 추가</h2>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        autoFocus
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="내용을 입력하세요"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        rows={4}
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
      >
        추가하기
      </button>
    </form>
  );
}; 