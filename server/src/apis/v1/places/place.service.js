import _ from "lodash";
import { DBModel, pool } from "../../../database/index.js";
import APIError from "../../../utils/api-error.util.js";
import SqlString from "sqlstring";
import { cloudinaryV2 } from "../../../utils/upload.util.js";

class PlaceService extends DBModel {
  table = "places";
  primaryKey = "id";

  async create(data) {
    try {
      const {
        name,
        address,
        thumb,
        slug,
        images,
        description,
        district_code,
        district_name,
        province_code,
        province_name,
        ward_code,
        ward_name,
        location,
        area_id,
      } = data;

      const areaFounder = await this.find({
        table: this.table,
        conditions: {
          name,
          slug,
          area_id,
        },
      });

      if (areaFounder) {
        throw new APIError(409, "Tên đã tồn tại!");
      }

      const newArea = {
        name,
        slug,
        address,
        thumb,
        images: JSON.stringify(images),
        description: description ?? "",
        district_code,
        district_name,
        province_code,
        province_name,
        ward_code,
        ward_name,
        area_id,
        location: location ? JSON.stringify(location) : null,
      };

      await this.insert({ data: newArea, table: this.table });

      return true;
    } catch (error) {
      console.log(`[PlaceService -- error create]:::`, error);
      return Promise.reject(error);
    }
  }

  async update(id, data) {
    try {
      const {
        name,
        address,
        thumb,
        images,
        slug,
        description,
        district_code,
        district_name,
        province_code,
        province_name,
        ward_code,
        ward_name,
        location,
        imageIds,
        thumbId,
        area_id,
      } = data;

      const [areaFounder, prevArea] = await Promise.all([
        this.find({
          table: this.table,
          conditions: {
            name,
            slug,
            area_id,
          },
        }),
        this.getById(id),
      ]);

      if (areaFounder && areaFounder.id !== +id) {
        throw new APIError(409, "Tên đã tồn tại!");
      }

      const updateArea = {
        name,
        slug,
        address,
        thumb,
        images: JSON.stringify(images),
        description: description ?? "",
        district_code,
        district_name,
        province_code,
        province_name,
        ward_code,
        ward_name,
        area_id,
        location: location ? JSON.stringify(location) : null,
      };

      await this.handleUpdate({
        table: this.table,
        data: updateArea,
        id: id,
        idField: this.primaryKey,
      });

      const _imageIds = [...JSON.parse(imageIds)];
      const deleteImgIds = _imageIds.filter((t) => !images.includes(t));

      if (deleteImgIds.length) {
        deleteImgIds.map((t) => cloudinaryV2.uploader.destroy(t).then().catch(console.log));
      }

      if (prevArea?.thumb && prevArea?.thumb !== thumbId) {
        cloudinaryV2.uploader.destroy(thumbId).then().catch(console.log);
      }

      return true;
    } catch (error) {
      console.log(`[PlaceService -- error update]:::`, error);
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
        imgWidth = filters?._img_width, // where=type,ABC
        imgHeight = filters?._img_height, // where=type,ABC
        imgFormat = filters?._img_format ?? "jpg"; // where=type,ABC

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
        query = SqlString.format("SELECT * FROM ?? WHERE ?? LIKE ? ", [
          this.table,
          whereBy.key,
          `%${whereBy.value}%`,
        ]);
      }

      let [result] = await pool.query(query);
      const [totalRow] = await pool.query(queryTotalRow);

      if (result.length) {
        let conditions = {};

        if (imgWidth) {
          conditions = {
            width: imgWidth,
          };
        }

        if (imgHeight) {
          conditions = {
            width: imgHeight,
          };
        }

        result = result.map((item) => {
          const resultImages = [];

          if (item.images.length) {
            const imagesArray = [...JSON.parse(item.images)];
            const imagesArrayLength = imagesArray.length;

            if (Boolean(imagesArrayLength)) {
              for (let index = 0; index < imagesArrayLength; index++) {
                const publicId = imagesArray[index];
                const imageUrl = cloudinaryV2.url(publicId, {
                  format: imgFormat,
                  ...conditions,
                });
                resultImages.push(imageUrl);
              }
            }
          }

          return {
            ...item,
            thumb: item.thumb ? cloudinaryV2.url(item.thumb, { format: "jpg" }) : "",
            images: resultImages,
          };
        });
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
      console.log(`[PlaceService -- error find]:::`, error);
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

      const result = {
        ...response,
        thumbUrl: response.thumb ? cloudinaryV2.url(response.thumb, { format: "jpg" }) : "",
        imagesUrl: response.images.length
          ? [...JSON.parse(response.images)].map((t) => {
              return {
                id: t,
                url: cloudinaryV2.url(t, { format: "jpg" }),
              };
            })
          : [],
      };

      return result;
    } catch (error) {
      console.log(`[PlaceService -- error getById]:::`, error);
      return Promise.reject(error);
    }
  }
}

export default new PlaceService();
