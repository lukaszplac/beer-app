import React from 'react';
import styles from './Toolbar.scss';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
	return (
		<header className={styles.Toolbar}>
			<DrawerToggle clicked={props.openSideDrawer}/>
            <Logo />
			<nav className={styles.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuth}/>
			</nav>
		</header>
		);
}

export default toolbar;