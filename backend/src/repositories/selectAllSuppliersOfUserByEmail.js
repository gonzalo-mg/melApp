const getPool = require("../dataBase/getPool");

async function selectAllSuppliersOfUserByEmail(email) {
  const pool = await getPool();

  const [suppliers] = await pool.query(
    "select * from suppliers where userEmail = ?",
    [email]
  );

  return suppliers;
}

module.exports = selectAllSuppliersOfUserByEmail;
