import instance from "./axios";

const host = "/uploads/local";

const uploadAPI = {
  formLocalFile: (file) => {
    const formData = new FormData();

    formData.append("file", file);

    return instance.post(`${host}/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  formLocalFiles: (files) => {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      const newFile = Object.defineProperty(file, "id", { value: file.lastModified });
      formData.append("files", newFile);
    });

    return instance.post(`${host}/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default uploadAPI;
