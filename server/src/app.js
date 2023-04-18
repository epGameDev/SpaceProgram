const express = require("express");
const cors = require("cors"); // sets cors header for us so server and client can communicate
const morgan = require("morgan");
const path = require("path");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();



//======================================//
//========= Express Middleware =========//
app.use(cors({
    origin: "http://localhost:3000",
})); // Returns cors middleware;

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));


app.use(planetsRouter);
app.use(launchesRouter);

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});



//==================================//
//========= Module Exports =========//
module.exports = app;