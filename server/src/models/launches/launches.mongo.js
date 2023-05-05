const mongoose = require("mongoose");

const launchesSchema = mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        // default: 100,
        // min: 100,
        // max: 999,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    missions: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },

});