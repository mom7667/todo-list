import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Todo, CategoryType } from '../types/todo';

// Firestore 데이터를 Todo 타입으로 변환
const convertToTodo = (doc: DocumentData): Todo => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    priority: data.priority,
    isCompleted: data.isCompleted,
    category: data.category || 'OTHER',
    backgroundColor: data.backgroundColor || '#FFF9C4',
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
};

// 할 일 목록 조회
export const fetchTodos = async (): Promise<Todo[]> => {
  const todosRef = collection(db, 'todos');
  const q = query(todosRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(convertToTodo);
};

// 할 일 추가
export const addTodo = async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'todos'), {
    ...todo,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

// 할 일 수정
export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<void> => {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

// 할 일 삭제
export const deleteTodo = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'todos', id));
}; 