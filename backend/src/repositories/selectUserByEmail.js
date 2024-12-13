/* funcion SQL query: seleccionar usuario sabiendo su email */
const getPool = require("../dataBase/getPool");

async function selectUserByEmail(email) {
  const pool = getPool();

  const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  
  return user;
};

module.exports = selectUserByEmail;