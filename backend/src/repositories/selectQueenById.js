const getPool = require("../dataBase/getPool");

async function selectQueenById(id) {
  const pool = getPool();

  return await pool.query("select * from queens where queenId = ?", [id]);
}

module.exports = selectQueenById;
