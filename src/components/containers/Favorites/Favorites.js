import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import styles from './Favorites.scss';
import withErrorHandler from '../../../hoc/withErrorHandler';
import axios from 'axios';
import FavBeer from '../../presentational/FavBeer/FavBeer';
import retrieveDocId from '../../../helpers/retrieveDocId';
import AnimHeart from '../../presentational/AnimHeart/AnimHeart';
import Spinner from '../../presentational/Spinner/Spinner';

class Favorites extends Component {

    //setting initial animation
    state = {
        leftAnim: "animated fadeInLeft",
        rightAnim: "animated fadeInRight",
        removingCountString: "-1"
    }

    onRemoveFav(beer) {
        let docId = retrieveDocId.call(this.props.favBeersDB, beer.id);
        if (docId !== "") this.props.removeFav(beer,docId);
        //reseting initial animation when only updating
        this.setState({leftAnim: "", rightAnim: "", removingCountString: "-1"})
    }

    //removing all favorites from DB as weel as from store
    onRemoveAll() {
        this.setState({removingCountString: "-" + this.props.favBeersAPI.length});
        this.props.removeAllFavs();
    }

    render() {
        let beers = null;
            beers = this.props.favBeersAPI.map((beer, index) => (
                    <FavBeer key={beer.id} 
                        name={beer.name} 
                        tagline={beer.tagline} 
                        image_url={beer.image_url}
                        classes={index%2 === 0 ? this.state.leftAnim : this.state.rightAnim}
                        remove={ () => this.onRemoveFav(beer) }/>
                ));
        return (
            this.props.errorDB || this.props.errorAPI ? <p style={{textAlign: 'center'}}>Beers can`t be shown.</p> :
            <div className={styles.Favorites}>
                {beers.length > 1 ? <div className={styles.ClearButton}
                                         onClick={() => this.onRemoveAll()}>
                                         CLEAR ALL FAVORITES
                                    </div> : null}
                {this.props.processing ? <Spinner /> : beers}

                {/*animation when romoving also count of beer beeing removed is passed to that component*/}
                <AnimHeart count={this.state.removingCountString}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        favBeersAPI: state.beer.favs,
        errorAPI: state.beer.error,
        favBeersDB: state.favs.favBeers,
        errorDB: state.favs.error,
        processing: state.favs.processing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFav: (beer, docId) => dispatch(actions.removeFavoriteDB(beer, docId)),
        removeAllFavs: () => dispatch(actions.clearFavsDB())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favorites, axios));