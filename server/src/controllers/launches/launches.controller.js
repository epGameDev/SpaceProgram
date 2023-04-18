const { getAllLaunches } = require("../../models/launches/launches.models");

function httpGetAllLaunches (req, res) {

    return res.status(200).json(getAllLaunches());
}

module.exports = {
    httpGetAllLaunches,
}
