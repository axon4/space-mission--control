import { withSounds } from 'arwes';

const ClickAble = props => {
	const { children, onClick, sounds, ...rest } = props;

	const clickWithSound = event => {
		sounds.click && sounds.click.play();
		onClick && onClick(event);
	};

	return (
		<span onClick={clickWithSound} {...rest}>
			{children}
		</span>
	);
};

export default withSounds()(ClickAble);