const express = require("express");
const cors = require("cors");
const path = require("path");
const planetsRouter = require("./routes/planets/planets.router");


const app = express();



//======================================//
//========= Express Middleware =========//
app.use(cors({
    origin: "http://localhost:3000",
})); // Returns cors middleware;
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsRouter);
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});



//==================================//
//========= Module Exports =========//
module.exports = app;