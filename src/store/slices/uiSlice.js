import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  isModalOpen: false,
  modalContent: null,
  isConfirmDialogOpen: false,
  confirmDialogContent: null,
  isLoading: false,
  theme: 'light', // 'light' or 'dark'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
    },
    openConfirmDialog: (state, action) => {
      state.isConfirmDialogOpen = true;
      state.confirmDialogContent = action.payload;
    },
    closeConfirmDialog: (state) => {
      state.isConfirmDialogOpen = false;
      state.confirmDialogContent = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  openConfirmDialog,
  closeConfirmDialog,
  setLoading,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
