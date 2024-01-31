const { getLaunches, createLaunch, abortLaunch, doesLaunchExist } = require('../../models/launchesModel');

async function fetchLaunches(_request, response) {
	response.status(200).json(await getLaunches());
};

async function scheduleLaunch(request, response) {
	const launch = request.body;

	if (!launch.mission || !launch.rocket || !launch.destination || !launch.launchDate) response.status(400).json({error:  'missing launch-details'});
	else if (isNaN(new Date(launch.launchDate))) response.status(400).json({error: 'invalid launch-date'});
	else {
		launch.launchDate = new Date(launch.launchDate);
		await createLaunch(launch);
	
		response.status(201).json(launch);
	};
};

function cancelLaunch(request, response) {
	const ID = Number(request.params.ID);

	if (doesLaunchExist(ID)) {
		const launch = abortLaunch(ID);

		response.status(200).json(launch);
	} else response.status(404).json({error: 'launch not found'});
};

module.exports = { fetchLaunches, scheduleLaunch, cancelLaunch };