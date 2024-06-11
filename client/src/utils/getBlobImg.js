const getBlobImg = (file) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file) return;

      const reader = new FileReader();

      const objURL = URL.createObjectURL(file);

      reader.readAsDataURL(file);

      reader.onload = () => {
        return resolve({
          url: objURL,
          id: file.lastModified,
          originalname: file.name,
          size: file.size,
        });
      };
    } catch (error) {
      reject(error);
    }
  });
};

export default getBlobImg;
