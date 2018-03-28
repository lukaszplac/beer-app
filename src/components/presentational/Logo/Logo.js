import React from 'react';
import styles from './Logo.scss';
import beerLogo from '../../../assets/images/beer.png';

const logo = (props) => (
	<div className={styles.Logo}
		 //style={{height: props.height, display: props.display}}>
		 style={{...props.styles}}>
		<img src={beerLogo} alt="My Beer Logo" />
	</div>
	);

export default logo;