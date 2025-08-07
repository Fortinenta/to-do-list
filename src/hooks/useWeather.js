import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherRequest } from '../store/slices/weatherSlice';

export const useWeather = (city = 'Malang') => {
  const dispatch = useDispatch();
  const { weatherData, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeatherRequest(city));
  }, [dispatch, city]);

  return { weatherData, loading, error };
};
