const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
    }
});

// creates a Launch collection and assigns it the launchesSchema.
// Collection should be singular. Mongo will lowercase it and make it plural.
// Collections should end up as plural nouns.
module.exports = mongoose.model("Planet", planetSchema);