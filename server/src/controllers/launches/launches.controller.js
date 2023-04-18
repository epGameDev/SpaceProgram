const { launchesMap } = require("../../models/launches/launches.models");

function getLaunches (req, res) {

    return res.status(200).json(Array.from(launchesMap.values()));
}

module.exports = {
    getLaunches,
}