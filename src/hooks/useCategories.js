import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesRequest } from '../store/slices/categorySlice';

export const useCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  return { categories, loading, error };
};
