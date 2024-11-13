import React, { useState } from 'react';
import { Todo } from '../../types/todo';
import { 
  StarIcon, 
  TrashIcon, 
  CheckIcon,
  SwatchIcon,
  PencilIcon,
  UserIcon,
  BriefcaseIcon,
  ShoppingBagIcon,
  BookOpenIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { CategoryType, CATEGORY_LABELS } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
  onCategoryChange: (id: string, category: CategoryType) => void;
}

const MEMO_COLORS = [
  { name: '진한 노랑', value: '#FFE082' },
  { name: '진한 분홍', value: '#F48FB1' },
  { name: '진한 초록', value: '#81C784' },
  { name: '진한 파랑', value: '#64B5F6' },
  { name: '진한 주황', value: '#FFB74D' },
  { name: '연한 노랑', value: '#FFF9C4' },
  { name: '연한 분홍', value: '#FCEAFF' },
  { name: '연 초록', value: '#F1F8E9' },
  { name: '연한 파랑', value: '#E3F2FD' },
  { name: '연한 주황', value: '#FFF3E0' },
];

const CATEGORY_ICONS: Record<CategoryType, React.ComponentType<{ className?: string }>> = {
  PERSONAL: UserIcon,
  WORK: BriefcaseIcon,
  SHOPPING: ShoppingBagIcon,
  STUDY: BookOpenIcon,
  OTHER: TagIcon
};

export const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  index,
  onToggle, 
  onDelete, 
  onPriorityChange,
  onColorChange,
  onEdit,
  onCategoryChange
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const rotation = React.useMemo(() => Math.random() * 4 - 2, []);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editTitle, editDescription);
    }
    setIsEditing(!isEditing);
  };

  const CategoryIcon = CATEGORY_ICONS[todo.category];

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex justify-center"
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div
            style={{ 
              transform: `rotate(${rotation}deg)`,
              backgroundColor: todo.backgroundColor || '#FFF9C4',
              width: '250px',
              height: '250px',
            }}
            className={`rounded-lg shadow-lg hover:shadow-xl 
              transition-all duration-300 relative hover:-translate-y-1 flex flex-col
              ${snapshot.isDragging ? 'shadow-2xl scale-105' : ''}`}
          >
            {/* 상단 액션 버튼들 */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => onPriorityChange(todo.id)}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
              >
                {todo.priority === 1 ? (
                  <StarIconSolid className="w-5 h-5 text-warning" />
                ) : (
                  <StarIcon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="p-1 hover:bg-black/10 rounded-full transition-colors"
                >
                  <SwatchIcon className="w-5 h-5 text-gray-600" />
                </button>
                {showColorPicker && (
                  <div className="absolute top-full right-0 mt-1">
                    <div className="relative w-[180px]">
                      {/* 진한 색상 */}
                      <div className="flex justify-center mb-3">
                        {MEMO_COLORS.slice(0, 5).map((color, index) => (
                          <button
                            key={color.value}
                            onClick={() => {
                              onColorChange(todo.id, color.value);
                              setShowColorPicker(false);
                            }}
                            className="w-8 h-8 rounded-full hover:scale-110 transition-transform relative group
                              -ml-1 first:ml-0 hover:z-10 border-2 border-white shadow-md"
                            style={{ backgroundColor: color.value }}
                          >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1
                              bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100
                              whitespace-nowrap pointer-events-none">
                              {color.name}
                            </span>
                          </button>
                        ))}
                      </div>
                      {/* 연한 색상 */}
                      <div className="flex justify-center">
                        {MEMO_COLORS.slice(5).map((color, index) => (
                          <button
                            key={color.value}
                            onClick={() => {
                              onColorChange(todo.id, color.value);
                              setShowColorPicker(false);
                            }}
                            className="w-8 h-8 rounded-full hover:scale-110 transition-transform relative group
                              -ml-1 first:ml-0 hover:z-10 border-2 border-white shadow-md"
                            style={{ backgroundColor: color.value }}
                          >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1
                              bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100
                              whitespace-nowrap pointer-events-none">
                              {color.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleEdit}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
              >
                <PencilIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
              >
                <TrashIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 내용 영역 - 스크롤 처리 수정 */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className={`mt-6 ${todo.isCompleted ? 'opacity-50' : ''}`}>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 border rounded bg-white/80 focus:outline-none focus:ring-2
                        text-gray-900 dark:text-gray-900"
                      autoFocus
                      maxLength={100} // 제목 길이 제한
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full p-2 border rounded bg-white/80 focus:outline-none focus:ring-2 resize-none
                        text-gray-900 dark:text-gray-900"
                      rows={3}
                      maxLength={500} // 설명 길이 제한
                    />
                  </div>
                ) : (
                  <div className="overflow-y-auto max-h-[130px] scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                    <h3 className={`font-medium mb-2 text-lg text-gray-900 break-words
                      ${todo.isCompleted ? 'line-through' : ''}`}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-sm text-gray-600 whitespace-pre-wrap break-words">
                        {todo.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 하단 액션 영역 */}
            <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-between items-center">
              {/* 카테고리 선택 */}
              <div className="relative">
                <button
                  onClick={() => setShowCategoryPicker(!showCategoryPicker)}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded-full
                    bg-black/5 hover:bg-black/10 transition-colors text-gray-900"
                >
                  <CategoryIcon className="w-4 h-4" />
                  <span>{CATEGORY_LABELS[todo.category]}</span>
                </button>
                
                {showCategoryPicker && (
                  <div className="absolute bottom-full left-0 mb-1 rounded-lg z-50
                    bg-transparent backdrop-blur-sm"
                  >
                    <div className="flex flex-row flex-wrap gap-1 p-1 min-w-[200px]">
                      {Object.entries(CATEGORY_LABELS).map(([value, label]) => {
                        const ItemIcon = CATEGORY_ICONS[value as CategoryType];
                        return (
                          <button
                            key={value}
                            onClick={() => {
                              onCategoryChange(todo.id, value as CategoryType);
                              setShowCategoryPicker(false);
                            }}
                            className={`px-3 py-1 text-sm rounded-full transition-colors
                              flex items-center gap-1
                              ${todo.category === value 
                                ? 'bg-black/10 text-gray-900' 
                                : 'text-gray-900 hover:bg-black/10'}`}
                          >
                            <ItemIcon className="w-4 h-4" />
                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 완료 체크 버튼 */}
              <button
                onClick={() => onToggle(todo.id)}
                className={`p-2 rounded-full transition-all duration-300
                  ${todo.isCompleted 
                    ? 'bg-success text-white' 
                    : 'bg-gray-200 text-gray-600'} 
                  hover:scale-110`}
              >
                <CheckIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}; 