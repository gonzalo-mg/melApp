const express = require("express");
require("dotenv").config();
const { PORT } = process.env;
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const errorHandler = require("./middlewares/errorHandler");
const loginUser = require("./controllers/loginUser");
const getAllHarvestsOfUser = require("./controllers/getAllHarvestsOfUser");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", () => {
  console.log("Raíz del servidor");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/harvests", getAllHarvestsOfUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailX:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     userToken:
 *                       type: string
 *       401:
 *         description: Incorrect password or email
 */
app.post('/login', loginUser)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API-REST melApp a la eschucha en: http://localhost:${PORT}`);
});
