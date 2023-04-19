const express = require("express");
const { httpGetAllPlanets } = require("../../controllers/planets/planets.controller");

const planetsRouter = express.Router();

// "/planets" set in App.js
planetsRouter.get("/", httpGetAllPlanets);


module.exports = planetsRouter;