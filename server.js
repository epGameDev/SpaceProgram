const express = require("express");
const path = require("path");

const peopleRouter = require("./routes/people.router.js");
const messagesRouter = require("./routes/messages.router.js");
const PORT = 3000;

const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "public", "views"));



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

app.use( "/site", express.static(path.join(__dirname, "public")) ) //adds absolute path variable __dirname to reach public.
app.use( express.json() );



//============================//
//========= Homepage =========//
app.get('/', (req, res) => {
    res.render("index", {
        title: "Space Program",
        style: "main",
    });
})

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
