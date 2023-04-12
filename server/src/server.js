const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);


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