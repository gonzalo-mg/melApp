const getPool = require("../dataBase/getPool");

async function selectSupplierById(id) {
  const pool = getPool();

  return await pool.query("select * from suppliers where supplierId = ?;", [id]);
  
};

module.exports = selectSupplierById;