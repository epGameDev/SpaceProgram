const express = require("express");

const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");

const API = express.Router();


API.use("/planets", planetsRouter);
API.use("/launches", launchesRouter);

module.exports = API;