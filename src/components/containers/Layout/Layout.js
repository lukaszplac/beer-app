import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './Layout.scss';
import Toolbar from '../../presentational/Toolbar/Toolbar';
import SideDrawer from '../../presentational/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	sideDrawerOpenHandler = () => {
		this.setState((prevState) => { //ze wzgledu na asynchronicznosc setState nie mozna uzywac stanu w samej metodzie setState trzeba to zrobic poprzez arrow function
			return ({showSideDrawer: !prevState.showSideDrawer});
		});
    }
    
    render() {
        return (
            <AuxComp>
                <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
                <SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}/>
                <main className = {styles.Content}>
                    {this.props.children}
                </main>
            </AuxComp>
        )
    }
}

export default Layout;