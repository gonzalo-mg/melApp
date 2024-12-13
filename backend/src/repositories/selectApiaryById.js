const getPool = require("../dataBase/getPool");

async function selectApiaryById(id) {
  const pool = getPool();

  return await pool.query("select * from apiaries where apiaryId = ?", [id]);
}

module.exports = selectApiaryById;
