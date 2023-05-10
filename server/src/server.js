const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const {loadPlanetData} = require("./models/planets/planets.model");

const PORT = process.env.PORT || 8000;
const MONGO_ULI = "mongodb+srv://Eric:Gi6dB01ccYr2l52f@space-launch-cluster.ncj9lsl.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);


mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", err => {
    console.error(err);
});

async function startServer() {
    // Load await promise data before server listens to ports
    await mongoose.connect(MONGO_ULI); 

    //await required because of csv file stream.
    await loadPlanetData(); 
    server.listen(PORT, () => {
        console.log(
            `
           ****************************************
                Node Dev Project:
                \x1b[95m Site: http://localhost:${PORT}/ \x1b[0m
            **************************************
    
                Listening on port ${PORT}...
            `
        );
    })

}

startServer();