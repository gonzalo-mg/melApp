const getPool = require("../dataBase/getPool");

async function selectHarvestById(id) {
  const pool = getPool();

  return await pool.query("select * from harvests where harvestId = ?", [id]);
}

module.exports = selectHarvestById;
