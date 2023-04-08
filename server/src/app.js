const express = require("express");


const app = express();



//======================================//
//========= Express Middleware =========//
app.use(express.json());



//==================================//
//========= Module Exports =========//
module.exports = app;