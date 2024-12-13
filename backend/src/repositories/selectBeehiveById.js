const getPool = require("../dataBase/getPool");

async function selectBeehiveById(id) {
  const pool = getPool();

  return await pool.query("select * from beehives where beehiveId = ?", [id]);
}

module.exports = selectBeehiveById;
