import { all, call, debounce, put, takeLatest } from "redux-saga/effects";
import { tripAPI } from "~/apis";
import { history } from "~/utils";
import { appActions } from "../app/appSlice";
import { tripActions } from "./tripSlice";

// * Create
function* fetchCreate({ payload }) {
  try {
    const response = yield call(tripAPI.create, payload);

    if (response) {
      yield put(tripActions.createSucceed());
      yield put(appActions.setOpenOverlay(false));
      history.push("/manager/plan");
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    if (error.response) {
      yield put(tripActions.failed(error.response.data.message));
    } else {
      yield put(tripActions.failed(error.message));
    }
  }
}

function* watchFetchCreate() {
  yield takeLatest(tripActions.createStart.type, fetchCreate);
}

// * getAll
function* fetchGetAll({ payload }) {
  try {
    const response = yield call(tripAPI.getAll, payload);

    if (response) {
      yield put(tripActions.getAllSucceed(response.data));
    }
  } catch (error) {
    if (error.response) {
      yield put(tripActions.failed(error.response.data.message));
    } else {
      yield put(tripActions.failed(error.message));
    }
  }
}

function* watchFetchGetAll() {
  yield takeLatest(tripActions.getAllStart.type, fetchGetAll);
}

// * Update
function* fetchUpdate({ payload }) {
  try {
    const response = yield call(tripAPI.update, payload);

    if (response) {
      yield put(tripActions.updateSucceed());
      yield put(appActions.setOpenOverlay(false));
      yield put(appActions.setText(""));
      history.back();
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    yield put(appActions.setText(""));
    if (error.response) {
      yield put(tripActions.failed(error.response.data.message));
    } else {
      yield put(tripActions.failed(error.message));
    }
  }
}

function* watchFetchUpdate() {
  yield takeLatest(tripActions.updateStart.type, fetchUpdate);
}

// * use debounce
function* handleSearchWithDebounce({ payload }) {
  yield put(tripActions.setFilter(payload));
}

function* watchSetFilterWithDebounce() {
  yield debounce(500, tripActions.setDebounceName.type, handleSearchWithDebounce);
}

function* tripSaga() {
  yield all([
    watchFetchGetAll(),
    watchFetchCreate(),
    watchFetchUpdate(),
    watchSetFilterWithDebounce(),
  ]);
}

export default tripSaga;
