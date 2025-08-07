import { call, put, takeEvery } from 'redux-saga/effects';
import { categoryService } from '../../services/categoryService';
import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addCategorySuccess,
  addCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from '../slices/categorySlice';

function* fetchCategoriesSaga() {
  try {
    const categories = yield call(categoryService.getAllCategories);
    yield put(fetchCategoriesSuccess(categories));
  } catch (e) {
    yield put(fetchCategoriesFailure(e.message));
  }
}

function* addCategorySaga(action) {
  try {
    const newCategory = yield call(categoryService.addCategory, action.payload);
    yield put(addCategorySuccess(newCategory));
    yield put(fetchCategoriesRequest()); // Refresh categories after adding
  } catch (e) {
    yield put(addCategoryFailure(e.message));
  }
}

function* updateCategorySaga(action) {
  try {
    const { id, updatedFields } = action.payload;
    const updatedCategory = yield call(categoryService.updateCategory, id, updatedFields);
    if (updatedCategory) {
      yield put(updateCategorySuccess(updatedCategory));
      yield put(fetchCategoriesRequest()); // Refresh categories after updating
    } else {
      yield put(updateCategoryFailure('Category not found'));
    }
  } catch (e) {
    yield put(updateCategoryFailure(e.message));
  }
}

function* deleteCategorySaga(action) {
  try {
    const isDeleted = yield call(categoryService.deleteCategory, action.payload);
    if (isDeleted) {
      yield put(deleteCategorySuccess(action.payload));
      yield put(fetchCategoriesRequest()); // Refresh categories after deleting
    } else {
      yield put(deleteCategoryFailure('Category not found'));
    }
  } catch (e) {
    yield put(deleteCategoryFailure(e.message));
  }
}

export function* categorySaga() {
  yield takeEvery('category/fetchCategoriesRequest', fetchCategoriesSaga);
  yield takeEvery('category/addCategoryRequest', addCategorySaga);
  yield takeEvery('category/updateCategoryRequest', updateCategorySaga);
  yield takeEvery('category/deleteCategoryRequest', deleteCategorySaga);
}