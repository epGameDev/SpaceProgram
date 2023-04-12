const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const keplerData = path.join(__dirname, "..", "..", "..", "data", "kepler_data.csv");

const planetResults = [];

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
            .on("data", (data) => {
                if (isPlanetHabitable(data)) {
                    planetResults.push(data);
                }
            })
            .on("error", err => {
                console.error(err);
                reject(err);
            })
            .on("end", () => {
                // console.log(planetResults); // full array of objects. 
                // console.log(planetResults.map(item => item['koi_insol'])); // filter by light received. (0.36 - 1.11)
                // console.log(planetResults.map(item => item['koi_prad']));  // filter by planet size to earth (< 1.6)
                // console.log(planetResults.map(item => item['kepoi_name'])); // filter by planet name. 
                console.log(`Done streaming! There are ${planetResults.length} planets found that are potentially habitable!`);
                resolve();
        });
    });
}


    module.exports = {
        loadPlanetData,
        planets: planetResults,
    }