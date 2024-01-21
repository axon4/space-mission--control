import { Footer as ArwesFooter, Link } from 'arwes';
import Centred from './Centred';

function Footer() {
	return (
		<ArwesFooter animate>
			<Centred>
				<Link href='https://quran.com/55/33' style={{fontSize: 14, margin: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'underline', textUnderlineOffset: '5px'}} target='_blank'>
					Sūraṫ ar-Raḥmān 55, Ayah 33 | 55:33
				</Link>
			</Centred>
		</ArwesFooter>
	);
};

export default Footer;