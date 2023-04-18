const launchesMap = new Map();

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

module.exports = {
    getAllLaunches,
}