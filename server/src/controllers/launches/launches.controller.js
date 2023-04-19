const { getAllLaunches, addNewLaunch} = require("../../models/launches/launches.models");

function httpGetAllLaunches (req, res) {

    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) 
    {
        return res.status(400).json({
            error: "Missing launch property"
        });
    }

    launch.launchDate = new Date(launch.launchDate);

    // Date objects convert input to the unix timestamp.
    if (isNaN(launch.launchDate) || launch.launchDate < new Date()) {
        return res.status(400).json({
            error: "Date is invalid or before current. Example: November 30, 2029",
        });
    }


    addNewLaunch(launch);
    return res.status(201).json(launch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}
