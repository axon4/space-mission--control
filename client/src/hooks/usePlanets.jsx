import { useCallback, useEffect, useState } from 'react';
import { getPlanets } from './requests';

function usePlanets() {
	const [ planets, setPlanets ] = useState([]);

	const fetchPlanets = useCallback(async () => {
		const fetchedPlanets = await getPlanets();

		setPlanets(fetchedPlanets);
	}, []);

	useEffect(() => {
		fetchPlanets();
	}, [fetchPlanets]);

	return planets;
};

export default usePlanets;