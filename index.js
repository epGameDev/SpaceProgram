const http = require("http");
const { isNumberObject } = require("util/types");

const PORT = 3000;

const data = [
    {
        id: "001",
        name: "Bulbasaur",
        type: "grass",
        type2: "poison",
    },
    {
        id: "002",
        name: "Ivysaur",
        type: "grass",
        type2: "poison",
    },
]

const server = http.createServer((req, res) => { //req = writeable stream, res = readable stream
    const uri = req.url.split('/')
    if (uri[1] === "pokemon")
    {
        res.writeHead(200, {'Content-Type': "application/json"});
        if (uri.length === 3)
        {
            res.end(JSON.stringify(data[Number(uri[2]) - 1]));
        }
        else
        {
            res.end(JSON.stringify( data ));
        }
    }
    else if (uri[1] === "pokedex") 
    {
        res.writeHead(200, {'Content-Type': "text/html"});
        res.write
        (
            `
                <html> 
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="./public/styles/main.css">
                        <script src="./app.js" defer></script>
                        <title> Pokedex </title>
                    </head>
                    <body>
                        <h1> Pokemon Not Found </h1>

                        <p> Please go to <a href="localhost:3000/pokemon">/pokemon</a> to find your pokedex. </p>
                    </body>
                </html>
            `
        );

        res.end();
    }
    else {
        res.statusCode = 404;
        res.end(`Error code: 404 (Server not Found)`);
    }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 