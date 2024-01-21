const launches = new Map();

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

module.exports = { launches };