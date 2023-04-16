const launchesMap = new Map();

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("May 13, 2023"),
    destination: "Kepler-442 b",
    customers: ["ZTM", "NASA"],
    isUpcoming: true,
    success: true,
}

launchesMap.set(launch.flightNumber, launch);

module.exports = {
    launchesMap,
}