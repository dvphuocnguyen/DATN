export const OPTION_TYPES = {
  HOTEL: "HOTEL",
  TOUR: "TOUR",
};

export const UNLIMITED = 9999999999;

export const APPLICATION_NAME = "TripShare";

export const DEFAULT_BREAKPOINT = {
  100: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 8,
  },
};

export const statusBookingTrip = {
  pending: {
    text: "Chờ duyệt",
    color: "warning",
  },
  confirmed: {
    text: "Đã duyệt",
    color: "success",
  },
  canceled: {
    text: "Khách đã hủy",
    color: "error",
  },
};
