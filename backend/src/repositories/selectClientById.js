const getPool = require("../dataBase/getPool");

async function selectClientById(clientId, userEmail) {
  const pool = getPool();

  const [client] = await pool.query(
    "select * from clients where clientId = ? and userEmail = ?;",
    [clientId, userEmail]
  );
  return client;
}

module.exports = selectClientById;
