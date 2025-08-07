import { useSelector, useDispatch } from 'react-redux';
import { toggleSelectItem, selectAllItems, clearSelectedItems } from '../store/slices/bulkSlice';
import { bulkUpdateTodosRequest, bulkDeleteTodosRequest } from '../store/slices/todoSlice';

export const useBulkActions = (allItemIds) => {
  const dispatch = useDispatch();
  const selectedItemIds = useSelector((state) => state.bulk.selectedItemIds);

  const isSelected = (id) => selectedItemIds.includes(id);
  const hasSelected = selectedItemIds.length > 0;
  const allSelected = selectedItemIds.length === allItemIds.length && allItemIds.length > 0;

  const toggleSelect = (id) => {
    dispatch(toggleSelectItem(id));
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      dispatch(clearSelectedItems());
    } else {
      dispatch(selectAllItems(allItemIds));
    }
  };

  const bulkMarkCompleted = () => {
    if (hasSelected) {
      dispatch(bulkUpdateTodosRequest({ ids: selectedItemIds, updatedFields: { completed: true } }));
    }
  };

  const bulkMarkUncompleted = () => {
    if (hasSelected) {
      dispatch(bulkUpdateTodosRequest({ ids: selectedItemIds, updatedFields: { completed: false } }));
    }
  };

  const bulkChangeCategory = (categoryId) => {
    if (hasSelected) {
      dispatch(bulkUpdateTodosRequest({ ids: selectedItemIds, updatedFields: { categoryId } }));
    }
  };

  const bulkChangePriority = (priority) => {
    if (hasSelected) {
      dispatch(bulkUpdateTodosRequest({ ids: selectedItemIds, updatedFields: { priority } }));
    }
  };

  const bulkDelete = () => {
    if (hasSelected) {
      dispatch(bulkDeleteTodosRequest(selectedItemIds));
    }
  };

  return {
    selectedItemIds,
    isSelected,
    hasSelected,
    allSelected,
    toggleSelect,
    toggleSelectAll,
    bulkMarkCompleted,
    bulkMarkUncompleted,
    bulkChangeCategory,
    bulkChangePriority,
    bulkDelete,
  };
};
