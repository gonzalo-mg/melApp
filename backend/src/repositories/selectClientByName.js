const getPool = require("../dataBase/getPool");

async function selectClientByName(clientName, userEmail) {
  const pool = getPool();

  const [client] = await pool.query("select * from clients where clientName = ? and userEmail = ?;", [clientName, userEmail]);
  return client;
};

module.exports = selectClientByName;