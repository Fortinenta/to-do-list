import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'all', // all, active, completed
  category: [],
  searchText: '',
  priority: 'all', // all, high, medium, low
  dateRange: {
    type: 'all', // all, today, this_week, this_month, custom
    startDate: null,
    endDate: null,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    toggleCategoryFilter: (state, action) => {
      const categoryId = action.payload;
      if (state.category.includes(categoryId)) {
        state.category = state.category.filter(id => id !== categoryId);
      } else {
        state.category.push(categoryId);
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setDateRangeFilter: (state, action) => {
      state.dateRange = { ...state.dateRange, ...action.payload };
    },
    clearFilters: () => initialState,
    setPriorityFilter: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export const { 
  setStatusFilter, 
  toggleCategoryFilter, 
  setSearchText, 
  setDateRange, 
  clearFilters,
  setPriorityFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
