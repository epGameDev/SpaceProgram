//================================//
//========= Node Modules =========//
const express = require("express");


//====================================//
//========= Program Imports =========//
const peopleController = require("../controllers/people.controller");


//=====================================//
//========= Private Variables =========//
const peopleRouter = express.Router();



//================================//
//========= Router Logic =========//
peopleRouter.get("/", peopleController.getPeople);
peopleRouter.post("/", peopleController.postPeople);
peopleRouter.get("/:personID", peopleController.getPerson);




//==================================//
//========= Module Exports =========//
module.exports = peopleRouter;