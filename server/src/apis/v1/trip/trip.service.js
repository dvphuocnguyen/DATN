import _ from "lodash";
import SqlString from "sqlstring";
import { DBModel, pool } from "../../../database/index.js";
import APIError from "../../../utils/api-error.util.js";
import createUUID from "../../../utils/genaralUuid.js";
import { areaService } from "../areas/index.js";
import hotelService from "../hotels/hotel.service.js";
import placeService from "../places/place.service.js";
import userService from "../users/user.service.js";
import { deleteKeyObjectOrNullOrUndefinedOrEmpty } from "../../../utils/functions.js";

class TripService extends DBModel {
  table = "trips";
  primaryKey = "id";

  async createByUser(data) {
    const { user_id, destination_id, start, start_date, end_date, totalDay } = data;

    const [area, { result: places }] = await Promise.all([
      areaService.getById(destination_id),
      placeService.getAll({ where: "area_id," + destination_id }),
    ]);

    if (!area) throw new APIError(404, "Không tìm thấy điểm đến!");

    const name = `${totalDay} ngày đi ${area.name} từ ${start}`;

    const tripId = createUUID().slice(0, 12);

    const metadata = {
      start_date,
      end_date,
      start,
      children: 0,
      adult: 1,
    };

    const cost_details = {
      move: {
        cost: 0,
        quantityPeople: 0,
      },
      shopping: {
        cost: 0,
        quantityPeople: 0,
      },
      ticket: {
        cost: 0,
        quantityPeople: 0,
      },
      foodDrinks: {
        cost: 0,
        quantityPeople: 0,
      },
    };

    const newTrip = {
      id: tripId,
      name,
      total_day: totalDay,
      destination_id,
      description: `Giới thiệu chuyến đi ${name}`,
      trip_fee: 0,
      hotel_fee: 0,
      user_id,
      metadata: JSON.stringify(metadata),
      cost_details: JSON.stringify(cost_details),
    };

    const newTripDetails = [];
    let flatIndex = 2; // Same element position 3 in places
    let flatPlaceUsedAdded = [...places.filter((_, index) => index <= flatIndex)];

    for (let index = 0; index < totalDay; index++) {
      const newPlaces = flatPlaceUsedAdded.map((item, idx) => {
        const newPlaceId = Math.round(Math.random() * Date.now() * 1000);

        const newPlace = {
          id: newPlaceId,
          place_id: item.id,
          place: item,
          order_place: newPlaceId,
          timeline: `${7 + idx + 1} h`,
        };

        return newPlace;
      });

      const newTripDetail = [
        `Ngày ${index + 1}`,
        tripId,
        index + 1,
        `Giới thiệu về ngày ${index + 1}`,
        JSON.stringify(newPlaces),
      ];

      newTripDetails.push(newTripDetail);

      const newFlatPlaceUsedAdded = places.slice(flatIndex, flatIndex + 3);

      if (!newFlatPlaceUsedAdded.length)
        flatPlaceUsedAdded = [...places.filter((_, index) => index <= 2)];
      else if (newFlatPlaceUsedAdded.length < 3) {
        flatPlaceUsedAdded = [...places.filter((_, index) => index <= 2)];
      } else {
        flatPlaceUsedAdded = newFlatPlaceUsedAdded;
      }

      flatIndex += 3;
    }

    // Create new a trips
    await this.insert({ data: newTrip, table: this.table });

    await this.insertBulk({
      data: newTripDetails,
      table: "trip_details",
      insertFields: ["name", "trip_id", "order_day", "description", "places"],
    });

    return tripId;
  }

  async create(data) {
    try {
      const {
        name = "",
        total_day = "",
        destination_id = "",
        description = "",
        trip_fee = "",
        user_id = "",
        hotel_id = "",
        hotel_fee = "",
        trip_details = [],
        cost_details = null,
      } = data;

      const areaFounder = await this.find({
        table: this.table,
        conditions: {
          name,
          destination_id,
        },
      });

      if (areaFounder) {
        throw new APIError(409, "Lịch trình đã tồn tại!");
      }

      const tripId = createUUID().slice(0, 12);

      const newTrip = {
        id: tripId,
        description,
        destination_id,
        name,
        hotel_id,
        total_day,
        trip_fee,
        hotel_fee: hotel_fee ? hotel_fee : 0,
        user_id: user_id ? user_id : null,
        cost_details: cost_details ? JSON.stringify(cost_details) : null,
      };

      await this.insert({ data: newTrip, table: this.table });

      const newTripDetails = trip_details.map((t) => {
        return [t.name, t.order_day, tripId, JSON.stringify(t.places), t.description];
      });

      await this.insertBulk({
        table: "trip_details",
        data: newTripDetails,
        insertFields: ["name", "order_day", "trip_id", "places", "description"],
      });

      return true;
    } catch (error) {
      console.log(`[TripService -- error create]:::`, error);
      return Promise.reject(error);
    }
  }

  async update(id, data) {
    try {
      const {
        name = "",
        total_day = "",
        destination_id = "",
        description = "",
        trip_fee = "",
        hotel_fee = "",
        user_id = "",
        hotel_id = "",
        trip_details = [],
        cost_details = null,
      } = data;

      const [areaFounder, tripDetails] = await Promise.all([
        this.find({
          table: this.table,
          conditions: {
            name,
            destination_id,
          },
        }),
        this.findAll({
          table: "trip_details",
          conditions: { trip_id: id },
        }),
      ]);

      if (areaFounder && areaFounder.id !== id) {
        throw new APIError(409, "Lịch trình đã tồn tại!");
      }

      const updateTrip = {
        description,
        destination_id,
        name,
        hotel_id,
        total_day,
        trip_fee,
        hotel_fee: hotel_fee ? hotel_fee : 0,
        user_id: user_id ? user_id : null,
        cost_details: cost_details ? JSON.stringify(cost_details) : null,
      };

      await this.handleUpdate({
        data: deleteKeyObjectOrNullOrUndefinedOrEmpty(updateTrip),
        table: this.table,
        id,
        idField: this.primaryKey,
      });

      const trip_details_ids = trip_details.map((t) => t?.id);
      const _tripDetailsIds = tripDetails.map((t) => t?.id);
      const deleteTrips = tripDetails?.filter((t) => !trip_details_ids?.includes(t?.id));
      const createTrips = trip_details.filter((t) => !_tripDetailsIds.includes(t.id));
      const updateTrips = trip_details.filter((t) => _tripDetailsIds.includes(t.id));

      if (createTrips?.length) {
        const newTripDetails = createTrips.map((t) => {
          return [t.name, t.order_day, id, JSON.stringify(t.places), t.description];
        });

        await this.insertBulk({
          table: "trip_details",
          data: newTripDetails,
          insertFields: ["name", "order_day", "trip_id", "places", "description"],
        });
      }

      if (deleteTrips.length) {
        await Promise.all(
          deleteTrips.map(async (t) => {
            await this.delete({
              table: "trip_details",
              id: t.id,
              idField: "id",
            });
            return true;
          })
        );
      }

      if (updateTrips.length) {
        await Promise.all(
          updateTrips.map(async (t) => {
            const { updated_at, created_at, id: _id, ...others } = t;

            await this.handleUpdate({
              table: "trip_details",
              data: {
                ...others,
                places: JSON.stringify(others.places),
              },
              id: _id,
              idField: "id",
            });
            return true;
          })
        );
      }

      return true;
    } catch (error) {
      console.log(`[TripService -- error create]:::`, error);
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
        where = filters?.where?.split(","),
        isUserNull = filters?.isUserNull;

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
      let query = SqlString.format(`SELECT * FROM ?? WHERE user_id ${isUserNull ? 'is null' : 'is not null'} LIMIT ? OFFSET ?`, dependencyLimitOffset);

      // Query get total rows
      let queryTotalRow = SqlString.format(
        `SELECT count(*) as totalRow FROM ?? WHERE user_id ${isUserNull ? 'is null' : 'is not null'}`,
        dependencyTotalRow
      );

      if (search && !order) {
        // Dependency query search;
        const dependencySearch = [this.table, `%${search}%`, limit, offset];
        query = SqlString.format(
          `SELECT * FROM ?? WHERE user_id ${isUserNull ? 'is null' : 'is not null'}  and name LIKE ? LIMIT ? OFFSET ? `,
          dependencySearch
        );
      } else if (order && !search) {
        const dependencyOrder = [this.table, limit, offset];
        const orderBy = order.split(",").join(" ");
        query = SqlString.format(
          `SELECT * FROM  ?? WHERE user_id ${isUserNull ? 'is null' : 'is not null'} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
          dependencyOrder
        );
      } else if (search && order) {
        // Dependency query search and order;
        const dependencySearchOrder = [this.table, `%${search}%`, limit, offset];
        const orderBy = order.split(",").join(" ");
        query = SqlString.format(
          `SELECT * FROM ?? WHERE user_id ${isUserNull ? 'is null' : 'is not null'} and name LIKE ? ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
          dependencySearchOrder
        );
      } else if (!_.isEmpty(whereBy)) {
        if (whereBy.value === "null") {
          query = SqlString.format(`SELECT * FROM ?? WHERE user_id ${isUserNull ? 'is null' : 'is not null'} and ?? IS NULL`, [this.table, whereBy.key]);
        } else {
          query = SqlString.format(`SELECT * FROM ?? WHERE user_id ${isUserNull ? 'is null' : 'is not null'} and ?? LIKE ? `, [
            this.table,
            whereBy.key,
            `%${whereBy.value}%`,
          ]);
        }
      }

      console.log(`query:::`, query);

      let [result] = await pool.query(query);
      const [totalRow] = await pool.query(queryTotalRow);

      if (result.length) {
        result = await Promise.all(
          result.map(
            (row) =>
              new Promise(async (resolve, reject) => {
                try {
                  const destination = await areaService.getById(row.destination_id);

                  let hotel = null;

                  if (row.hotel_id) {
                    hotel = await hotelService.getById(row.hotel_id);
                  }

                  let user = null;

                  if (row.user_id) {
                    user = await userService.getById(row.user_id);

                    delete user?.password;
                    delete user?.role;
                    delete user?.hotel_id;
                    delete user?.is_verify;
                    delete user?.username;
                  }

                  resolve({
                    ...row,
                    destination,
                    hotel,
                    user,
                    cost_details: row.cost_details ? JSON.parse(row.cost_details) : null,
                  });
                } catch (error) {
                  reject(error);
                }
              })
          )
        );
      }

      // if (isUserNull) {
      //   result = result.filter((t) => !t.user_id);
      // }

      return {
        result,
        paginations: {
          page,
          limit,
          totalPage: Math.ceil(totalRow[0].totalRow / limit),
        },
      };
    } catch (error) {
      console.log(`[TripService -- error find]:::`, error);
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

      let user = null;

      if (response.user_id) {
        user = await userService.getById(response.user_id);

        delete user?.password;
        delete user?.role;
        delete user?.hotel_id;
        delete user?.is_verify;
        delete user?.username;
      }

      const destination = await areaService.getById(response.destination_id);

      return {
        ...response,
        trip_details: tripDetails,
        destination,
        hotel,
        user,
        metadata: response.metadata ? JSON.parse(response.metadata) : null,
        cost_details: response.cost_details ? JSON.parse(response.cost_details) : null,
      };
    } catch (error) {
      console.log(`[TripService -- error getById]:::`, error);
      return Promise.reject(error);
    }
  }

  async updateCost(id, data) {
    try {
      const { cost_details, trip_fee } = data;

      const updateTrip = {
        trip_fee,
        cost_details: cost_details ? JSON.stringify(cost_details) : null,
      };

      await this.handleUpdate({
        data: updateTrip,
        table: this.table,
        id,
        idField: this.primaryKey,
      });

      return await this.getById(id);
    } catch (error) {
      console.log(`[TripService -- error create]:::`, error);
      return Promise.reject(error);
    }
  }

  async addReview(data) {
    try {
      const newReview = {
        ...data,
        is_active: true,
      };

      return await this.insert({
        table: "reviews_trips",
        data: newReview,
      });
    } catch (error) {
      console.log(`[TripService -- error addReview]:::`, error);
      return Promise.reject(error);
    }
  }

  async toggleReview(id, data) {
    try {
      const { is_active } = data;

      return await this.handleUpdate({
        table: "reviews_trips",
        data: { is_active: !is_active },
        id: id,
        idField: "id",
      });
    } catch (error) {
      console.log(`[TripService -- error toggleReview]:::`, error);
      return Promise.reject(error);
    }
  }

  async getReview(filters) {
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
      const dependencyLimitOffset = ["reviews_trips", limit, offset];

      // Dependency query total row.
      const dependencyTotalRow = ["reviews_trips"];

      // Query select rows
      let query = SqlString.format("SELECT * FROM ?? LIMIT ? OFFSET ?", dependencyLimitOffset);

      // Query get total rows
      let queryTotalRow = SqlString.format(
        "SELECT count(*) as totalRow FROM ??",
        dependencyTotalRow
      );

      if (search && !order) {
        // Dependency query search;
        const dependencySearch = ["reviews_trips", `%${search}%`, limit, offset];
        query = SqlString.format(
          "SELECT * FROM ?? WHERE name LIKE ? LIMIT ? OFFSET ? ",
          dependencySearch
        );
      } else if (order && !_.isEmpty(whereBy) && !search) {
        const dependencyOrder = ["reviews_trips", whereBy.key, `%${whereBy.value}%`, limit, offset];
        const orderBy = order.split(",").join(" ");
        query = SqlString.format(
          `SELECT * FROM ??  WHERE ?? LIKE ? ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
          dependencyOrder
        );
      } else if (search && order) {
        // Dependency query search and order;
        const dependencySearchOrder = ["reviews_trips", `%${search}%`, limit, offset];
        const orderBy = order.split(",").join(" ");
        query = SqlString.format(
          `SELECT * FROM ?? WHERE name LIKE ? ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
          dependencySearchOrder
        );
      } else if (!_.isEmpty(whereBy)) {
        if (whereBy.value === "null") {
          query = SqlString.format("SELECT * FROM ?? WHERE ?? IS NULL", [
            "reviews_trips",
            whereBy.key,
          ]);
        } else {
          query = SqlString.format("SELECT * FROM ?? WHERE ?? LIKE ? ", [
            "reviews_trips",
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
                  const trip = await this.getById(row.trip_id);

                  let user = null;

                  if (row.user_id) {
                    user = await userService.getById(row.user_id);

                    delete user?.password;
                    delete user?.role;
                    delete user?.hotel_id;
                    delete user?.is_verify;
                    delete user?.username;
                  }

                  resolve({
                    ...row,
                    trip,
                    user,
                  });
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
      console.log(`[TripService -- error getReview]:::`, error);
      return Promise.reject(error);
    }
  }
}

export default new TripService();
