const {parse} = require("csv-parse");
const fs = require("fs");

const results = [];

const isPlanetHabitable = (planet) => {
    if (planet["koi_disposition"] === "CONFIRMED" 
        && planet['koi_insol'] > 0.36 
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6)
        {
            return planet;
        }
}

fs.createReadStream("./public/database/kepler_data.csv")
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on("data", (data) => {
        if (isPlanetHabitable(data)) {
            results.push(data);
        }
    })
    .on("error", err => {
        console.error(err);
    })
    .on("end", () => {
        // console.log(results); // full array of objects. 
        // console.log(results.map(item => item['koi_insol'])); // filter by light received. (0.36 - 1.11)
        // console.log(results.map(item => item['koi_prad']));  // filter by planet size to earth (< 1.6)
        // console.log(results.map(item => item['kepoi_name'])); // filter by planet name. 
        console.table(results.map((planet) => {
            return {
                name: planet.kepoi_name,
                light_intensity: planet.koi_insol,
                planet_size_to_earth: planet.koi_prad,
                is_confirmed: planet.koi_disposition
            }
        } ))
        console.log(`Done streaming! There are ${results.length} planets found that are potentially habitable!`);
    });