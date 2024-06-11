import { all } from "redux-saga/effects";
import billSaga from "~/features/bill/billSaga";
import deviceSaga from "~/features/devices/deviceSaga";
import floorSaga from "~/features/floors/floorSaga";
import hotelSaga from "~/features/hotels/hotelSaga";
import placeSaga from "~/features/place/placeSaga";
import proviceSaga from "~/features/provices/proviceSaga";
import revenueSaga from "~/features/revenue/revenueSaga";
import roomTypeSaga from "~/features/room-types/roomTypeSaga";
import roomSaga from "~/features/rooms/roomSaga";
import statusSaga from "~/features/status/statusSaga";
import subPlaceSaga from "~/features/subPlace/subPlaceSaga";
import userSaga from "~/features/users/userSaga";
import authSaga from "../features/authentication/authSaga";
import tripSaga from "~/features/trip/tripSaga";
import bookingTripSaga from "~/features/bookingTrip/bookingTripSaga";
import reviewSaga from "~/features/reviews/reviewSaga";

function* rootSaga() {
  yield all([
    authSaga(),
    hotelSaga(),
    proviceSaga(),
    floorSaga(),
    deviceSaga(),
    roomTypeSaga(),
    statusSaga(),
    roomSaga(),
    billSaga(),
    userSaga(),
    revenueSaga(),
    placeSaga(),
    subPlaceSaga(),
    tripSaga(),
    bookingTripSaga(),
    reviewSaga(),
  ]);
}

export default rootSaga;
