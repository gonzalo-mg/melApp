const selectAllHarvestsOfUserByEmail = require("../repositories/selectAllHarvestsOfUserByEmail");

async function getAllHarvestsOfUser(req, res, next) {
  try {
    let userEmail = "abejamaya@email.com";
    const harvests = await selectAllHarvestsOfUserByEmail(userEmail);

    res.status(200).send({ harvests });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllHarvestsOfUser;
