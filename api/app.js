// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const routes = require("./routes");

const app = express();

// Middlewares globaux
app.use(express.json());

// Routes
app.use("/api", routes);

module.exports = app;