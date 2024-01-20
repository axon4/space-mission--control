import { useCallback, useEffect, useState } from 'react';
import LaunchesService from '../services/launchesService';

function useLaunches(onSuccessSound, onFailureSound, onAbortSound) {
	const [ launches, setLaunches ] = useState([]);
	const [ isPendingLaunch, setIsPendingLaunch ] = useState(false);

	const fetchLaunches = useCallback(async () => {
		const fetchedLaunches = await LaunchesService.getLaunches();

		setLaunches(fetchedLaunches);
	}, []);

	useEffect(() => {
		fetchLaunches();
	}, [fetchLaunches]);

	const submitLaunch = useCallback(async event => {
		event.preventDefault();
		// setIsPendingLaunch(true);

		const data = new FormData(event.target);
		const launchDate = new Date(data.get('launch-day'));
		const mission = data.get('mission-name');
		const rocket = data.get('rocket-name');
		const target = data.get('planets-selector');
		const response = await LaunchesService.submitLaunch({ launchDate, mission, rocket, target });

		// TODO: set success based on response

		const success = false;

		if (success) {
			fetchLaunches();
			setTimeout(() => {
				setIsPendingLaunch(false);
				onSuccessSound();
			}, 800);
		} else onFailureSound();
	}, [fetchLaunches, onSuccessSound, onFailureSound]);

	const abortLaunch = useCallback(async ID => {
		const response = await LaunchesService.abortLaunch(ID);

		// TODO: set success based on response

		const success = false;

		if (success) {
			fetchLaunches();
			onAbortSound();
		} else onFailureSound();
	}, [fetchLaunches, onAbortSound, onFailureSound]);

	return { launches, isPendingLaunch, submitLaunch, abortLaunch };
};

export default useLaunches;