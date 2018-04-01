import React from 'react';
import styles from './MyLittleSpinner.scss';


//simple functional component to provide little spinner for BeerDetails modal
//and also used by Beers component to show loading state when favorit is being added
//css taken from web and changed a little bit to match
const spinner = () => (
	<div className={styles.spinner}></div>
)

export default spinner;