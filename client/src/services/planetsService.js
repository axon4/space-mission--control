export default class PlanetsService {
	static async getPlanets() {
		const response = await fetch('http://localhost:3001/v1/planets');

		return await response.json();
	};
};