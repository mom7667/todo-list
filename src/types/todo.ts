export type CategoryType = 'PERSONAL' | 'WORK' | 'SHOPPING' | 'STUDY' | 'OTHER';

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 1 | 2 | 3;
  isCompleted: boolean;
  category: CategoryType;
  createdAt: Date;
  updatedAt: Date;
  backgroundColor?: string;
}

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  PERSONAL: '개인',
  WORK: '업무',
  SHOPPING: '쇼핑',
  STUDY: '공부',
  OTHER: '기타'
}; 