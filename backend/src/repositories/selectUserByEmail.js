const getPool = require("../dataBase/getPool");

async function selectUserByEmail(email) {
  const pool = getPool();

  const [[user]] = await pool.query("select * from users where userEmail = ?", [
    email,
  ]);

  return user;
}

module.exports = selectUserByEmail;
