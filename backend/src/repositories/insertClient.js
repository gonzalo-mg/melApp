const getPool = require("../dataBase/getPool");

async function insertClient(
  { clientName, phone, email, requiredServices, locality, street, addressNumber, notes },
  userEmail
) {
  const pool = getPool();

  return await pool.query(
    `INSERT INTO suppliers
      (clientName, requiredServices, phone, email, locality, street, addressNumber, notes, userEmail)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      clientName,
      requiredServices,
      phone,
      email,
      locality,
      street,
      addressNumber,
      notes,
      userEmail,
    ]
  );
}

module.exports = insertClient;
