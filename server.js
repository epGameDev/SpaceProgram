const express = require("express");

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello!! :)");
});

app.get("/messages", (req, res) => {
    res.send("<h1> You have no messages here today!! :( </h1>");
});

app.post("/messages", (req, res) => {
    console.log(`<p> ...updating messages </p>`);
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
});

