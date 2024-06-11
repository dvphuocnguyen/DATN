import instance from "./axios";

const host = "/revenue";

const revenueAPI = {
  getRevenueByRoom: () => {
    return instance.get(`${host}/rooms`);
  },
  getRevenueByDate: () => {
    return instance.get(`${host}/date`);
  },
  getRevenueByMonth: () => {
    return instance.get(`${host}/month`);
  },
  getRevenueByHotels: () => {
    return instance.get(`${host}/hotels`);
  },
  getRevenueByTrip: () => {
    return instance.get(`${host}/trips`);
  },
  getRevenueByCustomer: () => {
    return instance.get(`${host}/customers`);
  },
  getCountBillCancel: () => {
    return instance.get(`${host}/cancel`);
  },
};

export default revenueAPI;
