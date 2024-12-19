const getPool = require("../dataBase/getPool");

async function updateSupplier(
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

  return await pool.query(
    `update suppliers
    set
      supplierName = ?, phone = ?, email = ?, web = ?, locality = ?, street = ?, addressNumber = ?
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

module.exports = updateSupplier;
