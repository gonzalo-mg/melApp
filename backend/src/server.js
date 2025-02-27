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

// CONTROLLERS imports
// users
const authValidation = require("./middlewares/authValidation");
const loginUser = require("./controllers/loginUser");
const registerUser = require("./controllers/registerUser");
// suppliers
const getAllSuppliersOfUser = require("./controllers/getAllSuppliersOfUser");
const getSupplierById = require("./controllers/getSupplierById");
const postSupplier = require("./controllers/postSupplier");
const putSupplier = require("./controllers/putSupplier");
const deleteSupplier = require("./controllers/deleteSupplier");
// clients
const getAllClientsOfUser = require("./controllers/getAllClientsOfUser");
const getClientById = require("./controllers/getClientById");
const postClient = require("./controllers/postClient");
const putClient = require("./controllers/putClient");
// apiaries
const getAllApiariesOfUser = require("./controllers/getAllApiariesOfUser");
const getApiaryById = require("./controllers/getApiaryById");
// queens
const getAllQueensOfUser = require("./controllers/getAllQueensOfUser");
const getQueenById = require("./controllers/getQueenById");
// beehives
const getAllBeehivesOfUser = require("./controllers/getAllBeehivesOfUser");
const getBeehiveById = require("./controllers/getBeehiveById");
// harvests
const getAllHarvestsOfUser = require("./controllers/getAllHarvestsOfUser");
const getHarvestById = require("./controllers/getHarvestById");
// errors
const errorHandler = require("./middlewares/errorHandler");

// MIDDLEWARES utilitarios
app.use(express.json());
app.use(cors());

// ENDPOINTS
// documentacion de la api
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// users
app.post("/login", loginUser);
app.post("/register", registerUser);
// suppliers
app.get("/suppliers", authValidation, getAllSuppliersOfUser);
app.get("/suppliers/:supplierId", authValidation, getSupplierById);
app.post("/suppliers", authValidation, postSupplier);
app.put("/suppliers", authValidation, putSupplier);
app.delete("/suppliers/:supplierId", authValidation, deleteSupplier);
// clients
app.get("/clients", authValidation, getAllClientsOfUser);
app.get("/clients/:clientId", authValidation, getClientById);
app.post("/clients", authValidation, postClient);
app.put("/clients", authValidation, putClient);
// apiaries
app.get("/apiaries", authValidation, getAllApiariesOfUser);
app.get("/apiaries/:apiaryId", authValidation, getApiaryById);
// queens
app.get("/queens", authValidation, getAllQueensOfUser);
app.get("/queens/:queenId", authValidation, getQueenById);
// beehives
app.get("/beehives", authValidation, getAllBeehivesOfUser);
app.get("/beehives/:beehiveId", authValidation, getBeehiveById);
// harvests
app.get("/harvests", authValidation, getAllHarvestsOfUser);
app.get("/harvests/:harvestId", authValidation, getHarvestById);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`melApp API backend a la eschucha en: http://localhost:${PORT}`);
});
