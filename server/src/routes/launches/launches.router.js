const express = require("express");
const { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch} = require("../../controllers/launches/launches.controller");


launchesRouter = express.Router();

// " path '/launches' set in app.js"
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

// Express parameter syntax ':<parameter>'. Call via req.params object
launchesRouter.delete('/:id', httpAbortLaunch) 

module.exports = launchesRouter;