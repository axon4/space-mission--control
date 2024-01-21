const { getLaunches, createLaunch } = require('../../models/launchesModel');

function fetchLaunches(_request, response) {
	response.status(200).json(getLaunches());
};

function scheduleLaunch(request, response) {
	const launch = request.body;

	launch.launchDate = new Date(launch.launchDate);
	createLaunch(launch);

	response.status(201).json(launch);
};

module.exports = { fetchLaunches, scheduleLaunch };