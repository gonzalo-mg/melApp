const express = require("express");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const errorHandler = require("./middlewares/errorHandler");

const { PORT } = process.env;

const getAllHarvestsOfUser = require("./controllers/getAllHarvestsOfUser");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/", () => {
  console.log("Raíz del servidor");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/harvests", getAllHarvestsOfUser);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API-REST melApp a la eschucha en: http://localhost:${PORT}`);
});
