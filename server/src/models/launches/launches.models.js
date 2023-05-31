const launchesDB = require("./launches.mongo");
const planets = require("../planets/planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    launchDate: new Date("May 13, 2023"),
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-442 b",
    flightNumber: 100,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
}

saveLaunch(launch);


//===================================//
//========= Verify Launches =========//

async function existsLaunchWithId(launchId) {
    return await launchesDB.findOne({
        "flightNumber": launchId,
    });
}



//=============================================//
//========= Get And Set Flight Number =========//

// Sorts in descending order since .findOne grabs the first option.
// "-flightNumber" changes it from ascending to descending order.
async function getLatestFlightNumber() {
    const latestLaunch = await launchesDB.findOne().sort("-flightNumber");

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}


//================================//
//========= Get Launches =========//

async function getAllLaunches () {
    return await launchesDB.find({}, {
        "_id": 0,
        "__v": 0,
    });
}



//=================================//
//========= Save Launches =========//

async function saveLaunch(pendingLaunch) {
    
    const plantIndex = await planets.findOneAndUpdate({
        keplerName: pendingLaunch.target,
    });

    if (!plantIndex) {
        throw new Error("Matching target not found in schema");
    }

    return await launchesDB.updateOne(
        {
            flightNumber: pendingLaunch.flightNumber,
        },
        pendingLaunch,
        {
            upsert: true,
        }

    );
}

//=================================//
//========= Create Launch =========//

async function scheduleNewLaunch(scheduledLaunch) {
    
    const fetchedFlightNumber = await getLatestFlightNumber() +1;
    const newLaunch = Object.assign(scheduledLaunch, {
        flightNumber: fetchedFlightNumber,
        success: true,
        upcoming: true,
        customers: ["ZTM", "NASA"],
    });

    return await saveLaunch(newLaunch);
}


//===================================//
//========= Delete Launches =========//

async function abortLaunchById(launchId){
    // setting to false on object instead of deleting object so to preserve data for other uses.
    return await launchesDB.updateOne( {"flightNumber": launchId},
    {
        "upcoming": false,
        "success": false,
    });

    // aborted.upcoming = false;
    // aborted.success = false;

    // return aborted;
}


//==================================//
//========= Module Exports =========//
module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
}