const planets = require('../../models/planetsModel');

function getPlanets(_request, response) {
	response.status(200).json(planets);
};

module.exports = { getPlanets };