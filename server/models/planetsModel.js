const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

function isHabitable(planet) {
	return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_prad'] < 1.6 && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11;
};

function loadPlanets() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(path.join(__dirname, '..', 'Kepler.csv'))
			.pipe(parse({
				columns: true,
				comment: '#'
			}))
			.on('data', datum => {
				if (isHabitable(datum)) habitablePlanets.push(datum);
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

function getPlanets() {
	return habitablePlanets;
};

module.exports = { loadPlanets, getPlanets };