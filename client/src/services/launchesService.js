const API_URL = 'http://localhost:3001/launches';

export default class LaunchesService {
	static async getLaunches() {
		const response = await fetch(API_URL);
		const launches = await response.json();

		return launches.sort((a, b) => a.flightNumber - b.flightNumber);
	};
	
	static async submitLaunch(launch) {
		console.log(launch)
		try {
			return await fetch(API_URL, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(launch)
			});
		} catch {
			return {ok: false};
		};
	};
	
	static async abortLaunch(ID) {
		// TODO: once API is ready
		// delete launch with given ID
	};
};