const getPool = require("../dataBase/getPool");

async function insertSupplier({
  supplierName,
  phone,
  email,
  web,
  locality,
  street,
  addressNumber,
  userEmail,
}) {
  const pool = getPool();

  await pool.query(
    `INSERT INTO suppliers
      (supplierName, phone, email, web, locality, street, addressNumber, userEmail)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      supplierName,
      phone,
      email,
      web,
      locality,
      street,
      addressNumber,
      userEmail,
    ]
  );
}

module.exports = insertSupplier;
