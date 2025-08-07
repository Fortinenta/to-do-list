import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateTodo } from '../../utils/validators';
import { PRIORITY_OPTIONS } from '../../utils/constants';
import { addTodoRequest, updateTodoRequest } from '../../store/slices/todoSlice';

function TodoForm({ initialData = null, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
    priority: 'medium',
    categoryId: '',
    dueDate: '',
    tags: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        completed: initialData.completed || false,
        priority: initialData.priority || 'medium',
        categoryId: initialData.categoryId || (categories.length > 0 ? categories[0].id : ''),
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '', // Format for input type=date
        tags: initialData.tags ? initialData.tags.join(', ') : '',
      });
    } else if (categories.length > 0) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [initialData, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const todoToSave = {
      ...formData,
      tags: tagsArray,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    };

    const validationErrors = validateTodo(todoToSave);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (initialData) {
      dispatch(updateTodoRequest({ id: initialData.id, updatedFields: todoToSave }));
    } else {
      dispatch(addTodoRequest(todoToSave));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />
      <Input
        label="Description"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        type="textarea"
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-blue-600 rounded"
        />
        <label htmlFor="completed" className="text-gray-700 dark:text-gray-300">Completed</label>
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
        >
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {errors.priority && <p className="mt-1 text-sm text-red-500">{errors.priority}</p>}
      </div>
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <Input
        label="Due Date"
        id="dueDate"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <Input
        label="Tags (comma-separated)"
        id="tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="e.g., work, urgent, home"
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary">{initialData ? 'Update Task' : 'Add Task'}</Button>
      </div>
    </form>
  );
}

TodoForm.propTypes = {
  initialData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default TodoForm;
