import instance from "./axios";

const host = "/trips";

const placeAPI = {
  updateCost: (id, data) => {
    return instance.post(`${host}/cost/${id}`, data);
  },
  createByUser: (data) => {
    return instance.post(`${host}/user/new`, data);
  },
  create: (data) => {
    return instance.post(host, data);
  },
  getAll: (params) => {
    return instance.get(host, {
      params,
    });
  },
  update: ({ id, data }) => {
    return instance.patch(`${host}/${id}`, data);
  },
  delete: (id) => {
    return instance.delete(`${host}/${id}`);
  },
  getById: (id) => {
    return instance.get(`${host}/${id}`);
  },
  addReview: (payload) => {
    return instance.post(`${host}/review`, payload);
  },
  toggleReview: (payload) => {
    return instance.patch(`${host}/review/${payload.id}`, payload);
  },
  getReview: (params) => {
    return instance.get(`${host}/review`, { params });
  },
  deleteReview: (id) => {
    return instance.delete(`${host}/review/${id}`);
  },
};

export default placeAPI;
