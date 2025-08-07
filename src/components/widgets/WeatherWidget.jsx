import React from 'react';
import PropTypes from 'prop-types';
import { useWeather } from '../../hooks/useWeather';
import LoadingSpinner from '../common/LoadingSpinner';

function WeatherWidget({ city = 'Malang' }) {
  const { weatherData, loading, error } = useWeather(city);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center h-32">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-32 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-32 flex items-center justify-center text-gray-500">
        No weather data available.
      </div>
    );
  }

  const { name, main, weather } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weather in {name}</h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{main.temp}°C</p>
        <p className="text-gray-600 dark:text-gray-300 capitalize">{weather[0].description}</p>
      </div>
      <img src={iconUrl} alt={weather[0].description} className="w-20 h-20" />
    </div>
  );
}

WeatherWidget.propTypes = {
  city: PropTypes.string,
};

export default WeatherWidget;
