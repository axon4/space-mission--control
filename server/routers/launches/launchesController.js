const { getLaunches, createLaunch } = require('../../models/launchesModel');

function fetchLaunches(_request, response) {
	response.status(200).json(getLaunches());
};

function scheduleLaunch(request, response) {
	const launch = request.body;

	if (!launch.mission || !launch.rocket || !launch.destination || !launch.launchDate) response.status(400).json({error:  'missing launch-details'});
	else if (isNaN(new Date(launch.launchDate))) response.status(400).json({error: 'invalid launch-date'});
	else {
		launch.launchDate = new Date(launch.launchDate);
		createLaunch(launch);
	
		response.status(201).json(launch);
	};
};

module.exports = { fetchLaunches, scheduleLaunch };