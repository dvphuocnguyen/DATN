import instance from "./axios";

const host = "/areas";

const areaAPI = {
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
};

export default areaAPI;
