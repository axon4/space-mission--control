import { useMemo } from 'react';
import { Appear, Button, Loading, Paragraph } from 'arwes';
import ClickAble from '../components/ClickAble';

function Launch(props) {
	const selectorBody = useMemo(() => {
		return props.planets?.map(planet => <option key={planet.kepler_name} value={planet.kepler_name}>{planet.kepler_name}</option>);
	}, [props.planets]);

	const toDay = (new Date()).toISOString().split('T')[0];

	return (
		<Appear id='launch' animate show={props.entered}>
			<Paragraph>Schedule a Mission-Launch for InterStellar-Travel to One of the Kepler-ExoPlanets</Paragraph>
			<Paragraph>Only Confirmed Planets Matching the Following Criteria are AvailAble for the Earliest-Scheduled Missions:</Paragraph>
			<ul>
				<li>Planetary-Radius &lt; 1.6x Earth-Radius</li>
				<li>Effective Stellar-Flux &gt; 0.36x Earth's Stellar-Flux and &lt; 1.11x Earth's Stellar-Flux</li>
			</ul>
			<form style={{display: 'inline-grid', gridTemplateColumns: 'auto auto', gridGap: '10px 20px'}} onSubmit={props.submitLaunch}>
				<label htmlFor='launch-day'>Launch-Date</label>
				<input id='launch-day' type='date' name='launch-day' min={toDay} max='2040-12-31' defaultValue={toDay} />
				<label htmlFor='mission-name'>Mission-Name</label>
				<input id='mission-name' type='text' name='mission-name' />
				<label htmlFor='rocket-name'>Rocket-Type</label>
				<input id='rocket-name' type='text' name='rocket-name' defaultValue='Explorer IS1' />
				<label htmlFor='planets-selector'>Destination-ExoPlanet</label>
				<select id='planets-selector' name='planets-selector'>
					{selectorBody}
				</select>
				<ClickAble>
					<Button animate show={props.entered} type='submit' layer='success' disabled={props.isPendingLaunch}>
						Launch ✔
					</Button>
				</ClickAble>
				{props.isPendingLaunch && <Loading animate small />}
			</form>
		</Appear>
	);
};

export default Launch;