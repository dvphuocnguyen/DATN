import { APIError } from "../../../utils/index.js";
import bookingTripService from "./bookingTrip.service.js";

class BookingTripController {
  async create(req, res, next) {
    try {
      const body = req.body;

      if (
        !body.address ||
        !body.email ||
        !body.fullName ||
        !body.phone ||
        !body.trip_id ||
        !body.user_id
      ) {
        return next(new APIError(404, "Missing data!"));
      }

      const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      const response = await bookingTripService.create(body, ipAddr);

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

      const response = await bookingTripService.getById(id);

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
      const response = await bookingTripService.getAll(filters);

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

      const response = await bookingTripService.update(id, body);

      return res.status(200).json({
        message: "Update success.",
        data: response,
      });
    } catch (error) {
      return next(new APIError(error.statusCode || 500, error.message));
    }
  }
}

export default new BookingTripController();
