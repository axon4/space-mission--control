import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Frame, withSounds, withStyles } from 'arwes';
import Launch from './Launch';
import UpComing from './UpComing';
import History from './History';
import Centred from '../components/Centred';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePlanets from '../hooks/usePlanets';
import useLaunches from '../hooks/useLaunches';

const styles = () => ({
	content: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		margin: 'auto'
	},
	centred: {
		flex: 1,
		paddingTop: '20px',
		paddingBottom: '10px'
	}
});

function LayOut(props) {
	const { classes, sounds } = props;
	const [ frameVisible, setFrameVisible ] = useState(true);

	const animateFrame = () => {
		setFrameVisible(false);
		setTimeout(() => {
			setFrameVisible(true);
		}, 600);
	};

	const onSuccessSound = () => sounds.success && sounds.success.play();
	const onFailureSound = () => sounds.warning && sounds.warning.play();
	const onAbortSound = () => sounds.abort && sounds.abort.play();

	const { abortCurrentLaunch, isPendingLaunch, launches, submitNewLaunch } = useLaunches(onSuccessSound, onFailureSound, onAbortSound);
	const planets = usePlanets();

	return (
		<div className={classes.content}>
			<Header onNavigation={animateFrame} />
			<Centred className={classes.centred}>
				<Frame animate show={frameVisible} corners={4} style={{visibility: frameVisible ? 'visible' : 'hidden'}}>
					{animation => (
						<div style={{padding: '20px'}}>
							<Switch>
								<Route exact path='/'>
									<Launch entered={animation.entered} planets={planets} submitLaunch={submitNewLaunch} isPendingLaunch={isPendingLaunch} />
								</Route>
								<Route exact path='/launch'>
									<Launch entered={animation.entered} planets={planets} submitLaunch={submitNewLaunch} isPendingLaunch={isPendingLaunch} />
								</Route>
								<Route exact path='/upComing'>
									<UpComing entered={animation.entered} launches={launches} abortLaunch={abortCurrentLaunch} />
								</Route>
								<Route exact path='/history'>
									<History entered={animation.entered} launches={launches} />
								</Route>
							</Switch>
						</div>
					)}
				</Frame>
			</Centred>
			<Footer />
		</div>
	);
};

export default withSounds()(withStyles(styles)(LayOut));