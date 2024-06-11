import crypto from "crypto";
import dateFormat from "dateformat";
import queryString from "qs";
import SQLString from "sqlstring";
import config from "../../../config/index.js";
import DBModel from "../../../database/DBModel.js";
import pool from "../../../database/init.mysql.js";
import APIError from "../../../utils/api-error.util.js";
import { sortObject } from "../../../utils/functions.js";
import billService from "../bills/bill.service.js";
import transactionService from "../transactions/transaction.service.js";

// https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
// ?vnp_Amount=594444400
// &vnp_Command=pay
// &vnp_CreateDate=20240607230636
// &vnp_CurrCode=VND
// &vnp_IpAddr=%3A%3A1
// &vnp_Locale=vn
// &vnp_OrderInfo=Thanh+to%C3%A1n+%C4%91%E1%BA%B7t+l%E1%BB%8Bch+tr%C3%ACnh+chuy%E1%BA%BFn+%C4%91i.+M%C3%A3+giao+d%E1%BB%8Bch%3A+20240607234736
// &vnp_OrderType=other
// &vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fv1%2Fvn-pay%2Freturn
// &vnp_TmnCode=AHD4S5OK
// &vnp_TxnRef=20240607234736
// &vnp_Version=2.1.0
// &vnp_SecureHash=8201ab4d45c746ff94af04360bbc0c031a092ab5c917b2058c5b7e0020b2faf77567876bb652a83eeb0bcae330a4ee8a6db26cd9d4eea13c434a0f0f12be0818

class VNPayService {
  static handleCreatePaymentUrl = async ({
    ipAddr,
    amount,
    bankCode,
    orderId,
    message = "Thanh toan dat phong khach san: Ma giao dich",
  }) => {
    try {
      const date = new Date();
      const createDate = dateFormat(date, "yyyymmddHHmmss");

      const location = config.location; // vn
      const currCode = config.vnp.currCode; // VND

      const tmnCode = config.vnp.vnp_TmnCode;
      const secretKey = config.vnp.vnp_HashSecret;
      const returnUrl = config.vnp.vnp_ReturnUrl;

      let vnpUrl = config.vnp.vnp_Url;
      let vnpParams = {};

      const redirectUrl = new URL(vnpUrl);

      vnpParams["vnp_Version"] = "2.1.0";
      vnpParams["vnp_TmnCode"] = tmnCode;
      vnpParams["vnp_Amount"] = amount * 100;
      vnpParams["vnp_Command"] = "pay";
      vnpParams["vnp_CreateDate"] = createDate;
      vnpParams["vnp_CurrCode"] = currCode;
      vnpParams["vnp_IpAddr"] = ipAddr;
      vnpParams["vnp_Locale"] = location;
      vnpParams["vnp_OrderInfo"] = message + orderId;
      vnpParams["vnp_OrderType"] = "other";
      vnpParams["vnp_ReturnUrl"] = returnUrl;
      vnpParams["vnp_TxnRef"] = orderId;
      vnpParams["vnp_ExpireDate"] = +createDate + 60 * 20;

      if (bankCode !== null && bankCode !== "") {
        vnpParams["vnp_BankCode"] = bankCode;
      }

      Object.entries(vnpParams)
        .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
        .forEach(([key, value]) => {
          console.log({ key, value });

          // Skip empty value
          if (!value || value === "" || value === undefined || value === null) {
            return;
          }

          redirectUrl.searchParams.append(key, value.toString());
        });

      const hmac = crypto.createHmac("sha512", secretKey);

      const signed = hmac
        .update(new Buffer.from(redirectUrl.search.slice(1).toString(), "utf-8"))
        .digest("hex");

      redirectUrl.searchParams.append("vnp_SecureHash", signed);

      console.log("handleCreatePaymentUrl url => ", redirectUrl.toString());

      return redirectUrl.toString();
    } catch (error) {
      throw new APIError(500, error.message);
    }
  };

  static handleVnpayReturn = async ({ vnpParams }) => {
    try {
      let _vnpParams = { ...vnpParams };
      const secureHash = _vnpParams["vnp_SecureHash"];

      delete _vnpParams["vnp_SecureHash"];
      delete _vnpParams["vnp_SecureHashType"];

      _vnpParams = sortObject(_vnpParams);

      const secretKey = config.vnp.vnp_HashSecret;

      const signData = queryString.stringify(_vnpParams, { encode: false });

      const hmac = crypto.createHmac("sha512", secretKey);

      const signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        const DB = new DBModel("transactions");

        const findTransaction = await DB.find({
          conditions: {
            order_id: _vnpParams["vnp_TxnRef"],
          },
        });

        if (!findTransaction) {
          throw new APIError(404, "Giao dịch không xác định được.");
        }

        await billService.update(findTransaction.bill_id, {
          status: "PAID",
        });

        const bill = await DB.find({
          table: "bills",
          conditions: {
            bill_id: findTransaction.bill_id,
          },
        });

        if (!bill) {
          throw new APIError(404, "Không tìm thấy hoá đơn " + findTransaction.bill_id);
        }

        let sql = SQLString.format(
          "SELECT b.*, r.room_name FROM `bill_details` b JOIN rooms r ON b.bill_id = ? AND b.room_id = r.room_id;",
          [findTransaction.bill_id]
        );

        const [rooms] = await pool.query(sql);

        if (!rooms?.length) {
          throw new APIError(404, "Không có phòng nào trong hoá đơn này");
        }

        sql = SQLString.format(
          "SELECT hotel_name, hotel_address, ward_name, district_name, provice_name FROM hotels h JOIN rooms r ON r.room_id = ? && h.hotel_id = r.hotel_id;",
          [rooms[0]?.room_id]
        );

        const [hotel] = await pool.query(sql);

        if (!hotel.length) {
          throw new APIError(404, "Không tìm thấy khách sạn này!");
        }

        const user = await DB.find({
          table: "users",
          conditions: {
            user_id: bill.user_id,
          },
        });

        if (!user) {
          throw new APIError(404, `Không tìm thấy người dùng có id ${bill.user_id}!`);
        }

        let roomsSend = rooms.map((room) => ({
          room_id: room.room_id,
          room_name: room.room_name,
          booking_room: room.room_quantity,
          booking_price: room.price,
        }));

        await billService.sendEmailSuccess({
          data: {
            rooms: roomsSend,
            ...hotel[0],
            ...bill,
            totalNight: bill.total_night,
            startDate: bill.start_date,
            endDate: bill.end_date,
            last_name: user.last_name,
            first_name: user.first_name,
          },
          bill_id: findTransaction.bill_id,
        });

        await transactionService.update({
          bankCode: _vnpParams["vnp_BankCode"],
          orderId: _vnpParams["vnp_TxnRef"],
          payDate: _vnpParams["vnp_PayDate"],
          responseCode: _vnpParams["vnp_ResponseCode"],
          transactionId: _vnpParams["vnp_TransactionNo"],
        });

        return { code: _vnpParams["vnp_ResponseCode"] };
      } else {
        return { code: "97" };
      }
    } catch (error) {
      Promise.reject(error);
    }
  };
}

export default VNPayService;
