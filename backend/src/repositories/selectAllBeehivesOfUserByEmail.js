const getPool = require("../dataBase/getPool");

async function selectAllBeehivesOfUserByEmail(email) {
  const pool = await getPool();

  const sqlCode =
    "SELECT beehives.* FROM beehives JOIN apiaries ON beehives.apiaryId = apiaries.apiaryId JOIN users ON apiaries.userEmail = users.userEmail WHERE users.userEmail = ?;";

  return await pool.query(sqlCode, [email]);
}

module.exports = selectAllBeehivesOfUserByEmail;
