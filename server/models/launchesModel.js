const axios = require('axios');
const launches = require('../routers/launches/launchesDataBase');
const planets = require('../routers/planets/planetsDataBase');

const defaultLaunch = {
	flightNumber: 7192,
	mission: 'Expeditionary Expedition',
	rocket: 'Explorer 719',
	destination: 'Kepler-442 B',
	launchDate: new Date('December 27, 2029'),
	customers: ['NASA', 'SpaceX'],
	upComing: true,
	success: true
};

async function saveLaunch(launch) {
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
	const planet = await planets.findOne({name: launch.destination});

	if (!planet) throw new Error('planet not found');

	const flightNumber = (await getLatestFlightNumber()) + 1;
	const newLaunch = Object.assign(launch, {
		flightNumber,
		customers: ['NASA', 'SpaceX'],
		upComing: true,
		success: true
	});

	await saveLaunch(newLaunch);
};

async function findLaunch(filter) {
	return await launches.findOne(filter);
};

async function doesLaunchExist(ID) {
	return await findLaunch({flightNumber: ID});
};

async function abortLaunch(ID) {
	const launch = await launches.updateOne({flightNumber: ID}, {
		upComing: false,
		success: false
	});

	return launch.modifiedCount === 1;
};

async function loadLaunches() {
	const firstSpaceXLaunch = await findLaunch({
		flightNumber: 1,
		mission: 'FalconSat',
		rocket: 'Falcon 1'
	});

	if (firstSpaceXLaunch) return;
	else {
		const response = await axios.post('https://api.spacexdata.com/v4/launches/query', {
			query: {},
			options: {
				pagination: false,
				populate: [
					{
						path: 'rocket',
						select: {name: 1}
					}, {
						path: 'payloads',
						select: {customers: 1}
					}
				]
			}
		});

		if (response.status !== 200) throw new Error('error querying SpaceX-API');

		const launchDocuments = response.data.docs;

		for (const launchDocument of launchDocuments) {
			const launch = {
				flightNumber: launchDocument.flight_number,
				mission: launchDocument.name,
				rocket: launchDocument.rocket.name,
				launchDate: launchDocument.date_local,
				customers: launchDocument.payloads.flatMap(payload => payload.customers),
				upComing: launchDocument.upcoming,
				success: launchDocument.success
			};

			await saveLaunch(launch);
		};
	};
};

module.exports = { getLaunches, createLaunch, doesLaunchExist, abortLaunch, loadLaunches };