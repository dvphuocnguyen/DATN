import { all, call, debounce, put, takeLatest } from "redux-saga/effects";
import { tripAPI } from "~/apis";
import { history } from "~/utils";
import { appActions } from "../app/appSlice";
import { reviewActions } from "./reviewSlice";

// * Create
function* fetchCreate({ payload }) {
  try {
    const response = yield call(tripAPI.addReview, payload);

    if (response) {
      yield put(reviewActions.createSucceed());
      yield put(appActions.setOpenOverlay(false));
      yield put(
        reviewActions.getAllStart({ where: "trip_id," + payload.trip_id, order: "created_at,desc" })
      );
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    if (error.response) {
      yield put(reviewActions.failed(error.response.data.message));
    } else {
      yield put(reviewActions.failed(error.message));
    }
  }
}

function* watchFetchCreate() {
  yield takeLatest(reviewActions.createStart.type, fetchCreate);
}

// * Delete
function* fetchDelete({ payload }) {
  try {
    const response = yield call(tripAPI.deleteReview, payload.id);

    if (response) {
      yield put(reviewActions.deleteSucceed());
      yield put(appActions.setOpenOverlay(false));
      yield put(
        reviewActions.getAllStart({ where: "trip_id," + payload.trip_id, order: "created_at,desc" })
      );
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    if (error.response) {
      yield put(reviewActions.failed(error.response.data.message));
    } else {
      yield put(reviewActions.failed(error.message));
    }
  }
}

function* watchFetchDelete() {
  yield takeLatest(reviewActions.deleteStart.type, fetchDelete);
}
// * getAll
function* fetchGetAll({ payload }) {
  try {
    const response = yield call(tripAPI.getReview, payload);

    if (response) {
      yield put(reviewActions.getAllSucceed(response.data));
    }
  } catch (error) {
    if (error.response) {
      yield put(reviewActions.failed(error.response.data.message));
    } else {
      yield put(reviewActions.failed(error.message));
    }
  }
}

function* watchFetchGetAll() {
  yield takeLatest(reviewActions.getAllStart.type, fetchGetAll);
}

// * Update
function* fetchUpdate({ payload }) {
  try {
    const response = yield call(tripAPI.toggleReview, payload);

    if (response) {
      yield put(reviewActions.updateSucceed());
      yield put(appActions.setOpenOverlay(false));
      yield put(appActions.setText(""));
      yield put(
        reviewActions.getAllStart({ where: "trip_id," + payload.trip_id, order: "created_at,desc" })
      );
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    yield put(appActions.setText(""));
    if (error.response) {
      yield put(reviewActions.failed(error.response.data.message));
    } else {
      yield put(reviewActions.failed(error.message));
    }
  }
}

function* watchFetchUpdate() {
  yield takeLatest(reviewActions.updateStart.type, fetchUpdate);
}

// * use debounce
function* handleSearchWithDebounce({ payload }) {
  yield put(reviewActions.setFilter(payload));
}

function* watchSetFilterWithDebounce() {
  yield debounce(500, reviewActions.setDebounceName.type, handleSearchWithDebounce);
}

function* reviewSaga() {
  yield all([
    watchFetchGetAll(),
    watchFetchCreate(),
    watchFetchUpdate(),
    watchSetFilterWithDebounce(),
    watchFetchDelete()
  ]);
}

export default reviewSaga;
