import React from 'react';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';
import { TodoItem } from '../components/TodoList/TodoItem';
import { AddTodoForm } from '../components/TodoList/AddTodoForm';
import { AddButton } from '../components/TodoList/AddButton';
import { Todo } from '../types/todo';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../utils/firebase';
import { useEffect, useState } from 'react';
import { CategoryType } from '../types/todo';

type FilterType = 'all' | 'today' | 'important' | 'completed';

export const MainPage: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [isAddingTodo, setIsAddingTodo] = React.useState(false);
  const [isDark, setIsDark] = React.useState(() => {
    return localStorage.theme === 'dark';
  });
  const [currentFilter, setCurrentFilter] = React.useState<FilterType>('all');
  const [currentCategory, setCurrentCategory] = useState<CategoryType | 'ALL'>('ALL');

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    loadTodos();
  }, []);

  const filteredTodos = React.useMemo(() => {
    let filtered = todos;

    if (currentCategory !== 'ALL') {
      filtered = filtered.filter(todo => todo.category === currentCategory);
    }

    switch (currentFilter) {
      case 'important':
        return filtered.filter(todo => todo.priority === 1);
      case 'completed':
        return filtered.filter(todo => todo.isCompleted);
      case 'today':
        const today = new Date();
        return filtered.filter(todo => {
          const todoDate = new Date(todo.createdAt);
          return todoDate.toDateString() === today.toDateString();
        });
      default:
        return filtered;
    }
  }, [todos, currentFilter, currentCategory]);

  const handleAddTodo = async (title: string, description: string) => {
    try {
      const newTodo = {
        title,
        description,
        priority: 2 as const,
        isCompleted: false,
        category: 'OTHER' as CategoryType,
        backgroundColor: '#FFF9C4',
      };
      const id = await addTodo(newTodo);
      const todoWithId: Todo = {
        ...newTodo,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTodos([todoWithId, ...todos]);
      setIsAddingTodo(false);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      await updateTodo(id, { isCompleted: !todo.isCompleted });
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handlePriorityChange = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const newPriority = todo.priority === 1 ? 2 : 1;
      await updateTodo(id, { priority: newPriority as 1 | 2 });
      
      setTodos(todos.map(todo => 
        todo.id === id ? { 
          ...todo, 
          priority: newPriority as 1 | 2
        } : todo
      ));
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleColorChange = async (id: string, color: string) => {
    try {
      await updateTodo(id, { backgroundColor: color });
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, backgroundColor: color } : todo
      ));
    } catch (error) {
      console.error('Failed to update color:', error);
    }
  };

  const handleEditTodo = async (id: string, title: string, description: string) => {
    try {
      await updateTodo(id, { 
        title, 
        description,
        updatedAt: new Date()
      });
      
      setTodos(todos.map(todo => 
        todo.id === id ? { 
          ...todo, 
          title, 
          description,
          updatedAt: new Date()
        } : todo
      ));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const currentTodo = filteredTodos[sourceIndex];
    const allTodosSourceIndex = todos.findIndex(todo => todo.id === currentTodo.id);
    
    const newTodos = Array.from(todos);
    const [removed] = newTodos.splice(allTodosSourceIndex, 1);
    
    const destinationTodo = filteredTodos[destinationIndex];
    const allTodosDestinationIndex = todos.findIndex(todo => todo.id === destinationTodo.id);
    
    newTodos.splice(
      allTodosDestinationIndex >= allTodosSourceIndex ? allTodosDestinationIndex : allTodosDestinationIndex,
      0,
      removed
    );

    setTodos(newTodos);
  };

  const handleCategoryChange = async (id: string, category: CategoryType) => {
    try {
      await updateTodo(id, { category });
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, category } : todo
      ));
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        isDark={isDark} 
        onDarkModeToggle={() => setIsDark(!isDark)}
        currentCategory={currentCategory}
        onCategoryFilter={setCurrentCategory}
      />
      <Sidebar currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
      <main className="pt-16 md:pl-48">
        <div className="max-w-[calc(100vw-192px)] mx-auto p-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos-list" type="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {filteredTodos.map((todo, index) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      index={index}
                      onToggle={handleToggleTodo}
                      onDelete={handleDeleteTodo}
                      onPriorityChange={handlePriorityChange}
                      onColorChange={handleColorChange}
                      onEdit={handleEditTodo}
                      onCategoryChange={handleCategoryChange}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>

      {isAddingTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-[300px]">
            <AddTodoForm 
              onAdd={handleAddTodo}
              onCancel={() => setIsAddingTodo(false)}
            />
          </div>
        </div>
      )}

      <AddButton onClick={() => setIsAddingTodo(true)} />
    </div>
  );
}; 