import React from 'react';
import styles from './NavigationItem.scss';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
		<li className={styles.NavigationItem}>
			<NavLink 
				exact={props.exact}
				activeClassName={styles.active}
                to={props.link}>
                {props.children}
			</NavLink>
		</li>
	);

export default navigationItem;