import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quoteData: null,
  loading: false,
  error: null,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    fetchQuoteRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchQuoteSuccess: (state, action) => {
      state.loading = false;
      state.quoteData = action.payload;
    },
    fetchQuoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuoteRequest,
  fetchQuoteSuccess,
  fetchQuoteFailure,
} = quoteSlice.actions;

export default quoteSlice.reducer;
