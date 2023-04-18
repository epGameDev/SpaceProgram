const express = require("express");
const { httpGetAllLaunches } = require("../../controllers/launches/launches.controller");


launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLaunches);

module.exports = launchesRouter;