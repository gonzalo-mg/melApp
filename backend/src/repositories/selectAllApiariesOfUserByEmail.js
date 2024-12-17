const getPool = require("../dataBase/getPool");

async function selectAllApiariesOfUserByEmail(email) {
  const pool = await getPool();

  const [apiaries] = await pool.query(
    "select * from apiaries where userEmail = ?",
    [email]
  );
  return apiaries;
}

module.exports = selectAllApiariesOfUserByEmail;
