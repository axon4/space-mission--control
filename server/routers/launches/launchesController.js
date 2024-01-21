const { launches } = require('../../models/launchesModel');

function getLaunches(_request, response) {
	response.status(200).json(Array.from(launches.values()));
};

module.exports = { getLaunches };