import { all, call, debounce, put, takeLatest } from "redux-saga/effects";
import { placeAPI } from "~/apis";
import { history } from "~/utils";
import { appActions } from "../app/appSlice";
import { subPlaceActions } from "./subPlaceSlice";

// * Create
function* fetchCreate({ payload }) {
  try {
    const response = yield call(placeAPI.create, payload);

    if (response) {
      yield put(subPlaceActions.createSucceed());
      yield put(appActions.setOpenOverlay(false));
      history.push("/manager/sub-place");
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    if (error.response) {
      yield put(subPlaceActions.failed(error.response.data.message));
    } else {
      yield put(subPlaceActions.failed(error.message));
    }
  }
}

function* watchFetchCreate() {
  yield takeLatest(subPlaceActions.createStart.type, fetchCreate);
}

// * getAll
function* fetchGetAll({ payload }) {
  try {
    const response = yield call(placeAPI.getAll, payload);

    if (response) {
      yield put(subPlaceActions.getAllSucceed(response.data));
    }
  } catch (error) {
    if (error.response) {
      yield put(subPlaceActions.failed(error.response.data.message));
    } else {
      yield put(subPlaceActions.failed(error.message));
    }
  }
}

function* watchFetchGetAll() {
  yield takeLatest(subPlaceActions.getAllStart.type, fetchGetAll);
}

// * Update
function* fetchUpdate({ payload }) {
  try {
    const response = yield call(placeAPI.update, payload);

    if (response) {
      yield put(subPlaceActions.updateSucceed());
      yield put(appActions.setOpenOverlay(false));
      yield put(appActions.setText(""));
      history.push("/manager/sub-place");
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    yield put(appActions.setText(""));
    if (error.response) {
      yield put(subPlaceActions.failed(error.response.data.message));
    } else {
      yield put(subPlaceActions.failed(error.message));
    }
  }
}

function* watchFetchUpdate() {
  yield takeLatest(subPlaceActions.updateStart.type, fetchUpdate);
}

// * use debounce
function* handleSearchWithDebounce({ payload }) {
  yield put(subPlaceActions.setFilter(payload));
}

function* watchSetFilterWithDebounce() {
  yield debounce(500, subPlaceActions.setDebounceName.type, handleSearchWithDebounce);
}

function* subPlaceSaga() {
  yield all([
    watchFetchGetAll(),
    watchFetchCreate(),
    watchFetchUpdate(),
    watchSetFilterWithDebounce(),
  ]);
}

export default subPlaceSaga;
