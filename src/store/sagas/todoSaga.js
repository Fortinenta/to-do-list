import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { todoService } from '../../services/todoService';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  addTodoFailure,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
  bulkUpdateTodosSuccess,
  bulkUpdateTodosFailure,
  bulkDeleteTodosSuccess,
  bulkDeleteTodosFailure,
} from '../slices/todoSlice';

function* fetchTodosSaga() {
  try {
    const todos = yield call(todoService.getAllTodos);
    yield put(fetchTodosSuccess(todos));
  } catch (e) {
    yield put(fetchTodosFailure(e.message));
  }
}

function* addTodoSaga(action) {
  try {
    const newTodo = yield call(todoService.addTodo, action.payload);
    yield put(addTodoSuccess(newTodo));
    yield put(fetchTodosRequest()); // Refresh todos after adding
  } catch (e) {
    yield put(addTodoFailure(e.message));
  }
}

function* updateTodoSaga(action) {
  try {
    const { id, updatedFields } = action.payload;
    const updatedTodo = yield call(todoService.updateTodo, id, updatedFields);
    if (updatedTodo) {
      yield put(updateTodoSuccess(updatedTodo));
      yield put(fetchTodosRequest()); // Refresh todos after updating
    } else {
      yield put(updateTodoFailure('Todo not found'));
    }
  } catch (e) {
    yield put(updateTodoFailure(e.message));
  }
}

function* deleteTodoSaga(action) {
  try {
    const isDeleted = yield call(todoService.deleteTodo, action.payload);
    if (isDeleted) {
      yield put(deleteTodoSuccess(action.payload));
      yield put(fetchTodosRequest()); // Refresh todos after deleting
    } else {
      yield put(deleteTodoFailure('Todo not found'));
    }
  } catch (e) {
    yield put(deleteTodoFailure(e.message));
  }
}

function* bulkUpdateTodosSaga(action) {
  try {
    const { ids, updatedFields } = action.payload;
    yield call(todoService.updateMultipleTodos, ids, updatedFields);
    yield put(bulkUpdateTodosSuccess(action.payload));
    yield put(fetchTodosRequest()); // Refresh todos after bulk update
  } catch (e) {
    yield put(bulkUpdateTodosFailure(e.message));
  }
}

function* bulkDeleteTodosSaga(action) {
  try {
    const ids = action.payload;
    yield call(todoService.deleteMultipleTodos, ids);
    yield put(bulkDeleteTodosSuccess(ids));
    yield put(fetchTodosRequest()); // Refresh todos after bulk delete
  } catch (e) {
    yield put(bulkDeleteTodosFailure(e.message));
  }
}

export function* todoSaga() {
  yield takeEvery('todo/fetchTodosRequest', fetchTodosSaga);
  yield takeEvery('todo/addTodoRequest', addTodoSaga);
  yield takeEvery('todo/updateTodoRequest', updateTodoSaga);
  yield takeEvery('todo/deleteTodoRequest', deleteTodoSaga);
  yield takeEvery('todo/bulkUpdateTodosRequest', bulkUpdateTodosSaga);
  yield takeEvery('todo/bulkDeleteTodosRequest', bulkDeleteTodosSaga);
}