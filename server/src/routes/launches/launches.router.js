const express = require("express");
const { httpGetAllLaunches, httpAddNewLaunch } = require("../../controllers/launches/launches.controller");


launchesRouter = express.Router();

// "/launches set in app.js"
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = launchesRouter;