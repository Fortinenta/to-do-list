import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuoteRequest } from '../store/slices/quoteSlice';

export const useQuote = () => {
  const dispatch = useDispatch();
  const { quoteData, loading, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchQuoteRequest());
  }, [dispatch]);

  return { quoteData, loading, error };
};
