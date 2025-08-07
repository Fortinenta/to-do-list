import { call, put, takeLatest } from 'redux-saga/effects';
import { weatherService } from '../../services/weatherService';
import {
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from '../slices/weatherSlice';

function* fetchWeatherSaga(action) {
  try {
    const city = action.payload;
    const weatherData = yield call(weatherService.getCurrentWeather, city);
    yield put(fetchWeatherSuccess(weatherData));
  } catch (e) {
    yield put(fetchWeatherFailure(e.message));
  }
}

export function* weatherSaga() {
  yield takeLatest('weather/fetchWeatherRequest', fetchWeatherSaga);
}
