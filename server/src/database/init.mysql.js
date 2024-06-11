import mysql from "mysql2";
import config from "../config/index.js";

console.log(config.db);

const pool = mysql
  .createPool({
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
    connectionLimit: 10,
  })
  .promise();

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.username,
//   database: config.db.database,
//   port: config.db.port,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

export default pool;
