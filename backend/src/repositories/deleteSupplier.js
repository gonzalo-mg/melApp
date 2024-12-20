const getPool = require("../dataBase/getPool");

async function deleteSupplier(supplierId, userEmail) {
  const pool = getPool();

  return await pool.query(
    `delete from suppliers where supplierId = ? and userEmail = ?';`,
    [supplierId, userEmail]
  );
}

module.exports = deleteSupplier;
