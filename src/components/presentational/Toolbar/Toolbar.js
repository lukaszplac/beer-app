import React from 'react';
import styles from './Toolbar.scss';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import FavCountIndicator from '../FavCountIndicator/FavCountIndicator';

const toolbar = (props) => {
	return (
		<header className={styles.Toolbar}>
			<DrawerToggle clicked={props.openSideDrawer}/>
            <Logo />
			<FavCountIndicator favCount={props.favCount} />
			<nav className={styles.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuth}/>
			</nav>
		</header>
		);
}

export default toolbar;