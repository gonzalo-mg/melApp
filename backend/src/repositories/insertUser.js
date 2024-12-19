const getPool = require("../dataBase/getPool");

async function insertUser(userEmail, encryptedPassword) {
  const pool = getPool();

  return await pool.query(
    `INSERT INTO users (userEmail, userPassword) VALUES (?, ?)`,
    [userEmail, encryptedPassword]
  );
}

module.exports = insertUser;
