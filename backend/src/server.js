// archivo principal servidor express
const express = require("express");
const app = express();
// variables entorno
require("dotenv").config();
const { PORT } = process.env;

const cors = require("cors");
// swagger: herramienta para documentar apis
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// controllers
// users
const authValidation = require("./middlewares/authValidation");
const loginUser = require("./controllers/loginUser");
// suppliers
const getAllSuppliersOfUser = require("./controllers/getAllSuppliersOfUser");
const getSupplierById = require("./controllers/getSupplierById");
// clients
const getAllClientsOfUser = require("./controllers/getAllClientsOfUser");
const getClientById = require("./controllers/getClientById");
// apiaries
const getAllApiariesOfUser = require("./controllers/getAllApiariesOfUser");
// harvests
const getAllHarvestsOfUser = require("./controllers/getAllHarvestsOfUser");
const getHarvestById = require("./controllers/getHarvestById");

const errorHandler = require("./middlewares/errorHandler");

// middlewares utilitarios
app.use(express.json());
app.use(cors());

// endpoints
// documentacion de la api
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// users
app.post("/login", loginUser);
// suppliers
app.get("/suppliers", authValidation, getAllSuppliersOfUser);
app.get("/suppliers/:supplierId", authValidation, getSupplierById);
// clients
app.get("/clients", authValidation, getAllClientsOfUser);
app.get("/clients/:clientId", authValidation, getClientById);
// apiaries
app.get("/apiaries", authValidation, getAllApiariesOfUser);
// harvests
app.get("/harvests", authValidation, getAllHarvestsOfUser);
app.get("/harvests/:harvestId", authValidation, getHarvestById);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`melApp API backend a la eschucha en: http://localhost:${PORT}`);
});
