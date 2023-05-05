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