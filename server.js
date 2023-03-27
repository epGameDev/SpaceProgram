const express = require("express");
const path = require("path");

const people = [
    {
        id: 0,
        name: "Homer Simpson"
    },
    {
        id: 1,
        name: "Marge Simpson",
    },
    {
        id: 2,
        name: "Bart Simpson",
    },
    {
        id: 3,
        name: "Lisa Simpson",
    },
    {
        id: 4,
        name: "Maggie Simpson"
    }
];

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello!! :)");
});

app.get("/people", (req, res) => res.json(people));

app.get("/people/:personID", (req, res) => {
    const personID = Number(req.params.personID);
    const person = people[personID];
    if(person) {
        res.status(200).json(person);
    }else {
        res.status(404).json({
            error: "Person does not exist..."
        });
    }
});

app.get("/messages", (req, res) => {
    // res.send("<h1> You have no messages here today!! :( </h1>");
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/messages", (req, res) => {
    console.log(`<p> ...updating messages </p>`);
});

app.use((req, res, next) => {

});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
});
