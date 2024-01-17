import { useCallback, useEffect, useState } from 'react';
import { getLaunches, submitLaunch, abortLaunch } from './requests';

function useLaunches(onSuccessSound, onFailureSound, onAbortSound) {
	const [ launches, setLaunches ] = useState([]);
	const [ isPendingLaunch, setIsPendingLaunch ] = useState(false);

	const fetchLaunches = useCallback(async () => {
		const fetchedLaunches = await getLaunches();

		setLaunches(fetchedLaunches);
	}, []);

	useEffect(() => {
		fetchLaunches();
	}, [fetchLaunches]);

	const submitNewLaunch = useCallback(async event => {
		event.preventDefault();
		// setIsPendingLaunch(true);

		const data = new FormData(event.target);
		const launchDate = new Date(data.get('launch-day'));
		const mission = data.get('mission-name');
		const rocket = data.get('rocket-name');
		const target = data.get('planets-selector');
		const response = await submitLaunch({ launchDate, mission, rocket, target });

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

	const abortCurrentLaunch = useCallback(async ID => {
		const response = await abortLaunch(ID);

		// TODO: set success based on response

		const success = false;

		if (success) {
			fetchLaunches();
			onAbortSound();
		} else onFailureSound();
	}, [fetchLaunches, onAbortSound, onFailureSound]);

	return { launches, isPendingLaunch, submitNewLaunch, abortCurrentLaunch };
};

export default useLaunches;