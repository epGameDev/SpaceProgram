const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const planets = require("./planets.mongo");
const { log } = require("console");
const keplerData = path.join(__dirname, "..", "..", "..", "data", "kepler_data.csv");

const isPlanetHabitable = (planet) => {
    if (planet["koi_disposition"] === "CONFIRMED" 
        && planet['koi_insol'] > 0.36 
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6)
        {
            return planet;
        }
}


function loadPlanetData () {

    return new Promise ((resolve, reject) => {
            fs.createReadStream(keplerData)
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on("data", async (data) => {
                if (isPlanetHabitable(data)) {
                    await savePlanets(data);
                }
            })
            .on("error", err => {
                console.error(err);
                reject(err);
            })
            .on("end", async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                // console.log(await getAllPlanets());
                console.log(`Done streaming! There are ${countPlanetsFound} planets found that are potentially habitable!`);
                resolve();
        });
    });
}

    async function getAllPlanets() {
        // Allows a filter. 
        // First param "{}" returns all documents.
        // Second param "{}" returns the projection which is a list of fields.
        return await planets.find({});
    }


    async function savePlanets(planet) 
    {

        try {

            // updateOne( {filter}, {update or opt.insert}, {upsert: bool} )
           return await planets.updateOne(
                {
                    // First argument filters to see if matching data exists
                    keplerName: planet.kepler_name,
                }, 
                {
                    // Second argument updates if matching data exists.
                    // If upsert is true, second argument inserts if matching data doesn't exist.
                    keplerName: planet.kepler_name,
                },
                {
                    upsert: true,
                });
                
        } catch (error) {
            console.error(`Could not save planet ${error}`);
        }
    }


    module.exports = {
        loadPlanetData,
        getAllPlanets,
    }