const getPool = require("../dataBase/getPool");

async function selectHarvestById(harvestId, userEmail) {
  const pool = getPool();

  const [harvest] = await pool.query("select * from harvests where harvestId = ? and apiaryId in (select apiaryId from apiaries where userEmail = ?)", [harvestId, userEmail]);

  return harvest;
}

module.exports = selectHarvestById;
