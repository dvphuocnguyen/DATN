// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/manager/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Quản lý người dùng",
    path: "/manager/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Quản lý địa điểm",
    path: "/manager/place",
    icon: getIcon("mdi:place"),
  },
  {
    title: "Địa điểm lân cận",
    path: "/manager/sub-place",
    icon: getIcon("mdi:place"),
  },
  {
    title: "Quản lý lịch trình",
    path: "/manager/plan",
    icon: getIcon("icon-park-solid:plan"),
  },
  {
    title: "Quản lý đặt phòng",
    path: "/manager/booking",
    icon: getIcon("tabler:brand-booking"),
  },
  {
    title: "Quản lý chuyến đi",
    path: "/manager/booking-trip",
    icon: getIcon("tabler:brand-booking"),
  },
  {
    title: "Quản lý khách sạn",
    path: "/manager/hotel",
    icon: getIcon("carbon:manage-protection"),
  },
  {
    title: "Quản lý tầng",
    path: "/manager/floor",
    icon: getIcon("material-symbols:floor"),
  },
  {
    title: "Quản lý thiết bị",
    path: "/manager/device",
    icon: getIcon("material-symbols:device-hub"),
  },
  {
    title: "Quản lý loại phòng",
    path: "/manager/room-type",
    icon: getIcon("ic:round-room-preferences"),
  },
  {
    title: "Quản lý phòng",
    path: "/manager/room",
    icon: getIcon("material-symbols:auto-meeting-room"),
  },
];

export const navConfigHotel = [
  {
    title: "dashboard",
    path: "/manager/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Quản lý đặt phòng",
    path: "/manager/booking",
    icon: getIcon("tabler:brand-booking"),
  },
  {
    title: "Quản lý khách sạn",
    path: "/manager/hotel",
    icon: getIcon("carbon:manage-protection"),
  },
  {
    title: "Quản lý tầng",
    path: "/manager/floor",
    icon: getIcon("material-symbols:floor"),
  },
  {
    title: "Quản lý thiết bị",
    path: "/manager/device",
    icon: getIcon("material-symbols:device-hub"),
  },
  {
    title: "Quản lý phòng",
    path: "/manager/room",
    icon: getIcon("material-symbols:auto-meeting-room"),
  },
];

export default navConfig;
