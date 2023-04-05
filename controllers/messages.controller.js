const path = require("path");
const model = require("../models/friends.model")

function getMessages (req, res) {
    res.render('messages', {
        title: "Messages",
        style: "main",
        people: model[2].name,
    });
    // res.sendFile(path.join(__dirname, "..", "public", "views", "index.hbs"));
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