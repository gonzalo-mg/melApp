const getPool = require("../dataBase/getPool");

async function selectUserByEmail(email) {
  const pool = getPool();

  return await pool.query("select * from users where email = ?", [email]);
}

module.exports = selectUserByEmail;
