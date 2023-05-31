const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://Eric:Gi6dB01ccYr2l52f@space-launch-cluster.ncj9lsl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", err => {
    console.error(err);
});

async function mongoConnect() {
    return await mongoose.connect(MONGO_URI);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}