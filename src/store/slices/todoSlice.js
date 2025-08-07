import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
  selectedTodoIds: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    fetchTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    addTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTodoSuccess: (state, action) => {
      state.loading = false;
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    updateTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTodoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    deleteTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleTodoCompleted: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date().toISOString();
      }
    },
    // Bulk actions
    toggleSelectTodo: (state, action) => {
      const id = action.payload;
      if (state.selectedTodoIds.includes(id)) {
        state.selectedTodoIds = state.selectedTodoIds.filter(todoId => todoId !== id);
      } else {
        state.selectedTodoIds.push(id);
      }
    },
    selectAllTodos: (state, action) => {
      state.selectedTodoIds = action.payload; // Expects an array of IDs
    },
    clearSelectedTodos: (state) => {
      state.selectedTodoIds = [];
    },
    bulkUpdateTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    bulkUpdateTodosSuccess: (state, action) => {
      state.loading = false;
      const { ids, updatedFields } = action.payload;
      state.todos = state.todos.map(todo => {
        if (ids.includes(todo.id)) {
          return { ...todo, ...updatedFields, updatedAt: new Date().toISOString() };
        }
        return todo;
      });
      state.selectedTodoIds = [];
    },
    bulkUpdateTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    bulkDeleteTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    bulkDeleteTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter(todo => !action.payload.includes(todo.id));
      state.selectedTodoIds = [];
    },
    bulkDeleteTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    reorderTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { 
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  toggleTodoCompleted,
  toggleSelectTodo,
  selectAllTodos,
  clearSelectedTodos,
  bulkUpdateTodosRequest,
  bulkUpdateTodosSuccess,
  bulkUpdateTodosFailure,
  bulkDeleteTodosRequest,
  bulkDeleteTodosSuccess,
  bulkDeleteTodosFailure,
  reorderTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
