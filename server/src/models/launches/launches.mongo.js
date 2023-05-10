const mongoose = require("mongoose");

// Define your Schema
const launchesSchema = mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        // min: 100,
        // max: 999,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        // type: mongoose.ObjectId,
        type: String,
        ref:  "Planet",
        required: true,
    },
    customers: {
        type: Array,
        default: [ZTM, NASA],
        required: true,
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        default: true,
        required: true,
    },

});

// creates a Launch collection and assigns it the launchesSchema.
// Collection should be singular. Mongo will lowercase it and make it plural.
// Collections should end up as plural nouns.
module.exports = mongoose.model("Launch", launchesSchema);