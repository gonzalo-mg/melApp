const getPool = require("../dataBase/getPool");

async function selectAllClientsOfUserByEmail(email) {
  const pool = await getPool();

  return await pool.query("select * from clients where userEmail = ?", [email]);
}

module.exports = selectAllClientsOfUserByEmail;
