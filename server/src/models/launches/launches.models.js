const launchesDB = require("./launches.mongo");
const planets = require("../planets/planets.mongo");
// const launchesMap = new Map();

let latestFlightNumber = 100;

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

// uses the current hard coded flight number as entry key and assigns the launch object as value.
// launchesMap.set(launch.flightNumber, launch);
saveLaunch(launch);


//===================================//
//========= Verify Launches =========//
function existsLaunchWithId(launchId) {
    return launchesMap.has(launchId);
}


//================================//
//========= Get Launches =========//
async function getAllLaunches () {
    // return Array.from(launchesMap.values()); //OLD
    await launchesDB.find({}, {
        _id: 0,
        __v: 0,
    });
}

async function saveLaunch(pendingLaunch) {
    const plantIndex = await planets.findOne({
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
function addNewLaunch (pendingLaunch) {
    latestFlightNumber++;

    launchesMap.set(
        // Makes entry with latest flight number and sets to object
        latestFlightNumber, 
        //Assigns values or creates entries to objects.
        Object.assign(launch, {
            // updates existing properties and creates new properties not present
            flightNumber: latestFlightNumber,
            customer: ["ZTM", "NASA"],
            upcoming: true,
            success: true,
    }));

   /* return await pendingLaunch.updateOne(
        {
            flightNumber: pendingLaunch.flightNumber,
        },
        {
            launchDate: pendingLaunch.launchDate,
            mission: pendingLaunch.mission,
            rocket: pendingLaunch.rocket,
            target: pendingLaunch.target,
            flightNumber: pendingLaunch.flightNumber,
            customers: ["ZTM", "NASA"],
            upcoming: true,
            success: true,
        },
        {
            upsert: true,
        }

    );

    */
}



//===================================//
//========= Delete Launches =========//
function abortLaunchById(launchId){
    const aborted = launchesMap.get(launchId);

    // setting to false on object instead of deleting object so to preserve data for other uses.
    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}


//==================================//
//========= Module Exports =========//
module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}