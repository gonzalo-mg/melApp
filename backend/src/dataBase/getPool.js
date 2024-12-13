const mysql = require("mysql2/promise");

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

let pool;

function getPool() {
  // si aun no existe crear grupo de conexion
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      timezone: "Z",
    });
  }
  // devolver conexion del pool a la db
  return pool;
}

module.exports = getPool;