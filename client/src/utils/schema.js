import * as Yup from "yup";

const phoneRegExp = /((0[1|2|3|4|5|6|7|8|9])+([0-9]{8})\b)/g;

export const hotetAddSchema = Yup.object().shape({
  hotel_name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Vui lòng không bỏ trống!"),
  hotel_desc: Yup.string().required("Vui lòng không bỏ trống!"),
  hotel_address: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Vui lòng không bỏ trống!"),
  provice_code: Yup.string().required("Vui lòng chọn tỉnh thành!"),
  district_code: Yup.string().required("Vui lòng chọn quận huyện!"),
  ward_code: Yup.string().required("Vui lòng chọn xã phường!"),
  provice_name: Yup.string().required("Vui lòng chọn tỉnh thành!"),
  district_name: Yup.string().required("Vui lòng chọn quận huyện!"),
  tax: Yup.number()
    .min(0.1, "Ít nhất 0,1 phầm trăm")
    .max(100, "Nhiều nhất 100% phần trắm")
    .required("Vui lòng nhập phần trăm thuế"),
  ward_name: Yup.string().required("Vui lòng chọn xã phường!"),
});

export const florAddSchema = Yup.object().shape({
  floor_name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Vui lòng không bỏ trống!"),
  floor_type: Yup.string().required("Vui lòng không bỏ trống!"),
  hotel_id: Yup.string().required("Vui lòng không bỏ trống!"),
});

export const deviceAddSchema = Yup.object().shape({
  dt_name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Vui lòng không bỏ trống!"),
  dt_desc: Yup.string().required("Vui lòng không bỏ trống!"),
});

export const roomTypeAddSchema = Yup.object().shape({
  rt_name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Vui lòng không bỏ trống!"),
  rt_desc: Yup.string().required("Vui lòng không bỏ trống!"),
  rt_type: Yup.string().required("Vui lòng không bỏ trống!"),
});

export const statusAddSchema = Yup.object().shape({
  type: Yup.string()
    .min(2, "Ít nhất 2 kí tự!")
    .max(10, "Nhiều nhất 10 kí tự!")
    .required("Vui lòng không bỏ trống!"),
  desc: Yup.string().required("Vui lòng không bỏ trống!"),
  key: Yup.string()
    .min(2, "Ít nhất 2 kí tự!")
    .max(5, "Nhiều nhất 6 kí tự!")
    .required("Vui lòng không bỏ trống!"),
  value: Yup.string()
    .min(2, "Ít nhất 2 kí tự!")
    .max(20, "Nhiều nhất 20 kí tự!")
    .required("Vui lòng không bỏ trống!"),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Quá ngắn!").max(50, "Quá dài!").required("Họ là trường bắt buộc"),
  lastName: Yup.string().min(2, "Quá ngắn!").max(50, "Quá dài!").required("Tên là trường bắt buộc"),
  email: Yup.string()
    .email("E-mail phải là một địa chỉ email hợp lệ")
    .required("E-mail là trường bắt buộc"),
  password: Yup.string().required("Mật khẩu là trường bắt buộc"),
  username: Yup.string().required("Tài khoản là trường bắt buộc"),
  phone: Yup.string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
});

export const roomAddSchema = Yup.object().shape({
  room_name: Yup.string()
    .min(2, "Ít nhất 2 kí tự!")
    .max(50, "Nhiều nhất 50 kí tự!")
    .required("Vui lòng không bỏ trống!"),
  room_desc: Yup.string().required("Vui lòng không bỏ trống!"),
  room_quantity: Yup.number().min(1, "Ít nhất 1 phòng").required("Vui lòng không bỏ trống!"),
  max_people: Yup.number()
    .min(1, "Ít nhất 1 người!")
    .max(10, "Nhiều nhất 10 người!")
    .required("Vui lòng không bỏ trống!"),
  hotel_id: Yup.string().required("Vui lòng không bỏ trống!"),
  floor_id: Yup.string().required("Vui lòng không bỏ trống!"),
  rt_id: Yup.string().required("Vui lòng không bỏ trống!"),
  status_id: Yup.string().required("Vui lòng không bỏ trống!"),
  price: Yup.number().min(200000, "Giá thấp nhất là 200,000 vnđ").required("Vui lòng nhập giá"),
  discount: Yup.boolean(),
  percent_discount: Yup.number().when("discount", {
    is: true,
    then: (schema) =>
      schema
        .min(0.1, "Ít nhất 0,1 phầm trăm")
        .max(100, "Nhiều nhất 100% phần trắm")
        .required("Vui lòng nhập phần trăm giảm giá"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const schemaBooking = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Họ là trường bắt buộc"),
  last_name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Tên là trường bắt buộc"),
  email: Yup.string()
    .email("E-mail phải là một địa chỉ email hợp lệ")
    .required("E-mail là trường bắt buộc"),
  phone: Yup.string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
  time_destination: Yup.string().notRequired(),
  note: Yup.string().notRequired(),
  bookingFor: Yup.string(),
  customer_fullname: Yup.string().when("bookingFor", {
    is: "CUSTOMER",
    then: (schema) =>
      schema.min(2, "Quá ngắn!").max(50, "Quá dài!").required("Họ là trường bắt buộc"),
    otherwise: (schema) => schema.notRequired(),
  }),
  customer_email: Yup.string().when("bookingFor", {
    is: "CUSTOMER",
    then: (schema) =>
      schema.email("E-mail phải là một địa chỉ email hợp lệ").required("E-mail là trường bắt buộc"),
    otherwise: (schema) => schema.notRequired(),
  }),
  payment: Yup.string(),
});

export const ProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Họ là trường bắt buộc"),
  last_name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(50, "Quá dài!")
    .required("Tên là trường bắt buộc"),
  email: Yup.string()
    .email("E-mail phải là một địa chỉ email hợp lệ")
    .required("E-mail là trường bắt buộc"),
  username: Yup.string().required("Tài khoản là trường bắt buộc"),
  phone: Yup.string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
});

export const placeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(255, "Quá dài!")
    .required("Tên địa điểm là trường bắt buộc"),
  hotel_address: Yup.string()
    .min(2, "Quá ngắn!")
    .max(255, "Quá dài!")
    .required("Địa chỉ là trường bắt buộc"),
  thumb: Yup.mixed(),
  images: Yup.array(),
  description: Yup.string().notRequired(),
  district_name: Yup.string().required("Bắt buộc"),
  district_code: Yup.string().required("Bắt buộc"),
  provice_code: Yup.string().required("Bắt buộc"),
  provice_name: Yup.string().required("Bắt buộc"),
  ward_code: Yup.string().required("Bắt buộc"),
  ward_name: Yup.string().required("Bắt buộc"),
  location: Yup.mixed().notRequired(),
});

export const subPlaceSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Quá ngắn!")
    .max(255, "Quá dài!")
    .required("Tên địa điểm là trường bắt buộc"),
  hotel_address: Yup.string()
    .min(2, "Quá ngắn!")
    .max(255, "Quá dài!")
    .required("Địa chỉ là trường bắt buộc"),
  thumb: Yup.mixed(),
  images: Yup.array(),
  description: Yup.string().notRequired(),
  district_name: Yup.string().required("Bắt buộc"),
  district_code: Yup.string().required("Bắt buộc"),
  provice_code: Yup.string().required("Bắt buộc"),
  provice_name: Yup.string().required("Bắt buộc"),
  ward_code: Yup.string().required("Bắt buộc"),
  ward_name: Yup.string().required("Bắt buộc"),
  location: Yup.mixed().notRequired(),
  area_id: Yup.string().required("Bắt buộc"),
});

export const tripSchema = Yup.object().shape({
  name: Yup.string().min(2, "Quá ngắn!").max(255, "Quá dài!").required("Bắt buộc"),
  total_day: Yup.number().min(2, "Ít nhất 2 ngày").max(5, "Nhiều nhất 5 ngày").required("Bắt buộc"),
  destination_id: Yup.string().required("Bắt buộc"),
  description: Yup.string().min(10, "Ít nhất 10 kí tự").required("Bắt buộc"),
  trip_fee: Yup.number().required("Bắt buộc"),
  hotel_fee: Yup.number().notRequired(),
  user_id: Yup.string().notRequired(),
  hotel_id: Yup.string().notRequired(),
  trip_details: Yup.mixed().notRequired(),
});

export const bookingTripSchema = Yup.object().shape({
  user_id: Yup.string().required("Bắt buộc"),
  trip_id: Yup.string().required("Bắt buộc"),
  hotel_id: Yup.string().notRequired(),
  phone: Yup.string().required("Bắt buộc"),
  email: Yup.string().email().required("Bắt buộc"),
  address: Yup.string().required("Bắt buộc"),
  fullName: Yup.string().min(2, "Quá ngắn!").max(255, "Quá dài!").required("Bắt buộc"),
});
