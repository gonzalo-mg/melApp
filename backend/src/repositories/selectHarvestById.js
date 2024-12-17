const getPool = require("../dataBase/getPool");

async function selectHarvestById(id, userEmail) {
  const pool = getPool();

  const sqlCode = 'select * form harvest where harvestIs = ? and apiaryId in (select apiaryId from apiaries where userEmail = ?'

  return await pool.query(sqlCode, [id, userEmail]);
}

module.exports = selectHarvestById;
