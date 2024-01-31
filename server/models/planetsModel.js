const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('../routers/planets/planetsDataBase');

function isHabitable(planet) {
	return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_prad'] < 1.6 && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11;
};

async function savePlanet(planet) {
	try {
		await planets.updateOne({name: planet.kepler_name}, {name: planet.kepler_name}, {upsert: true});
	} catch (error) {
		console.error(error);
	};
};

function loadPlanets() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(path.join(__dirname, '..', 'Kepler.csv'))
			.pipe(parse({
				columns: true,
				comment: '#'
			}))
			.on('data', async datum => {
				if (isHabitable(datum)) {
					const formattedName = datum.kepler_name.split(' ');

					formattedName[1] = formattedName[1].toUpperCase();

					await savePlanet({...datum, kepler_name: formattedName.join(' ')});
				};
			})
			.on('error', error => {
				console.error(error);
				reject(error);
			})
			.on('end', () => {
				resolve();
			});
	});
};

async function getPlanets() {
	return await planets.find({}, {_id: 0, __v: 0});
};

module.exports = { loadPlanets, getPlanets };