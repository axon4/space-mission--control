const launches = new Map();
let latestFlightNumber = 7;

const launch = {
	flightNumber: 7,
	mission: 'Test Mission',
	rocket: 'Test Rocket',
	destination: 'Test Destination',
	launchDate: new Date('December 27, 2030'),
	customer: ['NASA', 'SpaceX'],
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
		customer: ['NASA', 'SpaceX'],
		upComing: true,
		success: true
	}));
};

module.exports = { getLaunches, createLaunch };