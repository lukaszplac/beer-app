import React from 'react';
import styles from './Spinner.css';

//simple functional component to provide Spinner for data loading
//css taken from web
const spinner = () => (
	<div className={styles.loader}>Loading...</div>
)

export default spinner;