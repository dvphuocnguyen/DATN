import { APIError } from "../../../utils/index.js";
import tripService from "./trip.service.js";

class AreaController {
  async create(req, res, next) {
    try {
      const body = req.body;

      if (
        !body.name ||
        !body.description ||
        !body.destination_id ||
        !body.total_day ||
        !body.trip_details?.length ||
        !body.trip_fee
      ) {
        return next(new APIError(404, "Missing name, address!"));
      }

      const response = await tripService.create(body);

      return res.status(201).json({
        message: "Create success.",
        data: response,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }

  async addReview(req, res, next) {
    try {
      const body = req.body;

      const response = await tripService.addReview(body);

      return res.status(201).json({
        message: "Create success.",
        data: response,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }

  async toggleReview(req, res, next) {
    try {
      const body = req.body;
      const id = req.params.id;

      const response = await tripService.toggleReview(id, body);

      return res.status(201).json({
        message: body.is_active ? "Ẩn đánh giá thành công" : "Hiện đánh giá thành công",
        data: response,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }

  async createByUser(req, res, next) {
    try {
      const body = req.body;

      if (
        !body.user_id ||
        !body.start ||
        !body.destination_id ||
        !body.start_date ||
        !body.end_date ||
        !body.totalDay
      ) {
        return next(new APIError(404, "Missing data!"));
      }

      const response = await tripService.createByUser(body);

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

      const response = await tripService.getById(id);

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
      const response = await tripService.getAll(filters);

      return res.status(200).json({
        message: "Get all success.",
        data: response,
      });
    } catch (error) {
      console.log("error getALL", error);
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }

  async getAllReview(req, res, next) {
    try {
      const filters = req.query;
      const response = await tripService.getReview(filters);

      return res.status(200).json({
        message: "Get all review success.",
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

      if (
        !body.name ||
        !body.description ||
        !body.destination_id ||
        !body.total_day ||
        !body.trip_details?.length
      ) {
        return next(new APIError(404, "Missing data!"));
      }

      const response = await tripService.update(id, body);

      return res.status(200).json({
        message: "Update success.",
        data: response,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }

  async updateCost(req, res, next) {
    try {
      const body = req.body;
      const { id } = req.params;

      if (!body.cost_details || !body.trip_fee) {
        return next(new APIError(404, "Missing name, address!"));
      }

      const response = await tripService.updateCost(id, body);

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
