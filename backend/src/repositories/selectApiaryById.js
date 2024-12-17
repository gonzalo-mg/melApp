const getPool = require("../dataBase/getPool");

async function selectApiaryById(apiaryId, userEmail) {
  const pool = getPool();

  const [apiary] = await pool.query(
    "select * from apiaries where apiaryId = ? and userEmail = ?",
    [apiaryId, userEmail]
  );
  return apiary;
}

module.exports = selectApiaryById;
