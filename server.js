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



//=============================//
//========= Home Page =========//

app.get('/', (req, res) => {
    res.send("Hello!! :)");
});



//==============================//
//========= Middleware =========//

app.use( (req, res, next) => {
    const startTime = Date.now();
    console.log(`${req.method}, ${req.url}`);
    next();

    // Actions after all middleware has completed.
    const deltaTime = Date.now() - startTime;
    console.log(` Time Elapsed: ${deltaTime}ms`);
});

app.use( express.json() );


//============================//
//========= /people/ =========//

app.get("/people", (req, res) => res.json(people));

app.post("/people", (req, res) => {

    if(!req.body.name) 
    {
      return res.status(400).json({ error: "Friend name seems to be missing."});
    }
    else
    {
        const newPerson = {
            id: people.length,
            name: req.body.name
        }
        people.push(newPerson);
    
        res.json(newPerson);
    }
});

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



//==============================//
//========= /messages/ =========//

app.get("/messages", (req, res) => {
    // res.send("<h1> You have no messages here today!! :( </h1>");
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/messages", (req, res) => {
    console.log(`<p> ...updating messages </p>`);
});



//================================//
//========= Start Server =========//

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
});
