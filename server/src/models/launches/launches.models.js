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
function addNewLaunch (newLaunch) {
    latestFlightNumber++;

    launchesMap.set(
        // Sets current flightNumber
        launchesMap.flightNumber, 
        //Assigns it to the new launch object
        Object.assign(newLaunch, {
            // updates current flightNumber and increments it, thus creating new entry in .set()
            flightNumber: latestFlightNumber,
            // while creating missing data below, otherwise it updates it.
            customer: ["ZTM", "NASA"],
            upcoming: true,
            success: true,
    }));
}



//===================================//
//========= Delete Launches =========//
function abortLaunchById(launchId){
    const aborted = launchesMap.get(launchId);
    console.log(launchesMap);

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