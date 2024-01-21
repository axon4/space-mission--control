export default class LaunchesService {
	static async getLaunches() {
		const response = await fetch('http://localhost:3001/planets');
		const launches = await response.json();

		return launches.sort((a, b) => a.flightNumber - b.flightNumber);
	};
	
	static async submitLaunch(launch) {
		// TODO: once API is ready
		// submit given launch data to launch system
	};
	
	static async abortLaunch(ID) {
		// TODO: once API is ready
		// delete launch with given ID
	};
};