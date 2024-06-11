import { APIError } from "../../../utils/index.js";
import areaService from "./area.service.js";

class AreaController {
  async create(req, res, next) {
    try {
      const body = req.body;

      if (!body.name || !body.address) {
        return next(new APIError(404, "Missing name, address!"));
      }

      const response = await areaService.create(body);

      return res.status(201).json({
        message: "Create success.",
        data: response,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const response = await areaService.getById(id);

      return res.status(200).json({
        message: "Get success.",
        data: response,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const filters = req.query;
      const response = await areaService.getAll(filters);

      return res.status(200).json({
        message: "Get all success.",
        data: response,
      });
    } catch (error) {
      console.log("error getALL", error);
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const { id } = req.params;

      if (!body.name || !body.address) {
        return next(new APIError(404, "Missing name, address!"));
      }

      const response = await areaService.update(id, body);

      return res.status(200).json({
        message: "Update success.",
        data: response,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }
}

export default new AreaController();
