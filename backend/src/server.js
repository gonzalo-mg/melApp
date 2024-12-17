const express = require("express");
require("dotenv").config();
const { PORT } = process.env;
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const errorHandler = require("./middlewares/errorHandler");
const authValidation = require("./middlewares/authValidation");
const loginUser = require("./controllers/loginUser");
const getAllHarvestsOfUser = require("./controllers/getAllHarvestsOfUser");
const getHarvestById = require("./controllers/getHarvestById");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.post("/login", loginUser);

app.get("/harvests", authValidation, getAllHarvestsOfUser);

app.get("/harvests/:harvestId", authValidation, getHarvestById);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API-REST melApp a la eschucha en: http://localhost:${PORT}`);
});
