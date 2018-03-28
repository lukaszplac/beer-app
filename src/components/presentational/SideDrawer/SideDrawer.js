import React from 'react';
import Logo from '../../presentational/Logo/Logo';
import NavigationItems from '../../presentational/NavigationItems/NavigationItems';
import styles from './SideDrawer.scss';
import Backdrop from '../Backdrop/Backdrop';
import AuxComp from '../../../hoc/AuxComp/AuxComp';

const sideDrawer = (props) => {

	let attachedClasses = [styles.SideDrawer, styles.Close];
	if (props.open) {
		attachedClasses = [styles.SideDrawer, styles.Open];
	}

	return (
		<AuxComp>
			<Backdrop show={props.open} 
					  clicked={props.closed}/>
			<div className={attachedClasses.join(' ')}>
				<Logo styles={{
								display: "block",
								height: "12%",
								width: "10%",
								backgroundColor: "white",
								padding: "10px 0px 20px 0px"
							}}/>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</AuxComp>
		);
}

export default sideDrawer;