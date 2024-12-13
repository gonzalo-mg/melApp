const getPool = require("../dataBase/getPool");

async function selectAllSuppliersOfUserByEmail(email) {
  const pool = await getPool();

  return await pool.query("select * from suppliers where userEmail = ?", [email]);
}

module.exports = selectAllSuppliersOfUserByEmail
