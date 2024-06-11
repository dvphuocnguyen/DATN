import { APIError } from "../../../utils/index.js";

class UploadController {
  async uploadFromLocalFile(req, res, next) {
    try {
      const { file } = req;

      if (!file) {
        return next(new APIError(404, "Missing file!"));
      }

      return res.status(201).json({
        message: "Upload file success.",
        data: file,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }
  async uploadFromLocalFiles(req, res, next) {
    try {
      const { files } = req;

      if (!files?.length) {
        return next(new APIError(404, "Missing files!"));
      }

      return res.status(201).json({
        message: "Upload files success.",
        data: files,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }
}

export default new UploadController();
