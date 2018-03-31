import React from 'react';
import styles from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
	return (
		<ul className={styles.NavigationItems}>
			<NavigationItem link="/" exact>Beers</NavigationItem>
            <NavigationItem link="/favs">Favorites</NavigationItem>
		</ul>
		);
}

export default navigationItems;