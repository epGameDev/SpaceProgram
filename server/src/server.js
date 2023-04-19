const http = require("http");
const app = require("./app");

const {loadPlanetData} = require("./models/planets/planets.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);




async function startServer() {

    await loadPlanetData(); //await required because of csv file stream.
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