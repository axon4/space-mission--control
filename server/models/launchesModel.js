const launches = require('../routers/launches/launchesDataBase');
const planets = require('../routers/planets/planetsDataBase');

let latestFlightNumber = 1;
const launch = {
	flightNumber: 1,
	mission: 'Expeditionary Expedition',
	rocket: 'Explorer 719',
	destination: 'Kepler-442 b',
	launchDate: new Date('December 27, 2029'),
	customers: ['NASA', 'SpaceX'],
	upComing: true,
	success: true
};

async function saveLaunch(launch) {
	const planet = await planets.findOne({name: launch.destination});

	if (!planet) throw new Error('planet not found');

	await launches.updateOne({flightNumber: launch.flightNumber}, launch, {upsert: true});
};

saveLaunch(launch);

async function getLaunches() {
	return await launches.find({}, {_id: 0, __v: 0});
};

function createLaunch(launch) {
	latestFlightNumber++;
	launches.set(latestFlightNumber, Object.assign(launch, {
		flightNumber: latestFlightNumber,
		customers: ['NASA', 'SpaceX'],
		upComing: true,
		success: true
	}));
};

function doesLaunchExist(ID) {
	return launches.has(ID);
};

function abortLaunch(ID) {
	const launch = launches.get(ID);

	launch.upComing = false;
	launch.success = false;

	return launch;
};

module.exports = { getLaunches, createLaunch, doesLaunchExist, abortLaunch };