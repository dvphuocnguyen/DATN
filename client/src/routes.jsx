import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Loadable from "./components/Loadable";
import PrivateRoutes from "./components/private-routes";
import PassLogin from "./components/private-routes/PassLogin";
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import SignInLayout from "./layouts/signInLayout";

// ----------------------------------------------------------------------

const DashboardApp = Loadable(lazy(() => import("./pages/DashboardApp")));
const Login = Loadable(lazy(() => import("./features/authentication/pages/Login")));
const NotFound = Loadable(lazy(() => import("./pages/Page404")));
const Register = Loadable(lazy(() => import("./features/authentication/pages/Register")));
const ChangePwd = Loadable(lazy(() => import("./features/authentication/pages/ChangePwd")));
const Home = Loadable(lazy(() => import("./pages/Home")));
const List = Loadable(lazy(() => import("./pages/List")));
const Hotel = Loadable(lazy(() => import("./pages/Hotel")));
const Booking = Loadable(lazy(() => import("./pages/Booking")));
const BookingInfo = Loadable(lazy(() => import("./pages/BookingInfo")));
const BookingTripInfo = Loadable(lazy(() => import("./pages/BookingTripInfo")));
const VNPayReturn = Loadable(lazy(() => import("./pages/VNPayReturn")));
const VerifyOtp = Loadable(lazy(() => import("./pages/VerifyOtp")));
const Profile = Loadable(lazy(() => import("./pages/Profile")));
const TripDetailsPage = Loadable(lazy(() => import("./pages/TripDetails")));
const ScheduleDetailsPage = Loadable(lazy(() => import("./pages/ScheduleDetail")));
const PlaceDetailsPage = Loadable(lazy(() => import("./pages/PlaceDetails")));
const NewTrip = Loadable(lazy(() => import("./pages/NewTrip")));
const Schedules = Loadable(lazy(() => import("./pages/Schedules")));
const ScheduleEdit = Loadable(lazy(() => import("./pages/PlanAddEditClient")));

// Manager hotel
const HotelManagePage = Loadable(lazy(() => import("./features/@dashboard/pages/hotels/Hotel")));
const HotelAddEdit = Loadable(
  lazy(() => import("./features/@dashboard/pages/hotels/HotelAddEdit"))
);

// Manager floor
const FloorManagePage = Loadable(lazy(() => import("./features/@dashboard/pages/floors/Floor")));

const FloorAddEdit = Loadable(
  lazy(() => import("./features/@dashboard/pages/floors/FloorAddEdit"))
);

// Manager device
const DeviceManagePage = Loadable(lazy(() => import("./features/@dashboard/pages/devices/Device")));

const DeviceAddEdit = Loadable(
  lazy(() => import("./features/@dashboard/pages/devices/DeviceAddEdit"))
);

// Manager room
const RoomManagePage = Loadable(lazy(() => import("./features/@dashboard/pages/rooms/Room")));

const RoomTypeManagePage = Loadable(
  lazy(() => import("./features/@dashboard/pages/rooms/RoomType"))
);

const RoomTypeAddEdit = Loadable(
  lazy(() => import("./features/@dashboard/pages/rooms/RoomTypeAddEdit"))
);

const RoomAddEdit = Loadable(lazy(() => import("./features/@dashboard/pages/rooms/RoomAddEdit")));

// Manage booking
const BookingManagePage = Loadable(
  lazy(() => import("./features/@dashboard/pages/booking/Booking"))
);

const BookingTripManagePage = Loadable(
  lazy(() => import("./features/@dashboard/pages/booking/BookingTrip"))
);

// Manage place
const PlaceManagePage = Loadable(lazy(() => import("./features/@dashboard/pages/place/Place")));
const PlaceAddEditPage = Loadable(
  lazy(() => import("./features/@dashboard/pages/place/PlaceAddEdit"))
);

// Manage /manager/sub-place
const SubPlaceManagePage = Loadable(
  lazy(() => import("./features/@dashboard/pages/subPlace/SubPlace"))
);
const SubPlaceAddEditPage = Loadable(
  lazy(() => import("./features/@dashboard/pages/subPlace/SubPlaceAddEdit"))
);

// Manage plan
const PlanManagePage = Loadable(lazy(() => import("./features/@dashboard/pages/plan/Plan")));
const PlanAddEditPage = Loadable(
  lazy(() => import("./features/@dashboard/pages/plan/PlanAddEdit"))
);

const StatusAddEdit = Loadable(
  lazy(() => import("./features/@dashboard/pages/status/StatusAddEdit"))
);

const UserPage = Loadable(lazy(() => import("./features/@dashboard/pages/users/User")));

export default function Router() {
  return useRoutes([
    {
      path: "/manager",
      element: (
        <PrivateRoutes>
          <DashboardLayout />
        </PrivateRoutes>
      ),
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <UserPage /> },
        {
          path: "hotel",
          element: <HotelManagePage />,
        },
        {
          path: "place",
          element: <PlaceManagePage />,
        },
        {
          path: "place/add",
          element: <PlaceAddEditPage />,
        },
        {
          path: "place/edit/:id",
          element: <PlaceAddEditPage />,
        },
        {
          path: "sub-place",
          element: <SubPlaceManagePage />,
        },
        {
          path: "sub-place/add",
          element: <SubPlaceAddEditPage />,
        },
        {
          path: "sub-place/edit/:id",
          element: <SubPlaceAddEditPage />,
        },
        {
          path: "plan",
          element: <PlanManagePage />,
        },
        {
          path: "plan/add",
          element: <PlanAddEditPage />,
        },
        {
          path: "plan/edit/:id",
          element: <PlanAddEditPage />,
        },
        {
          path: "hotel/add",
          element: <HotelAddEdit />,
        },
        {
          path: "hotel/update/:hotelId",
          element: <HotelAddEdit />,
        },
        {
          path: "floor",
          element: <FloorManagePage />,
        },
        {
          path: "floor/add",
          element: <FloorAddEdit />,
        },
        {
          path: "floor/update/:floorId",
          element: <FloorAddEdit />,
        },
        {
          path: "device",
          element: <DeviceManagePage />,
        },
        {
          path: "device/add",
          element: <DeviceAddEdit />,
        },
        {
          path: "device/update/:deviceId",
          element: <DeviceAddEdit />,
        },
        {
          path: "room",
          element: <RoomManagePage />,
        },
        {
          path: "room/add",
          element: <RoomAddEdit />,
        },
        {
          path: "room/update/:roomId",
          element: <RoomAddEdit />,
        },
        {
          path: "room-type",
          element: <RoomTypeManagePage />,
        },
        {
          path: "room-type/add",
          element: <RoomTypeAddEdit />,
        },
        {
          path: "room-type/update/:roomTypeId",
          element: <RoomTypeAddEdit />,
        },
        {
          path: "status/add",
          element: <StatusAddEdit />,
        },
        {
          path: "status/update/:statusId",
          element: <StatusAddEdit />,
        },
        {
          path: "booking",
          element: <BookingManagePage />,
        },
        {
          path: "booking-trip",
          element: <BookingTripManagePage />,
        },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "return",
          element: <VNPayReturn />,
        },
        {
          path: "trip/new",
          element: <NewTrip />,
        },
        {
          path: "trip/:id",
          element: <TripDetailsPage />,
        },
        {
          path: "schedule/:id",
          element: <ScheduleDetailsPage />,
        },
        {
          path: "schedule/edit/:id",
          element: <ScheduleEdit />,
        },
        {
          path: "schedules",
          element: <Schedules />,
        },
        {
          path: "place/:id",
          element: <PlaceDetailsPage />,
        },
        {
          path: "hotels",
          element: <List />,
        },
        {
          path: "hotels/:hotelSlug",
          element: <Hotel />,
        },
        {
          path: "booking",
          element: <Booking />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "verify-otp/:userId",
          element: <VerifyOtp />,
        },
        {
          path: "register/:key",
          element: <Register />,
        },
        {
          path: "booking/info",
          element: <BookingInfo />,
        },
        {
          path: "booking-trip/info",
          element: <BookingTripInfo />,
        },
        { path: "change-password", element: <ChangePwd /> },
        { path: "sign-up", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/",
      element: <SignInLayout />,
      children: [
        {
          path: "sign-in",
          element: (
            <PassLogin>
              <Login />
            </PassLogin>
          ),
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
