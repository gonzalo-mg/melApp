const getPool = require("../dataBase/getPool");

async function selectQueenById(queenId, userEmail) {
  const pool = getPool();

  const [queen] = await pool.query(
    "select * from queens where queenId = ? and userEmail = ?",
    [queenId, userEmail]
  );
  return queen;
}

module.exports = selectQueenById;
