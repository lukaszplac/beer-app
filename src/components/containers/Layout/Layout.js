import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './Layout.scss';
import Toolbar from '../../presentational/Toolbar/Toolbar';
import SideDrawer from '../../presentational/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {withRouter} from 'react-router-dom';

class Layout extends Component {
    state = {
		showSideDrawer: false
	}

    componentDidMount() {
        this.props.getFavsFromDB();
    }

    componentDidUpdate() {
        //first building the patch basing on fav beers fetched from DB
        let path = Object.values(this.props.favBeersDB).map(ob => ob.id).join('|');

        //and then (using that path) fetching beers from API and adding them to Redux store (look inside beerActions...)
        //each time layout updates (by switching between beers and favs for example) fav is refreshed to visualize current state
        this.props.getFromApiAndAddFavsToStore(path);
    }

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	sideDrawerOpenHandler = () => {
        //using function beacuse previous state is used inside setState
		this.setState((prevState) => {
			return ({showSideDrawer: !prevState.showSideDrawer});
		});
    }
    
    //redirecing to fav tab in case user clicked on FavCountIndicator
    onClickFavCount() {
        this.props.history.push('/favs');
    }

    render() {
        //getting favLength to provide favorites count down in the tree to FavCountIndicator
        let favLength = Object.keys(this.props.favBeersDB).length;
        return (
            <AuxComp>
                <Toolbar openSideDrawer={this.sideDrawerOpenHandler} 
                         favCount={favLength} onClickFavCount={() => this.onClickFavCount()}/>
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

const mapStateToProps = state => {
    return {
        favBeersDB: state.favs.favBeers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFavsFromDB: () => dispatch(actions.getFavoritesDB()),
        getFromApiAndAddFavsToStore: (path, page) => dispatch(actions.getBeersByIds(path, page))
    }
}

//using withRouter to be able to have router props (like history)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));