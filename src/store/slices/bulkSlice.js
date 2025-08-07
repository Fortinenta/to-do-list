import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItemIds: [],
};

const bulkSlice = createSlice({
  name: 'bulk',
  initialState,
  reducers: {
    toggleSelectItem: (state, action) => {
      const id = action.payload;
      if (state.selectedItemIds.includes(id)) {
        state.selectedItemIds = state.selectedItemIds.filter(itemId => itemId !== id);
      } else {
        state.selectedItemIds.push(id);
      }
    },
    selectAllItems: (state, action) => {
      state.selectedItemIds = action.payload; // Expects an array of IDs
    },
    clearSelectedItems: (state) => {
      state.selectedItemIds = [];
    },
  },
});

export const {
  toggleSelectItem,
  selectAllItems,
  clearSelectedItems,
} = bulkSlice.actions;

export default bulkSlice.reducer;
