/**
 * Application Express principale
 * @module App
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Configuration de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Logging
app.use(morgan("dev"));

// Parsing du corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes de l'API
app.use("/api", routes);

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: "Route non trouvée" 
  });
});

// Gestion globale des erreurs
app.use(errorHandler);

module.exports = app;