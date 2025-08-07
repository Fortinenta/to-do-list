import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleTodoCompleted, deleteTodoRequest } from '../../store/slices/todoSlice';
import { showConfirmDialog } from '../common/ConfirmDialog';
import { TodoPropTypes } from '../../types/todoTypes';
import { formatDate } from '../../utils/dateHelpers';

const TodoItem = forwardRef(({ todo, onEdit, onSelect, isSelected, categoryColor, style, listeners, attributes }, ref) => {
  const dispatch = useDispatch();

  const handleToggleCompleted = () => {
    dispatch(toggleTodoCompleted(todo.id));
  };

  const handleDelete = async () => {
    const result = await showConfirmDialog({
      title: 'Delete Task',
      text: `Are you sure you want to delete "${todo.title}"?`,
      icon: 'warning',
    });
    if (result.isConfirmed) {
      dispatch(deleteTodoRequest(todo.id));
    }
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  const priorityColors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  return (
    <div
      ref={ref}
      style={style}
      {...attributes}
      className={`flex items-stretch w-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out
        ${todo.completed ? 'opacity-60' : ''}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      {/* Draggable Area */}
      <div
        className="flex-grow flex items-center p-4"
        style={{ borderLeft: categoryColor ? `5px solid ${categoryColor}` : '' }}
      >
        <div
          {...listeners}
          className="cursor-move touch-none p-2 mr-2 text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(todo.id)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-4"
        />

        <div className={`flex-1 min-w-0 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            <h3 className={`text-lg font-semibold ${todo.completed ? 'dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{todo.description}</p>
            )}
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span className={`mr-3 font-semibold ${priorityColors[todo.priority]}`}>{todo.priority.toUpperCase()}</span>
              {todo.dueDate && (
                  <span className="mr-3">Due: {formatDate(todo.dueDate)}</span>
              )}
              {todo.tags && todo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                  {todo.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                        {tag}
                      </span>
                  ))}
                  </div>
              )}
            </div>
        </div>
      </div>

      {/* Action Buttons Area */}
      <div className="flex flex-col items-center justify-center space-y-2 p-3 bg-gray-50 dark:bg-gray-700 border-l border-gray-200 dark:border-gray-600 sm:flex-row sm:space-y-0 sm:space-x-2 sm:p-2">
        <button
          onClick={handleToggleCompleted}
          className={`p-2 rounded-full text-white transition-colors duration-200 ${todo.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'}`}
          title={todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </button>
        <button
          onClick={handleEdit}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
          title="Edit Task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
        </button>
        <button
          onClick={handleDelete}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
          title="Delete Task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
});

TodoItem.propTypes = {
  todo: TodoPropTypes.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  categoryColor: PropTypes.string,
  style: PropTypes.object,
  listeners: PropTypes.object,
  attributes: PropTypes.object,
};

export default TodoItem;
