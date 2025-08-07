import { storageService } from './storageService';
import { v4 as uuidv4 } from 'uuid';
import { dummyCategories } from '../utils/dummyData';

const CATEGORY_STORAGE_KEY = 'categories';

const getCategories = () => {
  let categories = storageService.getItem(CATEGORY_STORAGE_KEY);
  if (!categories || categories.length === 0) {
    categories = dummyCategories;
    saveCategories(categories);
  }
  return categories;
};

const saveCategories = (categories) => {
  storageService.setItem(CATEGORY_STORAGE_KEY, categories);
};

export const categoryService = {
  getAllCategories: () => {
    return getCategories();
  },

  getCategoryById: (id) => {
    const categories = getCategories();
    return categories.find(category => category.id === id);
  },

  addCategory: (category) => {
    const categories = getCategories();
    const newCategory = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...category,
    };
    categories.push(newCategory);
    saveCategories(categories);
    return newCategory;
  },

  updateCategory: (id, updatedFields) => {
    const categories = getCategories();
    const index = categories.findIndex(category => category.id === id);
    if (index > -1) {
      categories[index] = {
        ...categories[index],
        ...updatedFields,
      };
      saveCategories(categories);
      return categories[index];
    }
    return null;
  },

  deleteCategory: (id) => {
    let categories = getCategories();
    const initialLength = categories.length;
    categories = categories.filter(category => category.id !== id);
    saveCategories(categories);
    return categories.length < initialLength;
  },
};