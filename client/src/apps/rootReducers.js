import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "~/features/app/appSlice";
import authReducer from "~/features/authentication/authSlice";
import billReducer from "~/features/bill/billSlice";
import bookingTripReducer from "~/features/bookingTrip/bookingTripSlice";
import deviceReducer from "~/features/devices/deviceSlice";
import floorReducer from "~/features/floors/floorSlice";
import hotelReducer from "~/features/hotels/hotelSlice";
import placeReducer from "~/features/place/placeSlice";
import proviceReducer from "~/features/provices/proviceSlice";
import revenueReducer from "~/features/revenue/revenueSlice";
import reviewReducer from "~/features/reviews/reviewSlice";
import roomTypeReducer from "~/features/room-types/roomTypeSlice";
import roomReducer from "~/features/rooms/roomSlice";
import statusReducer from "~/features/status/statusSlice";
import subPlaceReducer from "~/features/subPlace/subPlaceSlice";
import tripReducer from "~/features/trip/tripSlice";
import userReducer from "~/features/users/userSlice";

const rootReducers = combineReducers({
  auth: authReducer,
  app: appReducer,
  hotel: hotelReducer,
  provice: proviceReducer,
  floor: floorReducer,
  device: deviceReducer,
  roomType: roomTypeReducer,
  status: statusReducer,
  room: roomReducer,
  bill: billReducer,
  user: userReducer,
  revenue: revenueReducer,
  place: placeReducer,
  subPlace: subPlaceReducer,
  trip: tripReducer,
  bookingTrip: bookingTripReducer,
  review: reviewReducer,
});

export default rootReducers;
