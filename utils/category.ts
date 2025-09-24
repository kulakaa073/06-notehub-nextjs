import { Category } from '@/types/category';

export const getCategoryNameById = (id: string, categories: Category[]) => {
  const category = categories.find((category) => category.id === id);
  return category ? category.name : 'Uncategorized';
};

export const getCategoryIdByName = (name: string, categories: Category[]) => {
  const category = categories.find((category) => category.name === name);
  return category ? category.id : null;
};
