const path = require("path");

function getMessages (req, res) {
    // res.send("<h1> You have no messages here today!! :( </h1>");
    res.sendFile(path.join(__dirname, "..", "public", "views", "index.html"));
}

function getImage (req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "images", "IMG_2216.jpeg"));
}


function postMessages (req, res) {
    console.log(`<p> ...updating messages </p>`);
}

module.exports = {
    getMessages,
    getImage,
    postMessages,
}