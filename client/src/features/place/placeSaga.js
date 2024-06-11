import { all, call, debounce, put, takeLatest, delay } from "redux-saga/effects";
import { areaAPI, tripAPI } from "~/apis";
import { history } from "~/utils";
import { appActions } from "../app/appSlice";
import { placeActions } from "./placeSlice";

// * Create
function* fetchCreate({ payload }) {
  try {
    const response = yield call(areaAPI.create, payload);

    if (response) {
      yield put(placeActions.createSucceed());
      yield put(appActions.setOpenOverlay(false));
      history.push("/manager/place");
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    if (error.response) {
      yield put(placeActions.failed(error.response.data.message));
    } else {
      yield put(placeActions.failed(error.message));
    }
  }
}

function* watchFetchCreate() {
  yield takeLatest(placeActions.createStart.type, fetchCreate);
}

// * Create by User
function* fetchCreateByUser({ payload }) {
  try {
    yield delay(1000);

    const response = yield call(tripAPI.createByUser, payload);

    if (response) {
      yield put(placeActions.createSucceed());
      console.log(`response:: `, response);
      history.push(`/schedule/${response.data}`);
    }
  } catch (error) {
    if (error.response) {
      yield put(placeActions.failed(error.response.data.message));
    } else {
      yield put(placeActions.failed(error.message));
    }
  } finally {
    yield put(appActions.setOpenOverlay(false));
    yield put(appActions.setText(""));
  }
}

function* watchFetchByUser() {
  yield takeLatest(placeActions.createByUserStart.type, fetchCreateByUser);
}

// * getAll
function* fetchGetAll({ payload }) {
  try {
    const response = yield call(areaAPI.getAll, payload);

    if (response) {
      yield put(placeActions.getAllSucceed(response.data));
    }
  } catch (error) {
    if (error.response) {
      yield put(placeActions.failed(error.response.data.message));
    } else {
      yield put(placeActions.failed(error.message));
    }
  }
}

function* watchFetchGetAll() {
  yield takeLatest(placeActions.getAllStart.type, fetchGetAll);
}

// * Update
function* fetchUpdate({ payload }) {
  try {
    const response = yield call(areaAPI.update, payload);

    if (response) {
      yield put(placeActions.updateSucceed());
      yield put(appActions.setOpenOverlay(false));
      yield put(appActions.setText(""));
      history.push("/manager/place");
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    yield put(appActions.setText(""));
    if (error.response) {
      yield put(placeActions.failed(error.response.data.message));
    } else {
      yield put(placeActions.failed(error.message));
    }
  }
}

function* watchFetchUpdate() {
  yield takeLatest(placeActions.updateStart.type, fetchUpdate);
}

// * use debounce
function* handleSearchWithDebounce({ payload }) {
  yield put(placeActions.setFilter(payload));
}

function* watchSetFilterWithDebounce() {
  yield debounce(500, placeActions.setDebounceName.type, handleSearchWithDebounce);
}

function* placeSaga() {
  yield all([
    watchFetchGetAll(),
    watchFetchCreate(),
    watchFetchUpdate(),
    watchSetFilterWithDebounce(),
    watchFetchByUser(),
  ]);
}

export default placeSaga;
