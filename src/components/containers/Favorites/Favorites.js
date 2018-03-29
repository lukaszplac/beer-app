import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import styles from './Favorites.scss';
import withErrorHandler from '../../../hoc/withErrorHandler';
import axios from 'axios';
import FavBeer from '../../presentational/FavBeer/FavBeer';
import retrieveDocId from '../../../helpers/retrieveDocId';

class Favorites extends Component {

    state = {
        clickedId: 0
    }

    onRemoveFav(beer) {
        let docId = retrieveDocId.call(this.props.favBeersDB, beer.id);
        if (docId !== "") this.props.removeFav(beer,docId);
        this.setState({clickedId : beer.id})
    }

    render() {
        let beers = null;
            beers = this.props.favBeersAPI.map((beer, index) => (
                    <FavBeer key={beer.id} 
                        name={beer.name} 
                        tagline={beer.tagline} 
                        image_url={beer.image_url}
                        classes={index%2 === 0 ? "animated fadeInLeft" : "animated fadeInRight"}
                        remove={ () => this.onRemoveFav(beer) }/>
                ));
        return (
            this.props.errorDB || this.props.errorAPI ? <p style={{textAlign: 'center'}}>Beers can`t be shown</p> :
            <div className={styles.Favorites}>
                {beers}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        favBeersDB: state.favs.favBeers,
        favBeersAPI: state.beer.favs,
        errorAPI: state.beer.error,
        processing: state.favs.processing,
        loading: state.beer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFav: (beer, docId) => dispatch(actions.removeFavoriteDB(beer, docId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favorites, axios));