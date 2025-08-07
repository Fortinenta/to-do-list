import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import todoReducer from './slices/todoSlice';
import categoryReducer from './slices/categorySlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';
import weatherReducer from './slices/weatherSlice';
import quoteReducer from './slices/quoteSlice';
import bulkReducer from './slices/bulkSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    category: categoryReducer,
    filter: filterReducer,
    ui: uiReducer,
    weather: weatherReducer,
    quote: quoteReducer,
    bulk: bulkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable Redux Thunk as we are using Redux Saga
      serializableCheck: {
        // Ignore these action types to avoid serializability warnings with Redux Saga
        ignoredActions: ['todo/addTodoRequest', 'todo/updateTodoRequest', 'todo/deleteTodoRequest', 'todo/bulkUpdateTodosRequest', 'todo/bulkDeleteTodosRequest'],
        ignoredPaths: ['todo.todos', 'category.categories'], // Ignore specific paths if they contain non-serializable data
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
