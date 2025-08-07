import { all } from 'redux-saga/effects';
import { todoSaga } from './todoSaga';
import { categorySaga } from './categorySaga';
import { weatherSaga } from './weatherSaga';
import { quoteSaga } from './quoteSaga';

export default function* rootSaga() {
  yield all([
    todoSaga(),
    categorySaga(),
    weatherSaga(),
    quoteSaga(),
  ]);
}