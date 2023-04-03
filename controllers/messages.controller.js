const path = require("path");

function getMessages (req, res) {
    // res.send("<h1> You have no messages here today!! :( </h1>");
    res.sendFile(path.join(__dirname, "../index.html"));
}


function postMessages (req, res) {
    console.log(`<p> ...updating messages </p>`);
}

module.exports = {
    getMessages,
    postMessages,
}