const { selectAllHarvestsOfUserByEmail } = require("../repositories/selectAllHarvestsOfUserByEmail");

async function getAllHarvestsOfUser(req, res, next) {
  try {
    const harvests = await selectAllHarvestsOfUserByEmail(userEmail);
    console.log(harvests)

    res.status(200).send(harvests);
  } catch (error) {
    next(error);
  }
}

module.exports = getExercises;