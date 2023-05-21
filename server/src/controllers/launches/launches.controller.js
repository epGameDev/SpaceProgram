const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById} = require("../../models/launches/launches.models");



//====================================//
//========= Get All Launches =========//
async function httpGetAllLaunches (req, res) {

    return res.status(200).json(await getAllLaunches());
}



//=====================================//
//========= Submit New Launch =========//
function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) 
    {
        return res.status(400).json({
            error: "Missing launch property"
        });
    }

    // Received as string or number and convert to date object.
    launch.launchDate = new Date(launch.launchDate);

    // Date objects convert input to the unix timestamp which is a number.
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Date is invalid or before current. Example: November 30, 2029",
        });
    }


    addNewLaunch(launch);
    return res.status(201).json(launch);
}



//================================//
//========= Abort Launch =========//
function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id); // ID returns as string
    const aborted = abortLaunchById(launchId);

    // if launch does not exist
    if (!existsLaunchWithId(launchId)) {
        
        return res.status(404).json({
            error: "Abort Controller: Launch ID not found",
        });
    }

    // if launch does exist
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}
