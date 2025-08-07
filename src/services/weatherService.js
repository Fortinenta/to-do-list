import axios from 'axios';

const WEATHER_API_KEY = 'eba82f3299230a11a499f2686ad5760e';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  getCurrentWeather: async (city = 'Malang') => {
    const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  }
};
