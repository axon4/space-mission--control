import { useMemo } from 'react';
import { Appear, Link, Paragraph, Table, Words, withStyles } from 'arwes';
import ClickAble from '../components/ClickAble';

const styles = () => ({
	link: {
		color: 'red',
		textDecoration: 'none'
	}
});

function UpComing(props) {
	const { abortLaunch, classes, entered, launches } = props;

	const tableBody = useMemo(() => {
		return launches?.filter(launch => launch.upComing).map(launch => (
			<tr key={String(launch.flightNumber)}>
				<td>
					<ClickAble style={{color: 'red'}}>
						<Link className={classes.link} onClick={() => {abortLaunch(launch.flightNumber)}}>✖</Link>
					</ClickAble>
				</td>
				<td>{launch.flightNumber}</td>
				<td>{(new Date(launch.launchDate)).toDateString()}</td>
				<td>{launch.mission}</td>
				<td>{launch.rocket}</td>
				<td>{launch.destination}</td>
			</tr>
		));
	}, [launches, classes.link, abortLaunch]);

	return (
		<Appear id='upComing' animate show={entered}>
			<Paragraph>UpComing Missions of Both SpaceX-Launches and Newly-Scheduled Rockets</Paragraph>
			<Words animate>Warning: Clicking on ✖ Aborts the Mission! (CanNot Abort Flight-Numbers &lt;= 7192)</Words>
			<Table animate show={entered}>
				<table style={{tableLayout: 'fixed'}}>
					<thead>
						<tr>
							<th style={{width: '3rem'}}></th>
							<th style={{width: '3rem'}}>ID</th>
							<th style={{width: '10rem'}}>Date</th>
							<th style={{width: '11rem'}}>Mission</th>
							<th style={{width: '11rem'}}>Rocket</th>
							<th>Destination</th>
						</tr>
					</thead>
					<tbody>
						{tableBody}
					</tbody>
				</table>
			</Table>
		</Appear>
	);
};

export default withStyles(styles)(UpComing);