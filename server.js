const express = require("express");
const path = require("path");

const peopleRouter = require("./routes/people.router.js");
const messagesRouter = require("./routes/messages.router.js");
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

app.use( express.static(path.join(__dirname, "public")) ) //adds absolute path variable __driname to reach public.
app.use( express.json() );



//============================//
//========= /people/ =========//
app.use("/people", peopleRouter);


//==============================//
//========= /messages/ =========//
app.use("/messages", messagesRouter);


//================================//
//========= Start Server =========//
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
});
