const getPool = require("../dataBase/getPool");

async function selectClientById(id) {
  const pool = getPool();

  return await pool.query("select * from clients where clientId = ?;", [id]);
}

module.exports = selectClientById;
