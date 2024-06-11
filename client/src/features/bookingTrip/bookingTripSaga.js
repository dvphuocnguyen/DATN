import { all, call, debounce, put, takeLatest } from "redux-saga/effects";
import { bookingTripAPI } from "~/apis";
import { history } from "~/utils";
import { appActions } from "../app/appSlice";
import { bookingTripActions } from "./bookingTripSlice";

// * Create
function* fetchCreate({ payload }) {
  try {
    const response = yield call(bookingTripAPI.create, payload);

    if (response) {
      yield put(bookingTripActions.createSucceed());
      yield put(appActions.setOpenOverlay(false));
      window.location.href = response?.data;
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    if (error.response) {
      yield put(bookingTripActions.failed(error.response.data.message));
    } else {
      yield put(bookingTripActions.failed(error.message));
    }
  }
}

function* watchFetchCreate() {
  yield takeLatest(bookingTripActions.createStart.type, fetchCreate);
}

// * CONFIRM
function* fetchConfirmBookingTrip({ payload }) {
  try {
    const response = yield call(bookingTripAPI.update, payload);

    if (response) {
      yield put(bookingTripActions.createSucceed());
      yield put(appActions.setOpenOverlay(false));
      yield put(
        bookingTripActions.getAllStart({
          limit: 5,
          page: 1,
          where: "user_id," + payload.data.user_id,
        })
      );
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    if (error.response) {
      yield put(bookingTripActions.failed(error.response.data.message));
    } else {
      yield put(bookingTripActions.failed(error.message));
    }
  }
}

function* watchFetchConfirmBookingTrip() {
  yield takeLatest(bookingTripActions.confirmBookingTripStart.type, fetchConfirmBookingTrip);
}

// * getAll
function* fetchGetAll({ payload }) {
  try {
    const response = yield call(bookingTripAPI.getAll, payload);

    if (response) {
      yield put(bookingTripActions.getAllSucceed(response.data));
    }
  } catch (error) {
    if (error.response) {
      yield put(bookingTripActions.failed(error.response.data.message));
    } else {
      yield put(bookingTripActions.failed(error.message));
    }
  }
}

function* watchFetchGetAll() {
  yield takeLatest(bookingTripActions.getAllStart.type, fetchGetAll);
}

// * Update
function* fetchUpdate({ payload }) {
  try {
    const response = yield call(bookingTripAPI.update, payload);

    if (response) {
      yield put(bookingTripActions.updateSucceed());
      yield put(appActions.setOpenOverlay(false));
      yield put(appActions.setText(""));
      history.push("/manager/sub-place");
    }
  } catch (error) {
    yield put(appActions.setOpenOverlay(false));
    yield put(appActions.setText(""));
    if (error.response) {
      yield put(bookingTripActions.failed(error.response.data.message));
    } else {
      yield put(bookingTripActions.failed(error.message));
    }
  }
}

function* watchFetchUpdate() {
  yield takeLatest(bookingTripActions.updateStart.type, fetchUpdate);
}

// * use debounce
function* handleSearchWithDebounce({ payload }) {
  yield put(bookingTripActions.setFilter(payload));
}

function* watchSetFilterWithDebounce() {
  yield debounce(500, bookingTripActions.setDebounceName.type, handleSearchWithDebounce);
}

function* bookingTripSaga() {
  yield all([
    watchFetchGetAll(),
    watchFetchCreate(),
    watchFetchUpdate(),
    watchSetFilterWithDebounce(),
    watchFetchConfirmBookingTrip(),
  ]);
}

export default bookingTripSaga;
