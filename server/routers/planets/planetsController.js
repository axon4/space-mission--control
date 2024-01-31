const { getPlanets } = require('../../models/planetsModel');

async function fetchPlanets(_request, response) {
	response.status(200).json(await getPlanets());
};

module.exports = { fetchPlanets };