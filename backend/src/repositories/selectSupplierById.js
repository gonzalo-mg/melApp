const getPool = require("../dataBase/getPool");

async function selectSupplierById(supplierId, userEmail) {
  const pool = getPool();

  const [supplier] = await pool.query("select * from suppliers where supplierId = ? and userEmail = ?;", [supplierId, userEmail]);
  return supplier;
};

module.exports = selectSupplierById;