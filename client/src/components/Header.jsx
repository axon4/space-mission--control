import { Link } from 'react-router-dom';
import { Header as ArwesHeader, Highlight, Logo, Words, withStyles } from 'arwes';
import Centred from './Centred';
import ClickAble from './ClickAble';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		lineHeight: '80px'
	},
	logo: {
		display: 'inherit',
		marginTop: '15px'
	},
	navigation: {
		display: 'inherit'
	},
	banner: {
		display: 'inherit',
		fontWeight: 'bold',
		marginLeft: '10px',
		marginRight: '15px',
		fontSize: 21
	},
	clickAble: {
		fontSize: 21,
		'& i': {
			marginRight: theme.padding / 2,
			fontSize: 24
		}
	},
	link: {
		color: theme.colour.content,
		textDecoration: 'none'
	},
	button: {
		padding: [0, theme.padding / 2]
	},
	'@media (max-width: 800px)': {
		logo: {
			display: 'none'
		},
		image: {
			display: 'none'
		},
		banner: {
			display: 'none'
		},
		button: {
			padding: [0, 8]
		},
		clickAble: {
			fontSize: 16
		}
	}
});

function Header(props) {
	const { classes, onNavigation, ...rest } = props;

	return (
		<ArwesHeader animate>
			<Centred className={classes.root} {...rest}>
				<img src='/favicon.ico' alt='favicon' className={classes.image} style={{margin: '15px 10px 15px 0', height: '50px', width: 'auto'}} />
				<Logo animate size={50} className={classes.logo} layer='header' />
				<Words animate className={classes.banner}>
					Space-Mission--Control (Node)
				</Words>
				<nav className={`${classes.navigation}`}>
					<ClickAble className={classes.clickAble} onClick={onNavigation}>
						<Highlight className={classes.button} animate layer='header'>
							<Link className={classes.link} to='/launch'>
								<i className='material-icons'>check_circle_outline</i>Launch
							</Link>
						</Highlight>
					</ClickAble>
					<ClickAble className={classes.clickAble} onClick={onNavigation}>
						<Highlight className={classes.button} animate layer='header'>
							<Link className={classes.link} to='/upComing'>
								<i className='material-icons'>update</i>UpComing
							</Link>
						</Highlight>
					</ClickAble>
					<ClickAble className={classes.clickAble} onClick={onNavigation}>
						<Highlight className={classes.button} animate layer='header'>
							<Link className={classes.link} to='/history'>
								<i className='material-icons'>history</i>History
							</Link>
						</Highlight>
					</ClickAble>
				</nav>
			</Centred>
		</ArwesHeader>
	);
};

export default withStyles(styles)(Header);