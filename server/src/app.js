const express = require("express");
const cors = require("cors");
const planetsRouter = require("./routes/planets/planets.router");


const app = express();



//======================================//
//========= Express Middleware =========//
app.use(cors({
    origin: "http://localhost:3000",
})); // Returns cors middleware;
app.use(express.json());
app.use(planetsRouter);



//==================================//
//========= Module Exports =========//
module.exports = app;