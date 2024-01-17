import { Footer as ArwesFooter, Paragraph } from 'arwes';
import Centred from './Centred';

function Footer() {
	return (
		<ArwesFooter animate>
			<Centred>
				<Paragraph style={{fontSize: 14, margin: '10px 0'}}>
					This Is Not An Official Site And Is Not Affiliated With NASA or SpaceX In Any Way. For Educational Purposes Only
				</Paragraph>
			</Centred>
		</ArwesFooter>
	);
};

export default Footer;