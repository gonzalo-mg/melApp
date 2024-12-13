const getPool = require("../dataBase/getPool");

async function selectAllQueensOfUserByEmail(email) {
  const pool = await getPool();

  return await pool.query("select * from queens where userEmail = ?", [email]);
}

module.exports = selectAllQueensOfUserByEmail;
