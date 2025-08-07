export const validateTodo = (todo) => {
  const errors = {};
  if (!todo.title || todo.title.trim() === '') {
    errors.title = 'Title is required';
  }
  if (!todo.priority || !['low', 'medium', 'high'].includes(todo.priority)) {
    errors.priority = 'Invalid priority';
  }
  return errors;
};

export const validateCategory = (category) => {
  const errors = {};
  if (!category.name || category.name.trim() === '') {
    errors.name = 'Category name is required';
  }
  return errors;
};
