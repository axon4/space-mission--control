import { BrowserRouter } from 'react-router-dom';
import { Arwes, SoundsProvider, ThemeProvider, createSounds, createTheme } from 'arwes';
import LayOut from './pages/LayOut';
import { resources, sounds, theme } from './settings';

function Application() {
	return (
		<ThemeProvider theme={createTheme(theme)}>
			<SoundsProvider sounds={createSounds(sounds)}>
				<Arwes animate background={resources.background.large} pattern={resources.pattern}>
					{animation => (
						<BrowserRouter>
							<LayOut show={animation.entered} />
						</BrowserRouter>
					)}
				</Arwes>
			</SoundsProvider>
		</ThemeProvider>
	);
};

export default Application;