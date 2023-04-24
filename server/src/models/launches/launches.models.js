const launchesMap = new Map();

let latestFlightNumber = 100;

const launch = {
    launchDate: new Date("May 13, 2023"),
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-442 b",
    flightNumber: 100,
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
}

// uses the current hard coded flight number as entry key and assigns the launch object as value.
launchesMap.set(launch.flightNumber, launch);

//===================================//
//========= Verify Launches =========//
function existsLaunchWithId(launchId) {
    return launchesMap.has(launchId);
}


//================================//
//========= Get Launches =========//
function getAllLaunches () {
    return Array.from(launchesMap.values());
}



//=================================//
//========= Create Launch =========//
function addNewLaunch (launch) {
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