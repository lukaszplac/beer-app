import React from 'react';
import styles from './Logo.scss';
import beerLogo from '../../../assets/images/beer.png';

//just the logo compnente - as simple as that
const logo = (props) => (
	<div className={styles.Logo}
		 style={{...props.styles}}>
		<img src={beerLogo} alt="My Beer Logo" />
	</div>
	);

export default logo;