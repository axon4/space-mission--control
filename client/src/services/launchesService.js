const API_URL = 'http://localhost:3001/launches';

export default class LaunchesService {
	static async getLaunches() {
		const response = await fetch(API_URL);
		const launches = await response.json();

		return launches.sort((a, b) => a.flightNumber - b.flightNumber);
	};
	
	static async submitLaunch(launch) {
		try {
			return await fetch(API_URL, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(launch)
			});
		} catch (error) {
			console.error(error);

			return {ok: false};
		};
	};
	
	static async abortLaunch(ID) {
		try {
			return await fetch(`${API_URL}/${ID}`, {method: 'DELETE'});
		} catch (error) {
			console.error(error);
			
			return {ok: false};
		};
	};
};