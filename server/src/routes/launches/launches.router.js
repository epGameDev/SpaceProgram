const express = require("express");
const { getLaunches } = require("../../controllers/launches/launches.controller");


launchesRouter = express.Router();

launchesRouter.get("/launches", getLaunches);

module.exports = launchesRouter;