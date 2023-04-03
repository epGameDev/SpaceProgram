//================================//
//========= Node Modules =========//
const express = require("express");


//=================================//
//========= Local Imports =========//
const messageController = require("../controllers/messages.controller.js");


//=====================================//
//========= Private Variables =========//
const messagesRouter = express.Router();



//================================//
//========= Router Logic =========//
messagesRouter.get("/", messageController.getMessages);
messagesRouter.post("/", messageController.postMessages);



//==================================//
//========= Module Exports =========//
module.exports = messagesRouter;