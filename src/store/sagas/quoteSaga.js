import { call, put, takeLatest } from 'redux-saga/effects';
import { quoteService } from '../../services/quoteService';
import {
  fetchQuoteSuccess,
  fetchQuoteFailure,
} from '../slices/quoteSlice';

function* fetchQuoteSaga() {
  try {
    const quoteData = yield call(quoteService.getDailyQuote);
    yield put(fetchQuoteSuccess(quoteData));
  } catch (e) {
    yield put(fetchQuoteFailure(e.message));
  }
}

export function* quoteSaga() {
  yield takeLatest('quote/fetchQuoteRequest', fetchQuoteSaga);
}
