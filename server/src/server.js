const http = require("http");
const app = require("./app");

const {loadPlanetData} = require("./models/planets/planets.model");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);


async function startServer() {
    // Load await promise data before server listens to ports
    await  mongoConnect();

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