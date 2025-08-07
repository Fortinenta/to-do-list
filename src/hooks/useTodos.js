import { useSelector } from 'react-redux';

export const useTodos = () => {
  const { todos, loading, error } = useSelector((state) => state.todo);
  return { todos, loading, error };
};
