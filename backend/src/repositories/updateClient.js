const getPool = require("../dataBase/getPool");

async function updateClient(
  {
    supplierName: clientName,
    phone,
    email,
    requiredServices,
    locality,
    street,
    addressNumber,
    clientId,
  },
  userEmail
) {
  const pool = getPool();

  return await pool.query(
    `update clients
    set
      clientName = ?, phone = ?, email = ?, requiredServices = ?, locality = ?, street = ?, addressNumber = ?
    where
      clientId = ?
    and
      userEmail = ?`,
    [
      clientName,
      phone,
      email,
      requiredServices,
      locality,
      street,
      addressNumber,
      clientId,
      userEmail,
    ]
  );
}

module.exports = updateClient;
