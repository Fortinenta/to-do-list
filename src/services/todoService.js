import { storageService } from './storageService';
import { v4 as uuidv4 } from 'uuid';
import { dummyTodos } from '../utils/dummyData';

const TODO_STORAGE_KEY = 'todos';

const getTodos = () => {
  let todos = storageService.getItem(TODO_STORAGE_KEY);
  if (!todos || todos.length === 0) {
    todos = dummyTodos;
    saveTodos(todos);
  }
  return todos;
};

const saveTodos = (todos) => {
  storageService.setItem(TODO_STORAGE_KEY, todos);
};

export const todoService = {
  getAllTodos: () => {
    return getTodos();
  },

  getTodoById: (id) => {
    const todos = getTodos();
    return todos.find(todo => todo.id === id);
  },

  addTodo: (todo) => {
    const todos = getTodos();
    const newTodo = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...todo,
    };
    todos.push(newTodo);
    saveTodos(todos);
    return newTodo;
  },

  updateTodo: (id, updatedFields) => {
    const todos = getTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index > -1) {
      todos[index] = {
        ...todos[index],
        ...updatedFields,
        updatedAt: new Date().toISOString(),
      };
      saveTodos(todos);
      return todos[index];
    }
    return null;
  },

  deleteTodo: (id) => {
    let todos = getTodos();
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(todos);
    return todos.length < initialLength;
  },

  // For bulk operations
  updateMultipleTodos: (ids, updatedFields) => {
    const todos = getTodos();
    let updatedCount = 0;
    const newTodos = todos.map(todo => {
      if (ids.includes(todo.id)) {
        updatedCount++;
        return {
          ...todo,
          ...updatedFields,
          updatedAt: new Date().toISOString(),
        };
      }
      return todo;
    });
    saveTodos(newTodos);
    return updatedCount;
  },

  deleteMultipleTodos: (ids) => {
    let todos = getTodos();
    const initialLength = todos.length;
    todos = todos.filter(todo => !ids.includes(todo.id));
    saveTodos(todos);
    return initialLength - todos.length;
  },
};