const express = require("express");
const cors = require("cors"); // sets cors header for us so server and client can communicate
const morgan = require("morgan");
const path = require("path");
const API = require("./routes/api");
const { clear } = require("console");

const app = express();



//======================================//
//========= Express Middleware =========//
app.use(cors({
    origin: "http://localhost:3000",
})); // Returns cors middleware;

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));


app.use("/v1", API);

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});



//==================================//
//========= Module Exports =========//
module.exports = app;