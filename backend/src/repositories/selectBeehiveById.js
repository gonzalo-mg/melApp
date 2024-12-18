const getPool = require("../dataBase/getPool");

async function selectBeehiveById(beehiveId, userEmail) {
  const pool = getPool();

  const [beehive] = await pool.query(
    "select * from beehives where beehiveId = ? and apiaryId in (select apiaryId from apiaries where userEmail = ?)",
    [beehiveId, userEmail]
  );

  return beehive;
}

module.exports = selectBeehiveById;
