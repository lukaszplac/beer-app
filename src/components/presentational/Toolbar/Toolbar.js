import React from 'react';
import styles from './Toolbar.scss';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
	return (
		<header className={styles.Toolbar}>
            <Logo />
			<nav className={styles.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuth}/>
			</nav>
		</header>
		);
}

export default toolbar;