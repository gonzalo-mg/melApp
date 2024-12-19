const getPool = require("../dataBase/getPool");

async function insertSupplier(
  {
    supplierName,
    phone,
    email,
    web,
    locality,
    street,
    addressNumber,
    supplierId,
  },
  userEmail
) {
  const pool = getPool();

  await pool.query(
    `update suppliers
    set
      supplierName = ?, phone = ?, email = ?, web = ?, locality = ?, street = ?, addressNumber = ?, 
    where
      supplierId = ?
    and
      userEmail = ?`,
    [
      supplierName,
      phone,
      email,
      web,
      locality,
      street,
      addressNumber,
      supplierId,
      userEmail,
    ]
  );
}

module.exports = insertSupplier;
