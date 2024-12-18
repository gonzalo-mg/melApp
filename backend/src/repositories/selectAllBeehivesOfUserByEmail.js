const getPool = require("../dataBase/getPool");

async function selectAllBeehivesOfUserByEmail(email) {
  const pool = await getPool();

  const sqlCode =
    "select beehives.* from beehives join apiaries on beehives.apiaryId = apiaries.apiaryId join users on apiaries.userEmail = users.userEmail where users.userEmail = ?;";

  const [beehives] = await pool.query(sqlCode, [email]);
  return beehives;
}

module.exports = selectAllBeehivesOfUserByEmail;
