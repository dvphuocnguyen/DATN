import {
  areaRouter,
  authRouter,
  billDetailRouter,
  billRouter,
  bookingTripRoute,
  deviceTypeRouter,
  equipmentRouter,
  floorRouter,
  hotelImageRouter,
  hotelRouter,
  placeRouter,
  registerRouter,
  revenueRouter,
  roomImageRouter,
  roomPriceRouter,
  roomRouter,
  roomTypeRouter,
  serviceRouter,
  statusRouter,
  tripRouter,
  uploadRouter,
  userRouter,
  useServiceRouter,
  vnPayRouter,
} from "../apis/v1/index.js";

function initRouteApi(app) {
  app.use("/api/v1/uploads", uploadRouter);
  app.use("/api/v1/statuses", statusRouter);
  app.use("/api/v1/hotels", hotelRouter);
  app.use("/api/v1/registers", registerRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/services", serviceRouter);
  app.use("/api/v1/hotel-images", hotelImageRouter);
  app.use("/api/v1/device-types", deviceTypeRouter);
  app.use("/api/v1/floors", floorRouter);
  app.use("/api/v1/room-types", roomTypeRouter);
  app.use("/api/v1/room-images", roomImageRouter);
  app.use("/api/v1/rooms", roomRouter);
  app.use("/api/v1/room-prices", roomPriceRouter);
  app.use("/api/v1/equipments", equipmentRouter);
  app.use("/api/v1/bills", billRouter);
  app.use("/api/v1/bill-details", billDetailRouter);
  app.use("/api/v1/use-services", useServiceRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/areas", areaRouter);
  app.use("/api/v1/vn-pay", vnPayRouter);
  app.use("/api/v1/revenue", revenueRouter);
  app.use("/api/v1/places", placeRouter);
  app.use("/api/v1/trips", tripRouter);
  app.use("/api/v1/booking-trip", bookingTripRoute);
}

export default initRouteApi;
