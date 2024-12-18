const getPool = require("../dataBase/getPool");

async function selectAllQueensOfUserByEmail(email) {
  const pool = await getPool();

  const [queens] = await pool.query(
    "select * from queens where userEmail = ?",
    [email]
  );
  return queens;
}

module.exports = selectAllQueensOfUserByEmail;
