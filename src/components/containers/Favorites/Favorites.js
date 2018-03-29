import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../presentational/Spinner/Spinner';
import styles from './Favorites.scss';
import withErrorHandler from '../../../hoc/withErrorHandler';
import axios from 'axios';
import FavBeer from '../../presentational/FavBeer/FavBeer';
import retrieveDocId from '../../../helpers/retrieveDocId';

class Favorites extends Component {

    componentDidMount() {
        let favIds = Object.values(this.props.favBeersDB).map(beer => beer.id);
        let idPath = favIds.join('|');
        if (idPath !== "") this.props.getBeersByIds(idPath);
    }

    onRemoveFav(id) {
        let docId = retrieveDocId.call(this.props.favBeersDB, id);
        if (docId !== "") this.props.removeFav(docId);
    }

    render() {
        let beers = null;
        if (!this.props.errorDB && !this.props.errorAPI) {
            beers = this.props.favBeersAPI.map((beer) => (
                <FavBeer key={beer.id} 
                    name={beer.name} 
                    tagline={beer.tagline} 
                    image_url={beer.image_url} 
                    remove={ (id) => this.onRemoveFav(beer.id) }/>
            ));
        } else {
            beers = <p style={{textAlign: 'center'}}>Beers can`t be shown</p>
        }
        return (
            <div className={styles.Favorites}>
                {this.props.loading ? <Spinner /> : beers}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        favBeersDB: state.favs.favBeers,
        loading: state.beer.loading,
        favBeersAPI: state.beer.favs,
        errorDB: state.favs.error,
        errorAPI: state.beer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBeersByIds: (idPath) => dispatch(actions.getBeersByIds(idPath)),
        removeFav: (docId) => dispatch(actions.removeFavorite(docId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favorites, axios));