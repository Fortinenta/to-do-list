import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { reorderTodos } from '../store/slices/todoSlice';

export const useDragDrop = (items, onReorder) => {
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newOrder = [...items];
      const [movedItem] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, movedItem);
      dispatch(reorderTodos(newOrder));
      if (onReorder) {
        onReorder(newOrder);
      }
    }
    setActiveId(null);
  }, [items, dispatch, onReorder]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    activeId,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
