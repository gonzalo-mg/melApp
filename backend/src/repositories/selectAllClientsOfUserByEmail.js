const getPool = require("../dataBase/getPool");

async function selectAllClientsOfUserByEmail(email) {
  const pool = await getPool();

  const [clients] = await pool.query(
    "select * from clients where userEmail = ?",
    [email]
  );
  return clients;
}

module.exports = selectAllClientsOfUserByEmail;
