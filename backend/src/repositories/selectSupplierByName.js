const getPool = require("../dataBase/getPool");

async function selectSupplierByName(supplierName, userEmail) {
  const pool = getPool();

  const [supplier] = await pool.query("select * from suppliers where supplierName = ? and userEmail = ?;", [supplierName, userEmail]);
  return supplier;
};

module.exports = selectSupplierByName;