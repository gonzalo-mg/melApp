require("dotenv").config();
const { PORT } = process.env;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get("/", ()=>{console.log('Raíz del servidor')});

app.listen(PORT, () => {
    console.log(`API-REST melApp a la eschucha en: http://localhost:${PORT}`);
  });