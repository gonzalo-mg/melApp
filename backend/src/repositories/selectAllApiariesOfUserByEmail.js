const getPool = require("../dataBase/getPool");

async function selectAllApiariesOfUserByEmail(email) {
  const pool = await getPool();

  return await pool.query("select * from apiaries where userEmail = ?", [email]);
}

module.exports = selectAllApiariesOfUserByEmail;
