const launches = require('../routers/launches/launchesDataBase');
const planets = require('../routers/planets/planetsDataBase');

const defaultLaunch = {
	flightNumber: 1,
	mission: 'Expeditionary Expedition',
	rocket: 'Explorer 719',
	destination: 'Kepler-442 B',
	launchDate: new Date('December 27, 2029'),
	customers: ['NASA', 'SpaceX'],
	upComing: true,
	success: true
};

async function saveLaunch(launch) {
	const planet = await planets.findOne({name: launch.destination});

	if (!planet) throw new Error('planet not found');

	await launches.findOneAndUpdate({flightNumber: launch.flightNumber}, launch, {upsert: true});
};

saveLaunch(defaultLaunch);

async function getLaunches() {
	return await launches.find({}, {_id: 0, __v: 0});
};

async function getLatestFlightNumber() {
	const launch = await launches.findOne().sort('-flightNumber');

	return launch.flightNumber || 1;
};

async function createLaunch(launch) {
	const flightNumber = (await getLatestFlightNumber()) + 1;
	const newLaunch = Object.assign(launch, {
		flightNumber,
		customers: ['NASA', 'SpaceX'],
		upComing: true,
		success: true
	});

	await saveLaunch(newLaunch);
};

async function doesLaunchExist(ID) {
	return await launches.findOne({flightNumber: ID});
};

async function abortLaunch(ID) {
	const launch = await launches.updateOne({flightNumber: ID}, {
		upComing: false,
		success: false
	});

	return launch.modifiedCount === 1;
};

module.exports = { getLaunches, createLaunch, doesLaunchExist, abortLaunch };