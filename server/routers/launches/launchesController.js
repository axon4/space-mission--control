const { getLaunches, createLaunch, abortLaunch, doesLaunchExist } = require('../../models/launchesModel');
const { getPaginationParameters } = require('../pagination');

async function fetchLaunches(request, response) {
	const { skip, limit } = getPaginationParameters(request.query);
	const launches = await getLaunches(skip, limit);

	response.status(200).json(launches);
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

async function cancelLaunch(request, response) {
	const ID = Number(request.params.ID);

	if (ID > 7192) {
		if (await doesLaunchExist(ID)) {
			const didLaunchAbort = await abortLaunch(ID);
	
			if (didLaunchAbort) response.status(200).json({OK: true});
			else response.status(400).json({error: 'launch not aborted'});
		} else response.status(404).json({error: 'launch not found'});
	} else response.status(403).json({error: 'cannot abort launch'});
};

module.exports = { fetchLaunches, scheduleLaunch, cancelLaunch };