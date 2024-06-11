import _ from "lodash";
import SqlString from "sqlstring";
import { DBModel, pool } from "../../../database/index.js";
import APIError from "../../../utils/api-error.util.js";
import { areaService } from "../areas/index.js";
import hotelService from "../hotels/hotel.service.js";
import roomService from "../rooms/room.service.js";
import tripService from "../trip/trip.service.js";
import createUUID from "../../../utils/genaralUuid.js";
import VNPayService from "../vn-pay/vn-pay.service.js";
import transactionService from "../transactions/transaction.service.js";
import { generateOrderId } from "../../../utils/functions.js";
import userService from "../users/user.service.js";
import billService from "../bills/bill.service.js";

const STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELED: "canceled",
};

class BookingTripService extends DBModel {
  table = "bookings_trip";
  primaryKey = "id";

  /**
   * 1. Find booking exists & trip & rooms
   * 2. Create new booking trip
   * 3. Create booking hotel if hotel exists
   * 4. Update quantity room hotel
   * 5. Create url payment with vn pay
   * @param {*} data
   * @returns
   */
  async create(data, ipAddr) {
    try {
      const {
        address = "",
        email = "",
        fullName = "",
        phone = "",
        trip_id = "",
        hotel_id = "",
        user_id = "",
        start_date = "",
        end_date = "",
      } = data;

      // 1. Tìm booking đang pending và trip và rooms (if hotel_id exist)
      const [bookingTripFound, tripFound, roomsFound] = await Promise.all([
        this.find({
          table: this.table,
          conditions: {
            user_id,
            status: STATUSES.PENDING,
            trip_id,
          },
        }),
        tripService.getById(trip_id),
        roomService.getByHotelId(hotel_id),
      ]);

      // return { bookingTripFound, tripFound, roomsFound };

      if (bookingTripFound) {
        throw new APIError(409, "Bạn đã đặt chuyến đi trước đó!");
      }

      const roomMinPrice = roomsFound[0];

      // 2. Tính lại tổng chi phí
      const fee = {
        total_price: tripFound.trip_fee + tripFound.hotel_fee,
        total_day: tripFound.total_day,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        trip_fee: tripFound.trip_fee,
        hotel_fee: tripFound.hotel_fee,
      };

      // 3. Tạo booking trip id
      const bookingTripId = createUUID().slice(0, 12),
        orderId = generateOrderId();

      // 4. Tạo data booking trip and booking hotel (if hotel_id exist)
      const newBookingTrip = {
        id: bookingTripId,
        user_id,
        trip_id,
        phone,
        fullName,
        email,
        address,
        fee: JSON.stringify(fee),
        status: STATUSES.PENDING,
      };

      const newBill = {
        bill_id: bookingTripId,
        email,
        booking_for: "ME",
        start_date: fee.start_date,
        end_date: fee.end_date,
        total_night: fee.total_day - 1,
        payment: "ONLINE",
        status: "PAID",
        user_id,
        total_price: fee.hotel_fee,
      };

      const newBookingDetails = {
        bill_id: bookingTripId,
        floor_id: roomMinPrice.floor_id,
        room_id: roomMinPrice.room_id,
        price: roomMinPrice.price,
        room_quantity: 1,
      };

      const newRoomBooking = roomMinPrice.room_booking + 1;

      await Promise.all([
        this.insert({ table: this.table, data: newBookingTrip }),
        this.insert({ table: "bills", data: newBill }),
      ]);

      const [_trans, urlPayment] = await Promise.all([
        await transactionService.create({
          bill_id: bookingTripId,
          amount: fee.total_price,
          order_id: orderId,
        }),
        VNPayService.handleCreatePaymentUrl({
          ipAddr,
          orderId: orderId,
          bankCode: "",
          amount: fee.total_price,
          message: "Thanh toán đặt lịch trình chuyến đi. Mã giao dịch: ",
        }),
        this.insert({ table: "bill_details", data: newBookingDetails }),
        this.handleUpdate({
          table: "rooms",
          data: {
            room_booking:
              newRoomBooking > roomMinPrice.room_quantity
                ? roomMinPrice.room_quantity
                : newRoomBooking,
            avaiable: newRoomBooking === roomMinPrice.room_quantity ? 0 : 1,
          },
          id: roomMinPrice.room_id,
          idField: "room_id",
        }),
      ]);

      return urlPayment;
    } catch (error) {
      console.log(`[BookingTripService -- error create]:::`, error);
      return Promise.reject(error);
    }
  }

  async update(id, { status }) {
    try {
      if (status === "canceled") {
        await this.handleUpdate({
          data: { status: "CANCEL" },
          table: "bills",
          id,
          idField: "bill_id",
        });
      }

      await this.handleUpdate({
        data: { status },
        table: this.table,
        id,
        idField: this.primaryKey,
      });

      return true;
    } catch (error) {
      console.log(`[BookingTripService -- error create]:::`, error);
      return Promise.reject(error);
    }
  }

  async getAll(filters) {
    try {
      const page = +filters?.page || 1,
        limit = +filters?.limit || 5,
        offset = limit * (page - 1),
        search = filters?.search,
        order = filters?.order, // hotel_name,desc
        where = filters?.where?.split(",");

      let whereBy =
        where && where.length > 0
          ? {
              key: where[0],
              value: where[1],
            }
          : null;

      // Dependency query limit and offset.
      const dependencyLimitOffset = [this.table, limit, offset];

      // Dependency query total row.
      const dependencyTotalRow = [this.table];

      // Query select rows
      let query = SqlString.format("SELECT * FROM ?? LIMIT ? OFFSET ?", dependencyLimitOffset);

      // Query get total rows
      let queryTotalRow = SqlString.format(
        "SELECT count(*) as totalRow FROM ??",
        dependencyTotalRow
      );

      if (search && !order) {
        // Dependency query search;
        const dependencySearch = [this.table, `%${search}%`, limit, offset];
        query = SqlString.format(
          "SELECT * FROM ?? WHERE name LIKE ? LIMIT ? OFFSET ? ",
          dependencySearch
        );
      } else if (order && !search) {
        const dependencyOrder = [this.table, limit, offset];
        const orderBy = order.split(",").join(" ");
        query = SqlString.format(
          `SELECT * FROM ?? ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
          dependencyOrder
        );
      } else if (search && order) {
        // Dependency query search and order;
        const dependencySearchOrder = [this.table, `%${search}%`, limit, offset];
        const orderBy = order.split(",").join(" ");
        query = SqlString.format(
          `SELECT * FROM ?? WHERE name LIKE ? ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
          dependencySearchOrder
        );
      } else if (!_.isEmpty(whereBy)) {
        if (whereBy.value === "null") {
          query = SqlString.format("SELECT * FROM ?? WHERE ?? IS NULL", [this.table, whereBy.key]);
        } else {
          query = SqlString.format("SELECT * FROM ?? WHERE ?? LIKE ? ", [
            this.table,
            whereBy.key,
            `%${whereBy.value}%`,
          ]);
        }
      }

      let [result] = await pool.query(query);
      const [totalRow] = await pool.query(queryTotalRow);

      if (result.length) {
        result = await Promise.all(
          result.map(
            (row) =>
              new Promise(async (resolve, reject) => {
                try {
                  const [user, bill, billDetails, trip] = await Promise.all([
                    userService.getById(row.user_id),
                    billService.getById(row.id),
                    billService.getBillDetailsByIdBill(row.id),
                    tripService.getById(row.trip_id),
                  ]);

                  delete user?.password;

                  resolve({ ...row, fee: JSON.parse(row.fee), user, bill, billDetails, trip });
                } catch (error) {
                  reject(error);
                }
              })
          )
        );
      }

      return {
        result,
        paginations: {
          page,
          limit,
          totalPage: Math.ceil(totalRow[0].totalRow / limit),
        },
      };
    } catch (error) {
      console.log(`[BookingTripService -- error find]:::`, error);
      return Promise.reject(error);
    }
  }

  async getById(id) {
    try {
      const response = await this.find({
        table: this.table,
        conditions: {
          id,
        },
      });

      if (!response) return null;

      let tripDetails = await this.findAll({
        table: "trip_details",
        conditions: { trip_id: id },
      });

      if (tripDetails.length) {
        tripDetails = tripDetails.map((t) => ({ ...t, places: JSON.parse(t.places) }));
      }

      let hotel = null;

      if (response.hotel_id) {
        hotel = await hotelService.getById(response.hotel_id);
      }

      const destination = await areaService.getById(response.destination_id);

      return { ...response, trip_details: tripDetails, destination, hotel };
    } catch (error) {
      console.log(`[BookingTripService -- error getById]:::`, error);
      return Promise.reject(error);
    }
  }
}

export default new BookingTripService();
