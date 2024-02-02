export default class PlanetsService {
	static async getPlanets() {
		const response = await fetch('v1/planets');

		return await response.json();
	};
};