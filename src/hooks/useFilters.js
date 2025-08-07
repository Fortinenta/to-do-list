import { useSelector, useDispatch } from 'react-redux';
import {
  setStatusFilter,
  toggleCategoryFilter,
  setSearchText,
  setDateRange,
  clearFilters,
  setPriorityFilter,
} from '../store/slices/filterSlice';

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter);

  const setStatus = (status) => {
    dispatch(setStatusFilter(status));
  };

  const toggleCategory = (categoryId) => {
    dispatch(toggleCategoryFilter(categoryId));
  };

  const setSearch = (text) => {
    dispatch(setSearchText(text));
  };

  const setDate = (range) => {
    dispatch(setDateRange(range));
  };

  const setPriority = (priority) => {
    dispatch(setPriorityFilter(priority));
  };

  const clear = () => {
    dispatch(clearFilters());
  };

  return {
    filters,
    setStatus,
    toggleCategory,
    setSearch,
    setDateRange: setDate,
    setPriority,
    clearFilters: clear,
  };
};
