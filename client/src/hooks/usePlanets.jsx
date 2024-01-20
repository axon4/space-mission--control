import { useCallback, useEffect, useState } from 'react';
import PlanetsService from '../services/planetsService';

function usePlanets() {
	const [ planets, setPlanets ] = useState([]);

	const fetchPlanets = useCallback(async () => {
		const fetchedPlanets = await PlanetsService.getPlanets();

		setPlanets(fetchedPlanets);
	}, []);

	useEffect(() => {
		fetchPlanets();
	}, [fetchPlanets]);

	return planets;
};

export default usePlanets;