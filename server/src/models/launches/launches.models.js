const launchesMap = new Map();

// let latestFlightNumber = Array.from(launchesMap.keys())[0];
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("May 13, 2023"),
    target: "Kepler-442 b",
    customers: ["ZTM", "NASA"],
    isUpcoming: true,
    success: true,
}

launchesMap.set(launch.flightNumber, launch);

function getAllLaunches () {
    return Array.from(launchesMap.values());
}


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
            customers: ["ZTM", "NASA"],
            isUpcoming: true,
            success: true,
    }));
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}