import React from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TodoItem from './TodoItem';
import DraggableTodoItem from './DraggableTodoItem';
import { TodoPropTypes } from '../../types/todoTypes';
import { useDragDrop } from '../../hooks/useDragDrop';

function TodoList({ todos, onEditTodo, onSelectTodo, selectedTodoIds, categories }) {
  const { handleDragStart, handleDragEnd, handleDragCancel } = useDragDrop(todos);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '';
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={todos.map(todo => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No tasks found. Add a new one!</p>
          ) : (
            todos.map((todo) => (
              <DraggableTodoItem key={todo.id} id={todo.id}>
                <TodoItem
                  todo={todo}
                  onEdit={onEditTodo}
                  onSelect={onSelectTodo}
                  isSelected={selectedTodoIds.includes(todo.id)}
                  categoryColor={getCategoryColor(todo.categoryId)}
                />
              </DraggableTodoItem>
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoPropTypes).isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onSelectTodo: PropTypes.func.isRequired,
  selectedTodoIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.array.isRequired,
};

export default TodoList;
