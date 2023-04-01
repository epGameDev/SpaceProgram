const express = require("express");
const path = require("path");
const messageController = require("./controllers/messages.controller.js")
const peopleController = require("./controllers/people.controller");

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

app.get("/people", peopleController.getPeople);

app.post("/people", peopleController.postPeople);

app.get("/people/:personID", peopleController.getPerson);



//==============================//
//========= /messages/ =========//

app.get("/messages", messageController.getMessages);

app.post("/messages", messageController.postMessages);



//================================//
//========= Start Server =========//

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
});
