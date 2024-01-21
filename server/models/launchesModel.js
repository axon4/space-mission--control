const launches = new Map();
let latestFlightNumber = 7;

const launch = {
	flightNumber: 7,
	mission: 'Test Mission',
	rocket: 'Test Rocket',
	destination: 'Test Destination',
	launchDate: new Date('December 27, 2030'),
	customers: ['NASA', 'SpaceX'],
	upComing: true,
	success: true
};

launches.set(launch.flightNumber, launch);

function getLaunches() {
	return Array.from(launches.values());
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