const { getPlanets } = require('../../models/planetsModel');

function fetchPlanets(_request, response) {
	response.status(200).json(getPlanets());
};

module.exports = { fetchPlanets };