export const resources = {
	background: {
		small: '/images/background-small.jpg',
		medium: '/images/background-medium.jpg',
		large: '/images/background-large.jpg'
	},
	pattern: '/images/glow.png'
};

export const sounds = {
	shared: {
		volume: 0.5
	},
	players: {
		click: {
			sound: {
				src: ['/audio/click.mp3']
			},
			settings: {oneAtATime: true}
		},
		typing: {
			sound: {
				src: ['/audio/typing.mp3']
			},
			settings: {oneAtATime: true}
		},
		deploy: {
			sound: {
				src: ['/audio/deploy.mp3']
			},
			settings: {oneAtATime: true}
		},
		success: {
			sound: {
				src: ['/audio/success.mp3'],
				volume: 0.2
			},
			settings: {oneAtATime: true}
		},
		abort: {
			sound: {
				src: ['/audio/abort.mp3']
			},
			settings: {oneAtATime: true}
		},
		warning: {
			sound: {
				src: ['/audio/warning.mp3']
			},
			settings: {oneAtATime: true}
		}
	}
};

export const theme = {
	colour: {content: '#A1ECFB'},
	padding: 20,
	responsive: {
		small: 600,
		medium: 800,
		large: 1200
	},
	typography: {headerFontFamily: '"Titillium Web", "sans-serif"'}
};