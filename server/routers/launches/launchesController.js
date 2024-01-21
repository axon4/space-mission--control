const { getLaunches } = require('../../models/launchesModel');

function fetchLaunches(_request, response) {
	response.status(200).json(getLaunches());
};

module.exports = { fetchLaunches };